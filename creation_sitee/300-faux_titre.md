---
title: Faux-titre
template: modularGrid
gridCol: 12
gridRow: 36
gridColGutter: 0mm
gridRowGutter: 0mm
show: print
class: fauxtitre
toc: ignore
draft: false
---

{% markdown "./inclure/colloque-1-surtitre.md", { 
  printCol: 1,
  printWidth: 12,
  printRow: 1,
  printHeight: 2,
  class: "surtitre"
} %}


{% markdown "./inclure/colloque-1-centre.md", {
printCol: 2,
printWidth: 10,
printRow: 2,
printHeight: 34,
alignSelf: "center",
class: "centre"
} %}


{% markdown "./inclure/colloque-1-lieu.md", {
printCol: 1,
printWidth: 12,
printRow: 35,
printHeight: 2,
alignSelf: "end",
class: "lieu"
} %}

