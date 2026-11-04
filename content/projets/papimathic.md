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
L'application est utilisée en conditions réelles via le **Play Store**. Un blog dédié, Papimathic, publie des contenus pédagogiques autour du calcul mental.

[Voir le site →](https://papimathic.ansicode.fr/)
