import { Handler } from "../../../lib/paged.esm.js";

/**
 * URL Break Handler
 * Adds word break opportunities (<wbr>) to URLs in links for better printing
 */
export default class URLBreakHandler extends Handler {
  constructor(chunker, polisher, caller) {
    super(chunker, polisher, caller);
  }

  beforeParsed(content) {
    // Select all links starting with http or www
    const links = content.querySelectorAll('a[href^="http"], a[href^="www"]');
    
    links.forEach(link => {
      const textContent = link.textContent;
      
      // Only process if link contains only text (no child elements) and starts with http or www
      if (!(link.childElementCount === 0 && textContent.match(/^http|^www/))) {
        return;
      }

      let printableUrl = textContent;
      
      // Add <wbr> after double slash (//)
      printableUrl = printableUrl.replace(/\/\//g, "//\u003Cwbr\u003E");
      
      // Add <wbr> after commas
      printableUrl = printableUrl.replace(/\,/g, ",\u003Cwbr\u003E");
      
      // Add <wbr> before these characters: / ~ - . , _ ? # %
      printableUrl = printableUrl.replace(
        /(\/|\~|\-|\.|\,|\_|\?|\#|\%)/g,
        "\u003Cwbr\u003E$1"
      );
      
      // Replace hyphens with non-breaking hyphens preceded by <wbr>
      printableUrl = printableUrl.replace(/\-/g, "\u003Cwbr\u003E&#x2011;");
      
      // Store the processed URL and update the link
      link.setAttribute("data-print-url", printableUrl);
      link.innerHTML = printableUrl;
    });
  }
}


