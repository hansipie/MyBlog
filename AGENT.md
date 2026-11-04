# AGENT.md

Ce fichier guide les agents de code (Claude Code, Codex…) qui travaillent dans ce dépôt.

## Vue d'ensemble

Blog personnel statique construit avec Hugo, déployé sur Cloudflare Workers à l'adresse https://blog.ansicode.fr/

- **Framework** : Hugo extended (version épinglée dans `package.json`, script `build`, actuellement 0.154.5)
- **Thème** : `hansilanding` (thème maison, dans `themes/hansilanding/`), avec surcharges dans `layouts/`
- **Langue du contenu** : français (page À propos aussi en anglais)
- **Licence** : CC BY-NC-SA 4.0

Les submodules `themes/meme` et `themes/lightbi-hugo` sont des restes d'anciens thèmes : ils ne sont pas utilisés (`theme = "hansilanding"` dans `hugo.toml`).

## Commandes

```bash
# Développement local (optimise d'abord les images)
npm run dev

# Serveur Hugo seul
hugo server --watch

# Build de production, tel que lancé par le déploiement
npm run build

# Optimisation des images (génère static/_optimized et data/optimizedImages.json)
npm run optimize-images

# Nouvel article
hugo new posts/mon-article.md
```

Pour vérifier un build en local sans perturber un `hugo server` en cours (il réécrit `public/`), construire ailleurs : `hugo --gc --minify -d /tmp/pub`.

## Structure

```
content/
├── posts/       # Articles (nom de fichier : AAAA-MM-JJ-slug.md)
├── projets/     # Une fiche par projet (voir ci-dessous)
├── labs/        # Outils interactifs (dashboards, tarifs LLM)
├── about/       # Page À propos (FR), données dans data/about.toml
└── about-en/    # Page À propos (EN), données dans data/about_en.toml

layouts/         # Surcharges du thème : partials SEO, sitemap, robots.txt, labs/, projets/
themes/hansilanding/  # Thème : head, hero, statusbar, listes, CSS
static/          # Images et fichiers statiques (un dossier par article)
data/            # about*.toml, Socials.toml, optimizedImages.json (généré)
hugo.toml        # Configuration (menu, taxonomies, params du site)
wrangler.jsonc   # Configuration Cloudflare Workers
```

## Front matter

Les articles peuvent être en TOML (`+++`) ou en YAML (`---`) : respecter le format du fichier édité.

```toml
+++
title = "Titre de l'article"
seoTitle = "Titre court pour la balise <title>"   # optionnel, voir SEO
date = 2026-01-16T10:00:00+01:00
draft = false
description = "Description courte (160 caractères au plus)"
tags = ["tag1", "tag2"]
categories = ["categorie"]
+++
```

## Section Projets

Chaque fiche `content/projets/<slug>.md` est en YAML avec les champs suivants :

- `title`, `description`, `tags`
- `date` : date du **premier commit** du projet (la liste est triée du plus récent au plus ancien)
- `params.image` : image d'aperçu `/images/projets/<slug>.webp` (utilisée sur la carte, en tête de fiche et comme image de partage)
- `params.statusLabel`, `params.kind`, `params.link`, `params.linkLabel`
- `params.appCategory` et `params.os` (optionnel) : alimentent le JSON-LD `SoftwareApplication`

Le corps de la fiche commence par l'image, puis le texte. Ne pas inventer de données : s'appuyer sur le README ou le code du projet.

## SEO : conventions à respecter

- **Titres** : la balise `<title>` ne doit pas dépasser 65 caractères, suffixe ` · ansicode` compris. Au-delà, ajouter `seoTitle` (il ne change que la balise `<title>` et `og:title`, pas le titre affiché).
- **Descriptions** : 160 caractères au plus. Les archives de tags et catégories reçoivent une description générée.
- **Pagination** : l'accueil paginé a une canonical propre à chaque page (calculée dans `themes/hansilanding/layouts/partials/head.html`).
- **Tags peu fournis** : les archives de tags comptant moins de `params.taxonomyMinIndexable` pages (2) sont en `noindex, follow` et absentes du sitemap (`layouts/partials/seo-noindex.html`).
- **JSON-LD** : défini dans `layouts/partials/structured-data.html` (articles `BlogPosting`, fiches projets `SoftwareApplication`, labs `WebApplication`, profils `ProfilePage`).
- **Hreflang** : seules les pages À propos ont une version anglaise (`params.lang`, `params.langAlt`).
- **Images** : toujours un texte alternatif descriptif ; les images de `static/` reçoivent leurs dimensions automatiquement (`layouts/partials/responsive-image.html`).
- **Robots** : `layouts/robots.txt` bloque les robots d'entraînement IA (GPTBot, ClaudeBot, CCBot, Google-Extended, Bytespider) et laisse passer la recherche. Décision éditoriale : ne pas la modifier sans accord.

## Déploiement

Le déploiement est automatique via GitHub Actions (`.github/workflows/deploy.yml`) à chaque push sur `master` : `npm ci` puis `npx wrangler deploy`. Wrangler lance `npm run build` (optimisation des images, téléchargement de Hugo extended, build minifié) et publie `public/` sur Cloudflare Workers. Le secret `CLOUDFLARE_API_TOKEN` est requis.

## Notes importantes

- Les images d'un article vont dans `static/<AAAAMMJJ-slug>/` et sont référencées avec des chemins absolus depuis la racine du site (`/20260427-ram/01-flambee-prix.png`). `static/_optimized/` est généré et ignoré par git.
- Les pages datées dans le futur ne sont pas construites par Hugo : vérifier la date si une page n'apparaît pas.
- Les pages Labs (`layouts/labs/*.html`) embarquent des instantanés de données mis à jour à la main (commits « refresh … snapshot »).
- La configuration complète est dans `hugo.toml`.
