# Plugin texLinebreak pour CSS Page Weaver

Plugin d'intégration de l'algorithme Knuth-Plass (TeX line-breaking) pour Paged.js via CSS Page Weaver.

## Description

Ce plugin implémente l'algorithme de césure de lignes utilisé par TeX pour produire une justification de texte de qualité supérieure. L'algorithme optimise les espacements sur l'ensemble d'un paragraphe plutôt que ligne par ligne, réduisant les espaces trop larges et les traits d'union excessifs.

## Avantages

- **Meilleure justification** : Optimisation globale du paragraphe vs. algorithme "first-fit" du navigateur
- **Moins de traits d'union** : Minimise les coupures de mots inutiles
- **Espacement uniforme** : Évite les "rivières blanches" dans le texte
- **Ponctuation suspendue** : Support de la ponctuation hors de la marge (optionnel)

## Installation

1. Placer le dossier `texLinebreak` dans `csspageweaver/plugins/`
2. Ajouter au `manifest.json` :

```json
{
  "plugins": [
    "texLinebreak"
  ]
}
```

## Structure du plugin

```
texLinebreak/
├── hook.js                    # Hook Paged.js (logique principale)
├── script.js                  # Interface utilisateur
├── template.html              # Template d'interface
├── stylesheet.css             # Styles
├── config.json                # Configuration
├── tex-linebreak2-master/     # Bibliothèque tex-linebreak2
└── README.md                  # Cette documentation
```

## Utilisation

### Automatique

Par défaut, le plugin s'applique à tous les éléments `<p>` :

```html
<p>Votre texte sera automatiquement optimisé...</p>
```

### Ciblée

Utilisez l'attribut `data-tex-linebreak` pour cibler des éléments spécifiques :

```html
<div data-tex-linebreak="true">
  <p>Ce paragraphe utilisera l'algorithme TeX.</p>
</div>
```

Ou ajoutez la classe `.justified-text` :

```html
<p class="justified-text">Texte optimisé...</p>
```

## Configuration

### Via l'interface

Le plugin propose une interface avec les paramètres suivants :

- **Activer la justification** : Active/désactive la justification
- **Ponctuation suspendue** : Permet à la ponctuation de dépasser la marge
- **Facteur d'étirement** : Étirement maximal des espaces (défaut: 1.2 = 220%)
- **Facteur de rétrécissement** : Rétrécissement maximal des espaces (défaut: 0.2 = 80%)
- **Pénalité des traits d'union** : Contrôle la fréquence des césures (défaut: 50)

### Via code

Modifier les options par défaut dans `hook.js` :

```javascript
this.options = {
  justify: true,
  align: "justify",
  hangingPunctuation: true,
  glueStretchFactor: 1.2,
  glueShrinkFactor: 0.2,
  softHyphenPenalty: 50,
  forceOverflowToBreak: false
};
```

### Via événement personnalisé

```javascript
document.addEventListener('texLinebreakSettingsChanged', (event) => {
  console.log('Nouveaux paramètres:', event.detail);
});
```

## API

### Méthodes du Handler

- `beforePageLayout(content)` : Applique l'algorithme avant la pagination
- `afterParsed(content)` : Prépare les éléments ciblés
- `afterPageLayout(pageElement, page, breakToken)` : Gère les paragraphes fragmentés
- `setOptions(newOptions)` : Met à jour les options

### Fonctions du Script

- `exportSettings()` : Exporte les paramètres en JSON
- `importSettings(file)` : Importe des paramètres depuis un fichier
- `updatePlugin()` : Force la mise à jour avec les nouveaux paramètres

## CSS

Le plugin ajoute automatiquement les classes suivantes :

- `.tex-linebreak-enabled` : Marque les éléments traités
- `.tex-hanging-punct` : Appliqué à la ponctuation suspendue
- `.tex-soft-hyphen` : Marque les traits d'union doux

## Compatibilité

- **Paged.js** : Version 0.1.x et supérieure
- **Navigateurs** : Tous les navigateurs modernes
- **tex-linebreak2** : Version 0.8.x

## Dépendances

- Paged.js (inclus dans CSS Page Weaver)
- tex-linebreak2 (inclus dans le plugin)

## Limitations

- Les colonnes multiples nécessitent un traitement particulier
- Les éléments flottants peuvent interférer (utiliser `ignoreFloatingElements: true`)
- Le contenu généré dynamiquement doit être retraité

## Désactivation

Pour désactiver temporairement :

```css
.no-tex-linebreak {
  /* Vos règles CSS normales */
}
```

Ou retirer le plugin du `manifest.json`.

## Développement

### Tester localement

```bash
# Lancer un serveur local
python -m http.server 8000

# Ouvrir http://localhost:8000
```

### Déboguer

Activer les logs dans `hook.js` :

```javascript
console.log('TexLinebreak: Application sur', paragraphs.length, 'paragraphes');
```

## Ressources

- [Article original Knuth-Plass (PDF)](http://www.eprg.org/G53DOC/pdfs/knuth-plass-breaking.pdf)
- [Documentation tex-linebreak2](https://github.com/egilll/tex-linebreak2)
- [Documentation Paged.js](https://pagedjs.org/documentation/)
- [CSS Page Weaver](https://gitlab.com/csspageweaver/csspageweaver)

## Auteur

Développé pour CSS Page Weaver / Paged.js

## Licence

MIT