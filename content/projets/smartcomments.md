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

## Comment ça marche
1. **Formulaire** : on saisit le prénom de l'élève, son genre, ses notes, ses traits de caractère et les matières.
2. **Génération** : la demande part vers une Cloud Function Python qui interroge le modèle et débite un crédit.
3. **Résultat** : l'appréciation s'affiche pour être relue, ajustée et copiée ou partagée.
4. **Historique** : les appréciations déjà générées sont conservées dans l'application, avec un bouton « Tout partager ».

## Dans l'application
- Quatre écrans : accueil (formulaire), résultat, historique et « À propos ».
- « À propos » affiche la version et l'identifiant utilisateur, donne accès à la politique de confidentialité et permet de **supprimer son compte**.
- Un nouveau compte démarre avec **5 crédits**, et le solde est conservé avec un identifiant pseudonyme de l'appareil : il est restauré si l'on revient sur le même appareil.
- Disponible pour Android et iOS (identifiant `fr.ansicode.smartcomments`). Version actuelle : 1.3.0.

## Qualité et suivi
Le temps de rendu et d'interactivité de chaque écran est mesuré avec **EAS Observe**. Les paramètres sensibles (identifiant, nom de l'élève, données du formulaire) sont filtrés avant tout envoi, et seul un événement de version est envoyé à chaque lancement, sans donnée identifiant l'utilisateur.

## Confidentialité
L'application utilise une authentification anonyme : pas de compte à créer. Une documentation interne détaille le traitement de l'identifiant d'appareil au regard du RGPD, et la politique de confidentialité est publiée sur le site officiel.

Le site officiel est disponible sur [smartcomments.ansicode.fr](https://smartcomments.ansicode.fr).

[Voir le site →](https://smartcomments.ansicode.fr)
