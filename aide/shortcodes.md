
## A - Images simple

### 1. Image flottante 

```css
{% image "images/domestique.png", { 
  class:"floatpage-top",
  caption: "Aménagement domestique de la cuisine moderne proposé par Catharine Beecher, privilégiant les systèmes de rangement et les plans de travail, *The American Woman’s Home : or Principles of Domestic Science*, Ford and Company, 1869, p34."
} %}
```

Vous pouvez passer des paramètres pour retirer cette image du flux avant de la placer à l'endroit désiré.
Pour cela, il faut utiliser des `class`

```css
/* force la position de l'image en haut de la page. */
class:"floatpage-top"
/* force la position de l'image en bas de la page */
class:"floatpage-bottom"
/* force la position de l'image dans la page suivante */
class:"floatpage-next-page"
```

Cela fonctionne également pour des fragments, les bloc de texte.

```css
{% markdown "./inclure/legende_recupero-e-reinvenzione.md", { 
  class: "floatpage-bottom figcaption text-right",
} %}
```

Pour les fragments de texte, vous pouvez transmettre d'autre paramètres.

```css
/* applique le style pour les légendes. */
class:"figcaption"
/* aligne la légende à gauche */
class:"text-left"
/* aligne la légende à droite */
class:"text-right"
/* la légende est centrée */
class:"text-center"
```

### 2. Images en pleine page (avec des bords perdus)

```js
{% image "./images/archery-outdoors-women-dithered.png", { 
 class:"fullpage-page"
} %}
```

Vous pouvez passer des paramètres pour positionner ces images
Pour cela, il faut utiliser des `class`

```css
/* L'élément sera retiré du flux et placé dans la page suivante. */
class:"fullpage-page"
/* L'élément sera retiré du flux et placé dans la prochaine page de gauche. */
class:"fullpage-left"
/* L'élément sera retiré du flux et placé dans la prochaine page de droite. */
class:"fullpage-right"
/* L'élément sera retiré du flux et placé dans la prochaine double page. */
class:"fullpage-spread"
```

Il est également possible de déplacer cette image dans une page spécifique.
Mais il faut le faire autrement : en écrivant un style css spécifique pour cette image
  
```css
elem{
/*  L'élément sera retiré du flux et placé dans la page que vous spécifiez. */
    --pagedjs-full-page: 4;
}
```

```js
{% image "./images/archery-outdoors-women-dithered.png", { 
 class:"fullpage-page-4"
} %}
```

et dans `_11ty/assets/themes/votre_theme/css/print/custom.css`

```css
.fullpage-page-4{
    --pagedjs-full-page: 4;
}
```


### Images en pleine page mais avec une marge (blanc tournant)

La marge peut être ajuster dans (de manière globale)  
`_11ty/assets/csspageweaver/plugins/fullContent/fullContent.css`

```css
:root {
  --fullcontent-margin-top: 10mm;
  --fullcontent-margin-bottom: 10mm;
  --fullcontent-margin-left: 10mm;
  --fullcontent-margin-right: 10mm;
}
```

```js
{% image "./images/archery-outdoors-women-dithered.png", { 
 class:"fullcontent-page"
} %}
```

Vous pouvez passer des paramètres pour positionner ces images
Pour cela, il faut utiliser des `class`.

```css
/* L'élément sera retiré du flux et placé dans la page suivante. */
class:"fullcontent-page"
/* L'élément sera retiré du flux et placé dans la prochaine page de gauche. */
class:"fullcontent-left"
/* L'élément sera retiré du flux et placé dans la prochaine page de droite. */
class:"fullcontent-right"
/* L'élément sera retiré du flux et placé dans la prochaine double page. */
class:"fullcontent-spread"
```

Il est également possible de déplacer cette image dans une page spécifique.
Mais il faut le faire autrement : en écrivant un style spécifique pour cette image
  
```css
elem{
/*  L'élément sera retiré du flux et placé dans la page que vous spécifiez. */
    --pagedjs-full-content: 4;
}
```

```js
{% image "./images/archery-outdoors-women-dithered.png", { 
 class:"fullcontent-page-18"
} %}
```

et dans `_11ty/assets/themes/votre_theme/css/print/custom.css`

```css
.fullcontent-page-4{
    --pagedjs-full-content: 18;
}
```


## B - Images dans une grille modulaire


Ce shortcode est un peu compliqué. Commencez simplement.

```js
{% grid "./images/intro.JPG", { 
  printCol: 1,
  printWidth: 12,
  printRow: 1,
  printHeight: 7,
  caption: "Scan de carnet d’étude, *carte heuristique : domestique* <br/> Valentine Saint-Martin, octobre 2025."
} %}
```

Ces images sont gérer avec le plugin `Layout`.
Une interface visuelle vous permettra de positionner l'élément dans une grille modulaire.
Le `shortcode` et ses attributs seront automatiquement copié dans le presse papier.

Apres utilisation du plugin `Layout`

```js
{% grid "./images/intro.JPG", { 
  printCol: 1,
  printWidth: 6,
  printRow: 4,
  printHeight: 9,
  imgX: -1.967306450441911,
  imgY: 0,
  imgW: 103.93461290088382,
  caption: "Scan de carnet d’étude, *carte heuristique : domestique* <br/> Valentine Saint-Martin, octobre 2025."
} %}
```

1- Avec un `frontmatter` et un template/layout/gabarit `modularGrid`

```js
---
title: domotique-image
template: modularGrid
gridCol: 12
gridRow: 22
gridColGutter: 3mm
show: print
moveTo: 53
draft: false
---

{% grid "images/nobody-at-table-edited_dithered.png", { 
  col: 8,
  printCol: 1,
  width: 12,
  printWidth: 12,
  printRow: 1,
  printHeight: 9,
  imgX: -1.967306450441911,
  imgY: 0,
  imgW: 103.93461290088382,
  caption: "La table chauffante « électrique » est équipée d’une couverture en laine des Abbruzzes de 240×240 cm. Photo : Marina Kálcheva. Source : <br> https://solar.lowtechmagazine.com."
} %}
```

Observez `moveTo: 53`
Dans cet exemple cette image et la grille modulaire sera déplacé dans la page -> `53`


2 - sans `frontmatter`

```js
:::: modularGrid

{% grid "./images/intro.JPG", { 
  printCol: 1,
  printWidth: 12,
  printRow: 1,
  printHeight: 7,
  imgX: 0,
  imgY: 0,
  imgW: 102.73455346354616,
  caption: "Scan de carnet d’étude, *carte heuristique : domestique* <br/> Valentine Saint-Martin, octobre 2025."
} %}

::::
```

Pas de déplacement dans une page spécifique.

## C - Des fragments de texte dans une grille modulaire

Ces fragment de texte sont gérer également avec le plugin `Layout`
Une interface visuelle vous permet de les positionner dans une grille modulaire.
Le `shortcode` est automatiquement copié dans le presse papier.

1- Avec un `frontmatter` et un template/layout/gabarit `modularGrid`

```js
---
title: Faux titre
template: modularGrid
gridCol: 12
gridRow: 36
gridColGutter: 3mm
gridRowGutter: 3mm
show: print
class: fauxtitre
toc: ignore
draft: false
---

{% markdown "./inclure/titre.md", { 
  printCol: 1,
  printWidth: 12,
  printRow: 1,
  printHeight: 3
} %}

{% markdown "./inclure/sous-titre.md", { 
  printCol: 1,
  printWidth: 12,
  printRow: 4,
  printHeight: 3
} %}

{% markdown "./inclure/mentions.md", { 
  printCol: 1,
  printWidth: 12,
  printRow: 27,
  printHeight: 10,
  alignSelf: "end"
} %}
```

2 - sans `frontmatter`

```js
:::: modularGrid

{% markdown "./inclure/titre.md", { 
  printCol: 1,
  printWidth: 12,
  printRow: 1,
  printHeight: 3
} %}

::::
```
<br />