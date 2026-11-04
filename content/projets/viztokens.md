---
title: "viztokens"
description: "Interface terminal qui suit en temps réel les échanges entre Claude Code et le modèle, avec le contenu complet."
date: 2026-06-24T14:29:13+03:00
tags: [Rust, TUI, Claude Code]
params:
  appCategory: DeveloperApplication
  image: "/images/projets/viztokens.webp"
  statusLabel: ACTIVE
  kind: Rust
  link: "https://github.com/hansipie/viztokens"
  linkLabel: "GitHub"
---

![Aperçu de viztokens](/images/projets/viztokens.webp)

**viztokens** est une interface terminal (TUI) en Rust qui affiche en temps réel tout ce qui s'échange entre Claude Code et le modèle : invites, réponses, appels d'outils et résultats, avec leur contenu complet et sans troncature.

## Pourquoi
Quand on travaille avec un assistant de code, on voit rarement ce qui part réellement vers le modèle. viztokens rend ces échanges lisibles, ce qui aide à comprendre où partent les tokens et à déboguer un comportement inattendu.

## Comment ça marche
- Il suit les fichiers de session JSONL natifs de Claude Code, les mêmes que ceux utilisés par [ccusage](https://github.com/ryoppippi/ccusage) : **aucune configuration à modifier côté Claude Code**.
- Les sessions sont cherchées dans `$CLAUDE_CONFIG_DIR/projects/` puis `~/.claude/projects/`, et la plus récente est sélectionnée automatiquement.
- L'historique est conservé dans une base SQLite locale pour remonter dans des sessions démarrées avant le lancement de viztokens.

## Ce qu'on voit
- Des blocs colorés par type : USER, ASSISTANT (avec le modèle et les tokens d'entrée/sortie), TOOL CALL, TOOL RESULT et SYSTEM.
- Les totaux cumulés dans le pied de page, selon les messages visibles.
- Des filtres au clavier (`f` pour parcourir les types, `1` à `4` pour les activer, `F` pour tout afficher) et un suivi automatique du dernier message.

## Installation
```bash
cargo install viztokens
```
Version actuelle : 0.3.0, licence MIT.

[GitHub →](https://github.com/hansipie/viztokens)
