# Plugin for sidenotes

This plugin proposes a script for sidenotes in Paged.js.

The plugin creates sidenotes from `span` elements in the text flow. It can be combined with the [inline_notes plugin](https://gitlab.com/csspageweaver/plugins/inline_notes) to create these span elements from listed notes, which are more common in conversion tools like Pandoc.

Note: The plugin moves notes if they overlap or if the last note overflows at the end of the page.

## How to use the plugin

Add this folder to `csspageweaver/plugins/`.

Call the plugin in `csspageweaver/manifest.json`:

```json
	"plugins": [
        "sidenotes",
        // other plugins ...
	],
```

## Configuration

In `manifest.json`, you can modify/add some parameters:

```json
    "plugins":{
        "sidenotes"
    },
    "pluginsParameters":{
        "sidenotes": {
            "selector": ".sidenote",
            "position": "outside",
            "reset": ".chapter",
            "align": ".chapter p:first-of-type"
        }
    },
 ```


All the parameters are optional.

- `selector` → CSS selector for the note element (must be inline in the HTML), default is `.sidenote`
- `position` → Specifies the position of sidenotes relative to the main text: options are "outside", "inside", "left", "right".
    - 'outside': the left pages notes positonned on the margin left and the right pages notes on the margin right. This is the default value.
    - 'inside': the left pages notes positonned on the margin right and the right pages notes on the margin left.
    - 'left': the notes of both pages are positinoned on the margin left.
    - 'right': the notes of both pages are positinoned on the margin left.
- `reset` → CSS selector where you want reset note counter
- `align` →  Element to align the first note of the page to, if present on the page



## Notes in HTML

In your HTML, the note must be a `<span>` inserted in the text, like this:

```HTML
Donec tincidunt, odio vel vestibulum sollicitudin, nibh dolor tempor sapien, ac laoreet 
sem felis ut purus.&#8239;<span class="sidenote">Vestibulum neque ex, ullamcorper sit 
amet diam sed, pharetra laoreet sem.</span> Morbi cursus bibendum consectetur. Nullam vel 
lacus congue nibh pulvinar maximus sit amet eu risus. Curabitur semper odio mauris, nec 
imperdiet velit pharetra non. Aenean accumsan nulla ac ex iaculis interdum.
```

You can use the [inline_notes` plugin](https://gitlab.com/csspageweaver/plugins/inline_notes) to create these span elements from listed notes, which are more common in conversion tools like Pandoc.

The inline_notes plugin should be called before the sidenotes plugin in the `manifest.json`:


```json
	"plugins": [
        "inline_notes",
        "sidenotes",
        // other plugins ...
	],
```



## Styling notes

By default, the width of the notes is set on the corresponding margin where the notes are positioned. You can change this width by adjusting the `padding-left` and `padding-right` of your note elements.

To apply specific style depending on the left or right pages, uses the following CSS (where `sidenote` is the class of your notes):

```CSS
.pagedjs_left_page .sidenote {
    padding-left: 40px;
    padding-right: 20px;
}
.pagedjs_right_page .sidenote {
    padding-left: 20px;
    padding-right: 40px;
}
```

It's possible to change the styles of call notes and marker notes directly in your stylesheet like in the following code:

```CSS
.pagedjs_sidenote_call{
    color: blue; 
}
.pagedjs_sidenote_marker{
    color: violet; 
}
```


## Possible improvement


Currently, there is no way to break a note element across two pages in Paged.js. If all the sidenotes on a page don't fit, the overflowing sidenotes are pushed to the next page. Implementing a feature to split notes across pages would enhance the layout flexibility.
