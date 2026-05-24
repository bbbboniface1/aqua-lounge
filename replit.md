# King Aqua Lounge

Site web restaurant lounge premium à Bamako — menu interactif, commande WhatsApp, galerie photos et contact.

## Run & Operate

- **Démarrer** : `node server.js` (port 5000, bind 0.0.0.0)
- **Sync JS vers public/ et vercel-site/** : `npm run sync`
- **Build (sync + version bump)** : `npm run build`
- **Déploiement Vercel** : push Git → production = dossier **`vercel-site/`** uniquement (voir `DEPLOYMENT.md`)

## Stack

- HTML5 / CSS3 / JavaScript vanilla (aucun framework)
- Node.js 24 — serveur statique custom `server.js` avec gzip/brotli + headers sécurité
- Images : WebP optimisées dans `images/optimized/`
- Fonts : Cormorant Garamond + Montserrat via Google Fonts (display=swap)
- PWA : `manifest.json` + `sw.js` (service worker, cache offline)

## Where things live

- `js/` — source of truth JS → copié vers `public/js/` et `vercel-site/js/` via `sync-js.cjs`
- `css/style.css` → copié vers `vercel-site/css/style.css`
- `images/optimized/` → photos réelles WebP (hero + galerie + menu)
- `vercel-site/` — dossier déployé sur Vercel (miroir complet du root)
- `server.js` — serveur Node.js avec gzip, brotli, cache 1 an pour assets versionnés, headers sécurité
- `sw.js` / `manifest.json` — PWA installable sur mobile

## Architecture decisions

- **Pas de framework** : site statique pur pour performance maximale sur connexions faibles (Mali)
- **Gzip/Brotli natif** : zlib Node.js sans dépendances — CSS 51KB → 9KB transmis (−82%)
- **Service worker** : cache offline pour utilisateurs mobiles sans connexion stable
- **Assets versionnés** (`?v=YYYYMMDD-N`) → `Cache-Control: max-age=31536000, immutable`
- **Source of truth JS** dans `js/` → sync vers vercel-site via `npm run sync`

## Product

- Page d'accueil avec slider hero (4 vraies photos du restaurant)
- Menu interactif avec filtres par catégorie et panier localStorage
- Commande via WhatsApp (message formaté automatiquement)
- Galerie 8 photos authentiques du cadre du restaurant
- Page contact avec carte Google Maps intégrée
- PWA installable sur écran d'accueil (utile pour clients réguliers)

## User preferences

- Site 100% authentique : uniquement vraies photos du restaurant (pas d'IA)
- Textes en français, orthographe soignée
- Après modifications HTML : toujours copier vers `vercel-site/` pour sync Vercel

## Gotchas

- `ffmpeg` disponible pour conversion images WebP
- Pour la prod Vercel : éditer **`vercel-site/`** (ou copier root → `vercel-site/` avant push). Ne pas compter sur `public/` pour le déploiement.
- `js/app.js` et `js/menu-data.js` sont la source de vérité JS — lancer `npm run sync` après modification
- Encoding : les fichiers HTML sont UTF-8 ; `œ` = `c5 93` en bytes

## Pointers

- Skill `workflows` pour gérer le workflow `Start application`
- Skill `environment-secrets` si ajout de clés API futures
