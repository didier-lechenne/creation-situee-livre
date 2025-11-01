---
title: Faux titre
template: modularGrid
gridCol: 12
gridRow: 52
gridColGutter: 7.665px
gridRowGutter: 0px
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
printRow: 5,
printHeight: 1
} %}



{% markdown "./inclure/mentions.md", {
printCol: 1,
printWidth: 12,
printRow: 45,
printHeight: 8,
alignSelf: "end"
} %}
