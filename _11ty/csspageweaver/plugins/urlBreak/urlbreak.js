import { Handler } from "../../../lib/paged.esm.js";

/**
 * URL Break Handler
 * Adds word break opportunities (<wbr>) to URLs in links and plain text for better printing
 */
export default class URLBreakHandler extends Handler {
  constructor(chunker, polisher, caller) {
    super(chunker, polisher, caller);
  }

  beforeParsed(content) {
    // Process links with URL text
    const links = content.querySelectorAll('a[href^="http"], a[href^="www"]');
    
    links.forEach(link => {
      // Process URL in text content if it exists
      this.processUrlsInElement(link);
    });

    // Process plain text URLs
    this.processTextNodes(content);
  }

  processUrlsInElement(element) {
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null
    );

    const nodesToProcess = [];
    let node;
    while (node = walker.nextNode()) {
      if (/https?:\/\/|www\./i.test(node.textContent)) {
        nodesToProcess.push(node);
      }
    }

    nodesToProcess.forEach(textNode => {
      const text = textNode.textContent;
      const urlRegex = /(https?:\/\/[^\s<]+|www\.[^\s<]+)/gi;
      
      if (urlRegex.test(text)) {
        const fragment = document.createDocumentFragment();
        let lastIndex = 0;
        
        text.replace(urlRegex, (match, url, offset) => {
          if (offset > lastIndex) {
            fragment.appendChild(
              document.createTextNode(text.substring(lastIndex, offset))
            );
          }
          
          const span = document.createElement('span');
          span.className = 'url-breakable';
          span.innerHTML = this.addBreakPoints(url);
          fragment.appendChild(span);
          
          lastIndex = offset + match.length;
        });
        
        if (lastIndex < text.length) {
          fragment.appendChild(
            document.createTextNode(text.substring(lastIndex))
          );
        }
        
        textNode.parentNode.replaceChild(fragment, textNode);
      }
    });
  }

  processTextNodes(element) {
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          if (node.parentElement.tagName === 'A' || 
              node.parentElement.tagName === 'SCRIPT' ||
              node.parentElement.tagName === 'STYLE') {
            return NodeFilter.FILTER_REJECT;
          }
          return /https?:\/\/|www\./i.test(node.textContent) 
            ? NodeFilter.FILTER_ACCEPT 
            : NodeFilter.FILTER_REJECT;
        }
      }
    );

    const nodesToProcess = [];
    let node;
    while (node = walker.nextNode()) {
      nodesToProcess.push(node);
    }

    nodesToProcess.forEach(textNode => {
      const text = textNode.textContent;
      const urlRegex = /(https?:\/\/[^\s<]+|www\.[^\s<]+)/gi;
      
      if (urlRegex.test(text)) {
        const fragment = document.createDocumentFragment();
        let lastIndex = 0;
        
        text.replace(urlRegex, (match, url, offset) => {
          if (offset > lastIndex) {
            fragment.appendChild(
              document.createTextNode(text.substring(lastIndex, offset))
            );
          }
          
          const span = document.createElement('span');
          span.className = 'url-breakable';
          span.innerHTML = this.addBreakPoints(url);
          fragment.appendChild(span);
          
          lastIndex = offset + match.length;
        });
        
        if (lastIndex < text.length) {
          fragment.appendChild(
            document.createTextNode(text.substring(lastIndex))
          );
        }
        
        textNode.parentNode.replaceChild(fragment, textNode);
      }
    });
  }

  addBreakPoints(url) {
    let printableUrl = url;
    
    printableUrl = printableUrl.replace(/\/\//g, "//\u003Cwbr\u003E");
    printableUrl = printableUrl.replace(/\,/g, ",\u003Cwbr\u003E");
    printableUrl = printableUrl.replace(
      /(\/|\~|\-|\.|\,|\_|\?|\#|\%)/g,
      "\u003Cwbr\u003E$1"
    );
    printableUrl = printableUrl.replace(/\-/g, "\u003Cwbr\u003E&#x2011;");
    
    return printableUrl;
  }
}