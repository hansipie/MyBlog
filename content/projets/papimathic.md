---
title: "Papimathic"
description: "Application éducative de calcul mental en React Native / Expo, disponible sur le Play Store."
date: 2025-05-10T18:56:36+03:00
tags: [React Native, Expo, Éducation]
params:
  appCategory: EducationalApplication
  os: "Android"
  image: "/images/projets/papimathic.webp"
  statusLabel: RUNNING
  kind: Mobile
  link: "https://papimathic.ansicode.fr/"
  linkLabel: "Voir le site"
---

![Aperçu de Papimathic](/images/projets/papimathic.webp)

**Papimathic** est une application mobile de calcul mental, inspirée de la célèbre calculatrice « Little Professor ». Elle propose des séries de calculs adaptées au niveau de l'enfant (ou de l'adulte) pour s'entraîner de façon ludique.

## Le principe
Le joueur choisit un mode, un niveau et une opération. L'application génère les problèmes, vérifie les réponses, compte les essais et conserve les records.

## Dans le jeu
- **Mode Entraînement** : des problèmes aléatoires, sur **5 niveaux** de difficulté.
- **Mode Table** : les tables d'une opération pour un nombre de base de 0 à 9.
- **Opération aléatoire** : en réappuyant sur l'opération active, on passe en mode « ? » qui alterne addition, soustraction, multiplication et division.
- **Séries de 5 problèmes**, avec 2 essais par problème. Après deux échecs, la bonne réponse est montrée.
- **Records chronométrés**, conservés par mode, opération et niveau.
- Sons et vibrations (désactivables), application bilingue français / anglais et rappels quotidiens par notification.

## Pensée pour les enfants
- Conçue pour un public jeune et conforme aux exigences COPPA.
- Publicités supprimables par un achat intégré.
- Réglages persistants (son, langue).

## Technique
- Application **React Native / Expo** en TypeScript, avec Expo Router.
- Logique de jeu isolée dans des fonctions pures testables (génération des problèmes, validation, score) et un hook dédié pour l'état de la partie.
- Services séparés pour les publicités, les notifications, l'invitation à noter l'application et la vérification de version.
- Achats intégrés gérés avec RevenueCat.

## Disponibilité
L'application est utilisée en conditions réelles via le **Play Store**. Version actuelle de l'application Expo : 1.16.0. Un blog dédié, Papimathic, publie des contenus pédagogiques autour du calcul mental.

## Portage Godot
Le dépôt contient aussi un portage de l'application sous **Godot 4.6** (GDScript, version 1.11.0), avec fonds animés selon l'humeur du professeur, parallaxe (accéléromètre sur mobile, souris sur ordinateur) et smiley dessiné par le code. Les fonctions propres aux stores mobiles n'y sont pas portées.

[Voir le site →](https://papimathic.ansicode.fr/)
