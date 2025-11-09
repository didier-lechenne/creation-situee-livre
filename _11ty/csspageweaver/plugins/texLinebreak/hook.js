/**
 * @name TexLinebreak
 * @file Implémentation de l'algorithme Knuth-Plass pour Paged.js
 * @description Plugin qui applique l'algorithme de césure de ligne TeX pour une justification optimale
 */

import { Handler } from "../../../lib/paged.esm.js";

export default class TexLinebreakHandler extends Handler {
  constructor(chunker, polisher, caller) {
    super(chunker, polisher, caller);
  }

  afterParsed(parsed) {

    const elementsToJustify = parsed.querySelectorAll('section p');
    
    if (elementsToJustify.length > 0) {
      texLinebreak.texLinebreakDOM(elementsToJustify, {
        justify: false,
        align: 'left',
        tolerance: 2,
        lineWidth: 350,
        ignoreFloatingElements: true,
      });
    }

  }

}