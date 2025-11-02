---
title: colloque-2-intro
draft: false
template: modularGrid
gridCol: 12
gridRow: 26
gridColGutter: 0mm
gridRowGutter: 0mm
class: introColloque-2 colloque
---

<breakpage/>

{% markdown "./inclure/colloque-2-surtitre.md", { 
  printCol: 1,
  printWidth: 12,
  printRow: 1,
  printHeight: 2,
  class: "surtitre",
  alignSelf: "start"
} %}


{% markdown "./inclure/colloque-2-centre.md", {
printCol: 2,
printWidth: 10,
printRow: 2,
printHeight: 5,
alignSelf: "center",
class: "centre"
} %}


{% markdown "./inclure/colloque-2-lieu.md", {
printCol: 1,
printWidth: 12,
printRow: 6,
printHeight: 2,
alignSelf: "end",
class: "lieu"
} %}

