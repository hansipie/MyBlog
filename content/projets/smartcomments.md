---
title: "SmartComments"
description: "Application mobile qui génère des appréciations scolaires personnalisées avec l'IA."
date: 2025-04-18T23:36:17+03:00
tags: [Expo, React Native, IA, Éducation]
params:
  appCategory: EducationalApplication
  image: "/images/projets/smartcomments.webp"
  statusLabel: ACTIVE
  kind: Mobile
  link: "https://smartcomments.ansicode.fr"
  linkLabel: "Voir le site"
---

![Aperçu de SmartComments](/images/projets/smartcomments.webp)

**SmartComments** aide les enseignants à rédiger des appréciations scolaires personnalisées. On renseigne le prénom de l'élève, son genre, ses notes, ses traits de caractère et les matières concernées, et l'application génère un commentaire adapté.

## Le problème
Écrire des dizaines d'appréciations à chaque période est long et répétitif, et le risque est de produire des phrases toutes faites. SmartComments part des informations réelles sur l'élève pour proposer un texte à relire et ajuster.

## Technique
- Application **Expo SDK 54 / React Native** en TypeScript, navigation par Expo Router avec tiroir.
- **Firebase** : authentification anonyme, Firestore (crédits des utilisateurs, configuration) et Cloud Functions en Python.
- Génération via **LangChain** et un modèle Claude, appelés côté serveur : aucune clé de modèle n'est embarquée dans l'application.
- Système de **crédits** vendus en achats intégrés, avec une documentation dédiée à la sécurité des crédits et au RGPD (identifiant d'appareil).
- Builds gérés avec EAS Build.

## Confidentialité
L'application utilise une authentification anonyme et une documentation interne détaille le traitement de l'identifiant d'appareil au regard du RGPD.

Le site officiel est disponible sur smartcomments.ansicode.fr.

[Voir le site →](https://smartcomments.ansicode.fr)
