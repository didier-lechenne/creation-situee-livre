/**
 * @name Sidenotes 
 * @author Julie Blanc <contact@julie-blanc.fr>
 * @see { @link https://gitlab.com/csspageweaver/plugins/sidenotes/ }
 */

import { Handler } from "../../../lib/paged.esm.js";

export default class sidenotes extends Handler {

  constructor(chunker, polisher, caller) {
    super(chunker, polisher, caller);
    this.parameters = cssPageWeaver.features.sidenotes.parameters;
    this.notesClass = this.parameters?.selector || ".sidenote";
    this.position = this.parameters?.position || "outside";   
    this.reset = this.parameters?.reset; 
    this.align = this.parameters?.align; 
    this.sidenoteOverflow = new Set();
  }

  beforeParsed(content) {


    let newNotesClass = "pagedjs_sidenote";
    resetCounter(content, this.reset, this.notesClass);
    createCallandMarker(content, this.notesClass, newNotesClass);

    let notes = content.querySelectorAll(this.notesClass);
    notes.forEach(function (note, index) {
      note.style.position = "absolute";
      note.style.top = "0px";
      note.style.left = "0px";  
    }); 

  
  }


  afterPageLayout(pageElement, page, breakToken) {
      let notes = pageElement.querySelectorAll(".pagedjs_sidenote");

      let selectedMargin;
      if (this.position == "left") { selectedMargin = ".pagedjs_margin-left" }
      else if (this.position == "right") { selectedMargin = ".pagedjs_margin-right" }
      else if (this.position == "outside" && pageElement.classList.contains('pagedjs_left_page')) {
          selectedMargin = ".pagedjs_margin-left"
      }
      else if (this.position == "outside" && pageElement.classList.contains('pagedjs_right_page')) {
          selectedMargin = ".pagedjs_margin-right"
      }
      else if (this.position == "inside" && pageElement.classList.contains('pagedjs_left_page')) {
          selectedMargin = ".pagedjs_margin-right"
      }
      else if (this.position == "inside" && pageElement.classList.contains('pagedjs_right_page')) {
          selectedMargin = ".pagedjs_margin-left"
      } else {

          if (pageElement.classList.contains('pagedjs_right_page')) {
              selectedMargin = ".pagedjs_margin-right"
          } else {
              selectedMargin = ".pagedjs_margin-left"
          }
      }

      if (notes || this.sidenoteOverflow.size > 0) {

          let marginbox = pageElement.querySelector(selectedMargin);
          marginbox.style.display = "block";

          let marginContents = marginbox.querySelectorAll(".pagedjs_margin");
          marginContents.forEach(function (marginContent, index) {
              marginContent.style.display = "none";
          });


          let container = document.createElement("div");
          container.className = "sidenote-container";
          marginbox.appendChild(container);


          if(this.align){
              let paddingTopContainer;
              let firstElem = pageElement.querySelector(this.align);
              let pageAera = pageElement.querySelector(".pagedjs_area");
              if (firstElem) {
                  paddingTopContainer = firstElem.getBoundingClientRect().top - pageAera.getBoundingClientRect().top;
              }
              container.style.paddingTop = paddingTopContainer + "px";
          }
          


          // Put notes from previous page ------------------------
          if (this.sidenoteOverflow.size > 0) {
              // reverse set
              const notesArray = Array.from(this.sidenoteOverflow);
              notesArray.reverse();
              // add notes in order
              notesArray.forEach(note => {
                  container.appendChild(note);
              });
          }
          this.sidenoteOverflow.clear();


          // Display all notes of the page ------------------------
          for (let n = 0; n < notes.length; ++n) {
              container.appendChild(notes[n]);
              notes[n].style.position = "relative";
          }


          // Push notes tha overflow ------------------------
          let maxHeight = marginbox.offsetHeight;
          checkOverflownote(this.notesClass, pageElement, maxHeight, this.sidenoteOverflow, container);

      }

  }
}





/// FUNCTIONS -----------------------------------------------------


// RESET COUNTER

function resetCounter(content, reset, notesClass){

  if(reset && reset != ""){
    const elements = content.querySelectorAll(reset + ", " + notesClass);
    let resetEligible = false;
    elements.forEach(element => {
        if (element.matches(reset)) {
            resetEligible = true;
        } else if (resetEligible && element.matches(notesClass)) {
            element.dataset.resetCounterSidenote = true;
            resetEligible = false;
        }
    });
  }

}


// CALL & MARKER
function createCallandMarker(content, notesClass, newNotesClass){

  let notes = content.querySelectorAll(notesClass);
  let resetNum = 0;

  notes.forEach(function (note, index) {

      if (note.dataset.resetCounterSidenote === "true") {
          resetNum = index;
      }
      let num = index + 1 - resetNum;

      note.classList.add(newNotesClass);
      note.dataset.counterNote = num;

      // call
      let ref_note = document.createElement('span');
      ref_note.className = newNotesClass + "_call";
      ref_note.dataset.counterNote = num;
      ref_note.innerHTML = num;
      note.after(ref_note);

      // marker + content note
      let marker_note = document.createElement('span');
      marker_note.className = newNotesClass + "_marker";
      marker_note.innerHTML = num + "";
      note.prepend(marker_note);
      
  });  

  }






// MARGINS

function marginNoteTop(elem) {
  let marginTop = parseInt(window.getComputedStyle(elem).marginTop, 10)
  return marginTop;
}

function marginNoteBottom(elem) {
  let marginBottom = parseInt(window.getComputedStyle(elem).marginBottom, 10)
  return marginBottom;
}

function biggestMargin(a, b) {
  let margin;
  let marginBottom = marginNoteBottom(a);
  let marginTop = marginNoteTop(b);
  if (marginBottom > marginTop) {
      margin = marginBottom;
  } else {
      margin = marginTop;
  }
  return margin;
}



function checkOverflownote(notesClass, pageElement, maxHeight, arrayOverflow, container) {
  let notes = pageElement.querySelectorAll(notesClass);
 
  let notesHeightAll = [];

  for (let n = 0; n < notes.length; ++n) {

      // Add height of the notes to array notesHeightAll 
      let noteHeight = notes[n].offsetHeight;
      notesHeightAll.push(noteHeight);
      // Add margins of the notes to array notesHeightAll 
      if (n >= 1) {
          let margins = biggestMargin(notes[n - 1], notes[n]);
          notesHeightAll.push(margins);
      }
  }

  // If notes on page
  if (notesHeightAll.length > 0) {

      // Calculate if all notes fit on the page;
      let reducer = (accumulator, currentValue) => accumulator + currentValue;
      let allHeight = notesHeightAll.reduce(reducer);
      let paddingTop = getComputedStyle(container).paddingTop;
      let paddingContainer = parseInt(paddingTop);
           
      let totalHeight = allHeight + paddingContainer;

      if (totalHeight > maxHeight) {

          let lastNote = notes[notes.length - 1];
          arrayOverflow.add(lastNote);
          lastNote.remove();

          checkOverflownote(notesClass, pageElement, maxHeight, arrayOverflow, container);

      }


  }
}