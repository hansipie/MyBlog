# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Blog personnel statique construit avec Hugo, utilisant le thème MemE, déployé sur GitHub Pages à l'adresse https://blog.ansicode.fr/

- **Framework**: Hugo v0.134.0 extended
- **Thème**: MemE (dans `themes/meme/`)
- **Langue du contenu**: Français
- **Licence**: CC BY-NC-SA 4.0

## Commandes de développement

```bash
# Serveur de développement local
hugo server --watch

# Build de production
hugo --gc --minify

# Créer un nouvel article
hugo new posts/mon-article.md
```

## Structure du projet

```
content/
├── posts/      # Articles de blog (Markdown avec front matter TOML)
└── about/      # Page À propos

static/         # Images et fichiers statiques
themes/meme/    # Thème principal (submodule git)
hugo.toml       # Configuration principale du site
```

## Front matter des articles

Les articles utilisent le format TOML :

```toml
+++
title = "Titre de l'article"
date = 2026-01-16T10:00:00+01:00
draft = false
description = "Description courte"
tags = ["tag1", "tag2"]
categories = ["categorie"]
+++
```

## Déploiement

Le déploiement est automatique via GitHub Actions sur push vers `master`. Le workflow installe Hugo extended + Dart Sass, build avec minification, et déploie sur GitHub Pages.

## Notes importantes

- Le thème MemE est un submodule git - utiliser `git clone --recursive` ou `git submodule update --init --recursive`
- Les images des articles vont dans `static/` et sont référencées avec des chemins relatifs à la racine du site
- La configuration complète du thème est dans `hugo.toml` (environ 1500 lignes)
