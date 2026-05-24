# Déploiement Vercel — source : `vercel-site/`

**Le site en ligne est servi depuis le dossier `vercel-site/`.**  
Toute modification visible sur [aqua-lounge.vercel.app](https://aqua-lounge.vercel.app) doit être faite (ou copiée) dans ce dossier avant le push.

## Configuration Vercel (recommandée)

Dans le projet Vercel → **Settings → General → Root Directory** :

| Paramètre        | Valeur        |
|------------------|---------------|
| Root Directory   | `vercel-site` |
| Build Command    | *(vide)*      |
| Output Directory | *(vide)*      |
| Install Command  | *(vide)*      |

Avec ce réglage, Vercel lit `vercel-site/vercel.json` et déploie les fichiers statiques tels quels (pas de build `public/`).

## Alternative : racine du dépôt

Si le **Root Directory** est la racine du repo (`.`), le fichier `vercel.json` à la racine impose :

- `outputDirectory`: `vercel-site`
- pas de commande de build

Le déploiement utilise alors aussi **`vercel-site/`**, pas `public/`.

## Fichiers à modifier pour le site en production

- `vercel-site/index.html`, `menu.html`, `commande.html`, `galerie.html`, `contact.html`, `404.html`
- `vercel-site/css/`, `vercel-site/js/`, `vercel-site/fonts/`, `vercel-site/images/`
- `vercel-site/sw.js`, `vercel-site/manifest.json`, `vercel-site/vercel.json`

## À ne pas confondre

| Dossier      | Rôle                                              |
|--------------|---------------------------------------------------|
| `vercel-site/` | **Déployé sur Vercel** — source de vérité prod   |
| `public/`      | Ancien build local ; peut être désynchronisé      |
| Racine (`*.html`, `css/`) | Copie de travail ; recopier vers `vercel-site/` si besoin |

## Après des changements à la racine

Si vous éditez les fichiers à la racine du repo, synchronisez vers `vercel-site/` avant de pousser :

```bash
cp index.html menu.html commande.html galerie.html contact.html 404.html vercel-site/
cp -R css js vercel-site/
```

Puis commit + push sur la branche connectée à Vercel.

## Branche actuelle (refonte humaine)

La refonte (hero mosaïque, style plus humain) est dans **`vercel-site/`** sur la branche `cursor/human-restaurant-redesign`.  
Merge sur `main` puis push pour mettre en ligne sur Vercel.
