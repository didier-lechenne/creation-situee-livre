import { Handler } from "../../../lib/paged.esm.js";

export default class nrbPages extends Handler {

  constructor(chunker, polisher, caller) {
    super(chunker, polisher, caller);
  }

afterRendered(pages) {
    pages.forEach(page => {
        const section = page.element.querySelector('[data-bg-color]');
        if (section) {
            const bgColor = section.getAttribute('data-bg-color');
            page.element.style.setProperty('--bg-color', bgColor);
        }
    });
}
  


}




