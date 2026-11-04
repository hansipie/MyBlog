---
title: "RustyTM"
description: "Gestionnaire de tâches pour Linux en interface terminal (ratatui), écrit en Rust."
date: 2026-10-26T23:35:07+02:00
tags: [Rust, Linux, TUI]
params:
  image: "/images/projets/rustytm.webp"
  statusLabel: ACTIVE
  kind: Rust
  link: "https://github.com/hansipie/RustyTM"
  linkLabel: "GitHub"
---

![Aperçu de RustyTM](/images/projets/rustytm.webp)

RustyTM est un gestionnaire de tâches Linux en terminal. Chaque collecteur lit directement `/proc`, `/sys`, `systemctl`, `loginctl` et `nvidia-smi`.

## Points clés

- Pages : processus, performances, thermique, batterie, pilotes, disques, benchmarks…
- Mode `--dump=<page>` pour rendre une page en texte
- Aucune clé de licence, toutes les pages sont actives

## Installation

```
cargo install rustytm --locked
```

[GitHub →](https://github.com/hansipie/RustyTM)
