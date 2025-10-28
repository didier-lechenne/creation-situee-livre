
# Sans Obsidian, sans Codeberg / git 
### 1. Télécharger et extraire le projet

- Téléchargez le ZIP depuis [https://codeberg.org/ebabx/starterkit](https://codeberg.org/ebabx/starterkit)
- Extrayez-le sur votre disque dur dans un emplacement de travail `nom_de_votre_projet`
- Supprimez .obsidian.zip
- [[Lancer le serveur]]

# Avec Obsidian et Codeberg / Git (recommandé) 
## Créer un compte et un dépôt sur Codeberg

#### A. Créer un compte Codeberg

1. Allez sur [https://codeberg.org](https://codeberg.org)
2. Cliquez sur **"Register Now"**
3. Remplissez :
    - Nom d'utilisateur
    - Email
    - Mot de passe
4. Confirmez votre email

#### B. Créer un token d'accès (mot de passe)

1. Cliquez sur votre photo de profil → **Configuration**
2. Onglet **Applications**
3. Section **"Générer un nouveau jeton"** :
    - **Nom du jeton** : "htmltoprint"
    - **Permissions** : Cochez `repo` (accès complet aux dépôts)
4. Cliquez sur **"Generate Token"**
5. **COPIEZ IMMÉDIATEMENT** le token (il ne sera plus visible après)
6. ou envoyez-vous un mail comme sujet "token codeberg" (mettez moi en copie d.lechenne@ebabx)
7. 
#### C. Créer un nouveau dépôt

1. Connectez-vous sur Codeberg
2. Cliquez sur le **"+"** en haut à droite → **"Nouveau dépôt"**
3. Remplissez :
       - **Nom du dépôt** : `nom_de_votre_projet`
    - **Ne cochez PAS** : Rendre le dépôt privé (le dépôt sera public)
    - **Ne cochez PAS** "Initialiser le dépôt" (laissez vide)
4. Cliquez sur **"Créer un dépôt"**

![[img/nouveau_depot.png]]

#### D. Ajouter des collaborateurs sur votre nouveau dépôt

1. Sur votre dépôt Codeberg (`nom_de_votre_projet`), allez dans **Paramètres** 
2. Dans le menu latéral, cliquez sur **Collaborateurs**
3. Section **"Ajouter un collaborateur"** :
    - Entrez le nom d'utilisateur Codeberg du collaborateur (ajouter moi comme ebabx)
    - Cliquez sur **"Ajouter un collaborateur"**
4. Choisissez le niveau d'accès :
    - **Write** (Écriture) : peut push et modifier le code
    - **Admin** (Administration) : peut gérer les paramètres du dépôt (recommandé)
5. Le collaborateur recevra une invitation par email
6. Il doit accepter l'invitation pour avoir accès au dépôt
7. J'aurais, ainsi, accès à la totalité de votre projet pour vous aider.

![[img/collaborateur.png]]

## Fork/Bifurcation depuis l'interface Codeberg

Sur Codeberg, dans le dépôt  [https://codeberg.org/ebabx/starterkit](https://codeberg.org/ebabx/starterkit) :

1. Cliquez sur "Bifurcation"
2. Choisissez `votre_identifiant_codeberg` comme propriétaire
3. Renommer le projet
4. Le dépôt sera copié automatiquement dans votre espace de travail chez Codeberg

![[img/biffurcation-1.png]]

![[img/fork.png]]

Maintenant, il faut récupérer le dépôt/projet sur votre disque dur pour le transformer en coffre Obsidian.

## Récuperer le dépôt/projet sur votre disque dur

#### **1. Ouvrir le terminal dans VS Code**

- Lancez VS Code
- Menu **Terminal** → **Nouveau Terminal** 

![alt text](img/vscode.png)

Il faut se positionner dans le dossier Documents ou dans un un emplacement de travail de votre choix.

```bash
# Windows
cd C:\Users\VotreNom\Documents

# mac os
cd ~/Documents
```

**3. Cloner votre dépôt**

```bash
git clone https://codeberg.org/votre_identifiant_codeberg/nom_de_votre_projet.git
```

Remplacez :
- `votre_identifiant_codeberg` : votre nom d'utilisateur Codeberg à l'étape A
- `nom_de_votre_projet` : le nom du dépôt créé à l'étape C

**4. Ouvrir le projet dans VS Code**
- fichier / ouvrir / `chemin pour le nom_de_votre_projet`
  
**5. Configurer le projet avec votre `token` (mot de passe)

Dans le terminal de VS Code :

```bash
git remote set-url origin https://votre_identifiant_codeberg:VOTRE_TOKEN@codeberg.org/votre_identifiant_codeberg/nom_de_votre_projet.git
```

Remplacez :
- `votre_identifiant_codeberg` : votre nom d'utilisateur Codeberg à l'étape A
- `VOTRE_TOKEN` : le token copié à l'étape B.
- `nom_de_votre_projet` : le nom du dépôt créé à l'étape C

**6. Vérifier la configuration**

```bash
git remote -v
```

Vous devriez voir votre URL avec le token.

**7. Installer projet**

```bash
npm install
```


## Ouvrir le projet comme coffre Obsidian

1. Lancez Obsidian
2. Cliquez sur **"Ouvrir un autre coffre"** → **"Ouvrir le dossier comme coffre"**
3. Sélectionnez le dossier `nom_de_votre_projet`
4. Le projet est maintenant un coffre Obsidian prêt à l'emploi


