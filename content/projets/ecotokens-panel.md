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
- **Gains** : pour le workspace courant, les tokens économisés, le coût évité et le détail par famille, ainsi que l'usage de Jev (appels, coût, latence, erreurs). La période se choisit : jour, semaine, mois ou tout.
- **Watch** : l'état du watcher d'index du dossier (PID, sessions, journal) et les autres dossiers surveillés. La touche `w` le démarre ou l'arrête.
- **Background** : les agents et coéquipiers de la session (statut, modèle, temps écoulé, nombre d'outils, tokens et coût estimé) et les tâches lancées en arrière-plan (Bash, Monitor, workflows, agents distants).

On ouvre ou ferme le panneau avec le bouton ou la commande `/panel`. Les touches `1` à `6` changent d'onglet, `↻` relit tout et `✕` ferme.

## Dans la conversation
Sans ouvrir le panneau, le plugin écrit aussi des lignes grises dans la conversation :
- sous un appel d'outil sur lequel ecotokens a économisé des tokens, par exemple `ecotokens · −11.3k tokens (−91 %) · ≈ $0.02` ;
- à la fin de chaque tour, l'économie du tour puis le cumul de la session ;
- quand un sous-agent délégué par le routeur ecotokens (`router-tiny`, `router-everyday`, `router-large`, `router-hardest`) termine, ses tokens et son coût estimé.

Ces lignes ne sont que de l'affichage : elles ne sont pas envoyées au modèle. Elles se désactivent dans `/config`, avec l'option « Lignes ecotokens dans la conversation » (activée par défaut).

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
