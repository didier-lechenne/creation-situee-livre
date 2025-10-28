## Eleventy (11ty) pour pagedjs

https://valentine_stm.codeberg.page/desencombrement/print.html

---
## Les commandes pour lancer le serveur

Si les commandes ne marche pas depuis Obsidian.
Il faut les lancer avec Visuel Studio Code, dans un terminal

![alt text](aide/img/vscode.png)


Avec rechargement automatique

```node
npm run serve
```


Avec rechargement manuel

```node
npm run serve:static
```

Le document (site web paginé) sera visible dans le navigateur Chrome a cette adresse :<br/>
http://localhost:3000/desencombrement/print.html


---

## Aide pour insérer des images

[shortcodes](aide/shortcodes.md)


## Les commandes npm (node)

Sur Mac, trouvez d'abord le chemin de npm :

Ouvrez Terminal et tapez :

```bash
which npm
```

Le résultat sera probablement :

- **Mac Intel :** `/usr/local/bin`
- **Mac Apple Silicon (M1/M2/M3) :** `/opt/homebrew/bin`

Ajoutez le **dossier** (sans `/npm`) dans "PATH additions for macOS" des paramètres Shell Commands.


![](aide/img/shell_2.jpg)

![](aide/img/shell_1.png)