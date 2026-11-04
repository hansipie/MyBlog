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

ecotokens se place entre vos outils de développement et le modèle : il filtre et résume les sorties de commandes, indexe le code et propose une recherche structurée (outline, symboles, appelants/appelés) pour que le LLM reçoive moins de tokens, mais les bons.

## Points clés

- CLI en Rust, hooks pour Claude Code et d'autres assistants
- Recherche de code, traçage d'appelants et détection de doublons
- Suivi des économies de tokens (`ecotokens gain`)
- Routage de modèles selon la difficulté de la tâche

[GitHub →](https://github.com/hansipie/ecotokens)
