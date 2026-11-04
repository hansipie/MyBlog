---
title: "ecotokens-panel"
description: "Plugin Claude Code : un panneau latéral à onglets autour d'ecotokens (modèle, contexte, quota, économies de tokens)."
date: 2026-10-06T14:49:33+03:00
tags: [Claude Code, Plugin, ecotokens]
params:
  appCategory: DeveloperApplication
  image: "/images/projets/ecotokens-panel.webp"
  statusLabel: ACTIVE
  kind: Plugin
  link: "https://github.com/hansipie/ecotokens-panel"
  linkLabel: "GitHub"
---

![Aperçu de ecotokens-panel](/images/projets/ecotokens-panel.webp)

**ecotokens-panel** est un plugin pour **Claude Code** qui ajoute un bouton **◧ ecotokens-panel** dans le pied de page et un panneau latéral à onglets. Il rend visibles, dans l'interface, des informations que l'on ne voit d'ordinaire qu'en ligne de commande, autour d'[ecotokens](/projets/ecotokens/).

## Les onglets
- **Session** : modèle et effort, fenêtre de contexte, quota de l'abonnement, coût équivalent API et handoff.
- **Contexte** : le détail de la fenêtre comme `/context` (grille, répartition, cache de la dernière requête, fichiers mémoire, serveurs MCP, skills, agents).
- **Ecotokens** : les économies de la session, avec les 5 dernières sorties filtrées et les 5 derniers appels à Jev.
- **Gains**, **Watch** et d'autres vues autour de l'index et des agents.

On ouvre ou ferme le panneau avec le bouton ou la commande `/panel`. Les touches `1` à `6` changent d'onglet.

## Installation
Dans un terminal Claude Code :
```
/plugin install ecotokens-panel --marketplace hansipie/ecotokens-panel
```
Installé en portée `user`, il fonctionne aussi dans l'onglet Code de l'application desktop.

## Prérequis et limites
- Claude Code, avec la prise en charge des plugins à hooks.
- ecotokens 0.30.0 ou plus récent, hooks installés (`ecotokens install`).
- `sqlite3` dans le `PATH` : le panneau lit en lecture seule les bases d'ecotokens.
- Le plugin est fait pour Claude Code uniquement : il ne fonctionne ni seul ni dans d'autres outils, même si ecotokens les prend en charge.

[GitHub →](https://github.com/hansipie/ecotokens-panel)
