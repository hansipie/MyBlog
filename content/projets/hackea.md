---
title: "Hackea"
description: "Éditeur 3D de hacks IKEA qui génère le guide pas à pas (achats, modifications, étapes)."
date: 2026-10-28T12:52:16+02:00
tags: [3D, TypeScript, Open source]
params:
  appCategory: DesignApplication
  image: "/images/projets/hackea.webp"
  statusLabel: ACTIVE
  kind: 3D
  link: "https://github.com/hansipie/Hackea"
  linkLabel: "GitHub"
---

![Aperçu de Hackea](/images/projets/hackea.webp)

**Hackea** est un outil de création de « hacks » IKEA : on assemble et on modifie des pièces du catalogue dans un éditeur 3D, puis l'outil génère le guide pas à pas. Il s'appuie sur [Bygga](https://github.com/Nutlope/bygga) (MIT), des guides de montage IKEA open source, dont il garde le moteur 3D, la voix et le catalogue hors ligne, et auquel il ajoute les hacks.

## Qu'est-ce qu'un hack ?
Un guide qui combine et modifie des pièces IKEA : liste des produits de départ, achats complémentaires, modifications à faire (coupes, perçages), étapes de montage rejouées en 3D comme la notice papier, et une section « attention » sur ce qui peut mal tourner.

## L'éditeur de hacks
- Choisir une ou plusieurs pièces de la bibliothèque (côte à côte ou empilées), ou seulement certaines de leurs parties.
- Grouper, déplacer, tourner, copier et supprimer des parties dans un espace 3D.
- **Aucun serveur, aucun compte** : les hacks sont sauvegardés dans le navigateur, exportables et importables en fichiers `.hackea.json`, ou partageables par lien.
- Les hacks créés sont marqués « à vous, non vérifié », avec un rappel : les dimensions sont approximatives et doivent être mesurées avant de percer ou de couper.

## Fonctions avancées
- Génération d'un guide à partir d'une **photo** de hack, avec rapprochement sur le catalogue local, sur la clé OpenAI du visiteur.
- Voix de synthèse et reconnaissance de « suivant » au micro pour garder les mains libres.
- Vue impression A4 et fonctionnement hors ligne une fois un guide ouvert.

## Technique
Next.js 16, React 19 et TypeScript, une scène 3D en traits (three.js) et un générateur de plans paramétrique qui dessine 1 171 produits IKEA (2 180 dimensions, gammes UK et US) hors ligne, construits à partir des listes publiques d'IKEA.

## Limites
Interface et voix uniquement en anglais pour l'instant. Hackea n'est pas affilié à IKEA : IKEA et les noms de produits sont des marques de Inter IKEA Systems B.V. Licence MIT.

[GitHub →](https://github.com/hansipie/Hackea)
