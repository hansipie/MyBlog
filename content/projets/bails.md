---
title: "Bails"
description: "Petite fenêtre de bureau rétro-arcade qui affiche en temps réel les quotas restants de Claude Code et Codex, avec le compte à rebours avant reset."
date: 2026-11-05T11:20:45+02:00
tags: [Electron, TypeScript, Claude Code, Codex]
params:
  appCategory: DeveloperApplication
  os: "macOS, Windows, Linux"
  image: "/images/projets/bails.webp"
  statusLabel: ACTIVE
  kind: Desktop
  link: "https://github.com/hansipie/bails"
  linkLabel: "GitHub"
---

![Capture d'écran de Bails : cartes Claude Code et Codex avec jauges de quota pixelisées et compte à rebours avant reset](/images/projets/bails.webp)

**Bails** (*Token Watch*, « le jeton qui garde un œil sur vos tokens ») est une petite application de bureau au look rétro-arcade qui affiche en temps réel l'usage de vos abonnements CLI IA : fenêtres de rate-limit, pourcentage restant et compte à rebours avant reset.

## Pourquoi
Avec Claude Code et Codex, les limites tombent par fenêtres (session de 5 h, quota hebdomadaire) et on ne sait pas toujours où on en est. Bails garde ces jauges sous les yeux, dans une fenêtre discrète, pour ne pas découvrir la limite au milieu d'une tâche.

## Ce qu'on voit
- **Claude Code** et **Codex** : session 5 h, quota hebdomadaire et dépense on-demand.
- Des **jauges pixel** façon barre d'énergie : orange, puis jaune sous 20 %, puis rouge clignotant à sec.
- Un **compte à rebours** avant chaque reset, rafraîchi toutes les 30 s, et un rafraîchissement automatique toutes les 5 min (bouton `REFRESH` pour forcer).
- L'email du compte flouté par défaut, révélé d'un clic, et la commande de connexion à copier quand un provider n'est pas connecté.

## Comment ça marche
- Bails lit les credentials existants **en lecture seule** (`~/.claude/.credentials.json` et `~/.codex/auth.json`) et interroge les endpoints d'usage de chaque service. Les fichiers ne sont jamais réécrits ni les tokens rafraîchis : si un token a expiré, la carte invite à relancer `claude` ou `codex login`.
- Le service d'usage met le rapport en cache 2 min, dédoublonne les requêtes concurrentes et applique un backoff exponentiel (1 à 15 min) en cas de HTTP 429, tout en affichant le dernier résultat valide.
- **100 % local** : polices embarquées, aucune télémétrie.
- L'architecture des providers est générique : ajouter un nouvel outil revient à écrire un fichier et à l'enregistrer dans une liste.

## Stack
Electron, React et TypeScript, tests avec Vitest. Thème arcade avec les polices Press Start 2P et VT323, icône pixel-art 32×32.

## Installation
Les installeurs sont disponibles dans les [Releases](https://github.com/hansipie/bails/releases) pour macOS (Apple Silicon et Intel), Windows et Linux (AppImage, `.deb`, `.rpm`). Les binaires ne sont pas signés : sur macOS, clic droit puis *Ouvrir* au premier lancement ; sur Windows, passer l'avertissement SmartScreen.

Version actuelle : 0.1.0, licence MIT.

[GitHub →](https://github.com/hansipie/bails)
