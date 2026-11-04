---
title: "RustyTM"
description: "Gestionnaire de tâches pour Linux en interface terminal (ratatui), écrit en Rust."
date: 2026-10-26T23:35:07+02:00
tags: [Rust, Linux, TUI]
params:
  appCategory: DeveloperApplication
  os: "Linux"
  image: "/images/projets/rustytm.webp"
  statusLabel: ACTIVE
  kind: Rust
  link: "https://github.com/hansipie/RustyTM"
  linkLabel: "GitHub"
---

![Aperçu de RustyTM](/images/projets/rustytm.webp)

**RustyTM** est un gestionnaire de tâches pour Linux, en interface terminal, écrit en Rust avec [ratatui](https://ratatui.rs). Il rassemble sur un même écran ce qu'on cherche d'ordinaire dans plusieurs outils.

## Une implémentation originale
Chaque collecteur lit directement `/proc`, `/sys`, `systemctl`, `loginctl` et `nvidia-smi`. Il n'y a ni clé de licence, ni fonctionnalité verrouillée : toutes les pages sont actives.

## Les pages
Résumé, Processus (arbre, signaux, priorité, affinité), Performances (CPU, mémoire, disques, réseau, GPU), Historique des applications, Démarrage, Utilisateurs, Services, Infos système, Alimentation et fréquences, Thermique (un graphe par capteur), Batterie (état, énergie, santé, cycles, prévision), Flight Recorder (enregistrement et relecture), Connexions, Applications installées, Pilotes, Espace disque, Benchmarks (CPU, disque, GPU, internet), Santé des disques (SMART) et Réglages. La touche `?` affiche les raccourcis.

## Pour les curieux
- `rustytm --page=drivers` ouvre directement une page.
- `rustytm --dump=connections --size=160x40` rend une page en texte, pratique pour des captures ou des scripts.
- `rustytm --record=30` lance le Flight Recorder sans interface.
- `rustytm --bench=cpu|disk|gpu|internet|all` exécute les benchmarks.
- Les graphes partagent le même rendu : aires braille lissées, dégradé vert → ambre → rouge selon la charge.

## Installation
```bash
cargo install rustytm --locked
rustytm update   # vérifie crates.io et installe la dernière version
```

## Limites
Linux uniquement. Certaines pages dépendent d'outils présents sur la machine (par exemple `nvidia-smi` pour le GPU NVIDIA).

[GitHub →](https://github.com/hansipie/RustyTM)
