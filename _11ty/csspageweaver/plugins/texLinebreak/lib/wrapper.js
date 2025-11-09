/**
 * Wrapper ES Module pour lib.js (bundle UMD)
 * Charge le script et expose les exports globaux
 */

// Charger le script UMD
const script = document.createElement('script');
script.src = new URL('./lib.js', import.meta.url).href;

// Attendre que le script soit chargé
await new Promise((resolve, reject) => {
  script.onload = resolve;
  script.onerror = reject;
  document.head.appendChild(script);
});

// Le module UMD l'expose sur window.texLinebreak
const texLinebreak = window.texLinebreak;

if (!texLinebreak) {
  throw new Error('texLinebreak non trouvé sur window après chargement du script');
}

// Exporter ce qui est disponible
export default texLinebreak;
export const texLinebreakDOM = texLinebreak.texLinebreakDOM || texLinebreak;
