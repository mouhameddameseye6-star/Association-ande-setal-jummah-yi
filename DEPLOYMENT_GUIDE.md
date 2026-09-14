# Guide de Déploiement ASJY (GitHub & Vercel)

Ce document explique pas à pas comment déployer le site sans l'erreur **404: NOT_FOUND**.

---

## Pourquoi l'erreur 404 apparaissait-elle ?

Sur Vercel, l'erreur `404: NOT_FOUND` survient dans l'un de ces deux cas :
1. **GitHub contenait un dossier imbriqué** (par exemple `andeu-setal-jummah-yi/andeu-setal-jummah-yi/...` au lieu d'avoir `package.json` et `index.html` directement à la racine du dépôt).
2. **Le dossier de sortie (Output Directory)** n'était pas précisé comme étant `dist`.

Le fichier `vercel.json` a été mis à jour pour forcer automatiquement Vercel à utiliser `dist` et le framework `vite`.

---

## 1. Structure que DOIT avoir votre dépôt GitHub

À la racine de votre dépôt GitHub (quand vous ouvrez votre dépôt sur github.com), vous devez voir directement :

```text
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vercel.json
├── vite.config.ts
├── public/
└── src/
```

⚠️ **Important** : Ne glissez pas un dossier dans un autre dossier. Les fichiers doivent être à la racine !

---

## 2. Configuration sur Vercel (Import Project)

1. Allez sur **[vercel.com/new](https://vercel.com/new)**.
2. Choisissez votre dépôt GitHub.
3. Vérifiez les champs :
   - **Framework Preset** : `Vite`
   - **Root Directory** : `./` (la racine)
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`
   - **Install Command** : `npm install`
4. Cliquez sur **Deploy**.

Le site sera immédiatement en ligne sans aucune erreur 404 !
