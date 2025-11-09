/**
 * @name Blank is name of plugin
 * @file This file is a hook. It does nothing. It's just an example 
 * @author Jane Doe <jane@dooooooooooooo.oe>
 * @see { @link https://jsdoc.app/about-getting-started }
 */

import { Handler } from "../../../lib/paged.esm.js";

export default class YOUR_HOOK_NAME extends Handler {

  constructor(chunker, polisher, caller) {
    super(chunker, polisher, caller);
  }

  beforeParsed(content) {
    // Your logic

  }
}