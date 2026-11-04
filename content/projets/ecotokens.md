---
title: "ecotokens"
description: "Outil Rust de réduction de contexte et d'analyse pour workflows LLM : recherche de code, résumés et économie de tokens."
date: 2026-02-21T22:33:27+02:00
tags: [Rust, LLM, CLI, Open source]
params:
  appCategory: DeveloperApplication
  image: "/images/projets/ecotokens.webp"
  statusLabel: ACTIVE
  kind: Rust
  link: "https://github.com/hansipie/ecotokens"
  linkLabel: "GitHub"
---

![Aperçu de ecotokens](/images/projets/ecotokens.webp)

**ecotokens** est un outil en ligne de commande, écrit en Rust, qui réduit ce que les assistants de code IA envoient réellement au modèle. Il s'installe en une commande, sans configuration, puis filtre automatiquement les sorties de commandes, les lectures de fichiers, les résultats de recherche et les listings de répertoires.

## Le problème
Un assistant comme Claude Code relit en permanence des sorties volumineuses (`grep`, `git`, `cargo`, listings…). Elles remplissent la fenêtre de contexte, coûtent des tokens et noient l'information utile.

## Comment ça marche
- Un **hook PreToolUse** intercepte chaque commande shell avant que sa sortie n'atteigne le modèle : il applique un filtre propre à la famille de commande (git, cargo, python…), compresse et enregistre les économies.
- Un **hook PostToolUse** traite les résultats des outils natifs (lecture de fichiers, recherche, glob) : compression par plan pour le code source, élagage des résultats de recherche.
- Les erreurs, échecs et stack traces ne sont jamais supprimés, et les secrets sont masqués avant filtrage.

## Résultats mesurés
Sur ma propre station de travail, entre le 6 mars et le 27 mai 2026, ecotokens a enregistré **19 928 exécutions de hooks** : **94 282 087 tokens avant filtrage**, **5 874 896 après**, soit **88 407 191 tokens économisés (93,8 %)**. Précision importante : seules 28,8 % des commandes ont donné lieu à une économie, et la famille `grep` représente à elle seule l'essentiel du gain (55 383 168 tokens). La méthodologie détaillée est dans `docs/BENCHMARKS.md` du dépôt.

## Fonctionnalités
- Tableau de bord interactif des gains (TUI) par famille de commandes ou par projet
- Intelligence de code : recherche BM25 et vectorielle, recherche de symboles, graphe d'appels, détection de quasi-doublons
- Serveur MCP exposé en stdio, enregistré automatiquement à l'installation
- Compatible Claude Code, Codex, Hermes, Pi, Gemini CLI, Qwen Code et OpenCode
- En option : résumés par un modèle Ollama local, abréviations de mots, routeur de modèles, reprise de session (`/handoff`)

## Installation
```bash
cargo install --git https://github.com/hansipie/ecotokens
ecotokens install
```
Alternative avec mise : `mise use github:hansipie/ecotokens`.

## Limites
- Le gain dépend fortement des commandes que vous lancez : les 93,8 % ci-dessus viennent de mon usage, pas d'une garantie.
- Les fonctions de routage de modèle, de reprise de session et le panneau compagnon ne concernent que Claude Code.

[GitHub →](https://github.com/hansipie/ecotokens)
