---
title: Mon retour sur le Vibe Coding
description: ""
date: 2025-11-21T17:10:57.709Z
preview: ""
draft: false
tags:
    - IA
    - Dev
    - Vibe Coding
categories:
    - IA
---

*J'ai développé un client FTP en Rust en une semaine (sans connaître Rust) : Retour d'expérience sur le "Vibe Coding"*

## Introduction : Le pari du débutant complet

Et si je vous disais qu'il est possible de développer un client FTP/FTPS/SFTP complet et fonctionnel en Rust... en une semaine... sans avoir jamais écrit une ligne de Rust auparavant ?

C'est exactement ce que j'ai fait en novembre 2025, armé uniquement de mon expérience de développeur senior et de l'assistance d'outils d'IA comme Claude et GitHub Copilot. Cette expérience m'a permis de tester concrètement les limites et les possibilités du "vibe coding" - cette nouvelle approche où l'IA génère du code à partir de descriptions en langage naturel.

**Spoiler alert** : Les résultats sont à la fois impressionnants et révélateurs des limites actuelles de l'IA en développement logiciel.

![](/rustyftp1.png)

## Jour 1 : Du zéro au MVP en moins de 24 heures

### Un démarrage fulgurant

Le premier jour a été une révélation. Malgré ma totale méconnaissance de Rust - pas même un "Hello World" à mon actif - j'ai réussi à mettre en place un MVP fonctionnel en moins d'une journée :

- **Structure CLI** : Initialisation du projet et gestion des arguments en ligne de commande
- **Protocoles de base** : Connexion et transfert de fichiers via FTP et SFTP
- **Confort immédiat** : Intégration de `rustyline` pour l'historique des commandes et l'auto-complétion, et `owo-colors` pour un terminal coloré

### Le rôle crucial de l'IA

L'IA a été déterminante à ce stade. Elle m'a permis de :
- Générer rapidement des structures et modules Rust idiomatiques
- Comprendre les concepts fondamentaux comme le célèbre *borrow checker* de Rust
- Débugger rapidement les erreurs de compilation sans passer des heures dans la documentation

**Constat** : Pour un développeur expérimenté, l'IA supprime complètement la barrière d'entrée d'un nouveau langage. On peut être productif immédiatement.

## Jours 2-4 : L'explosion fonctionnelle

### Une vélocité impressionnante

Une fois le MVP en place, le rythme s'est accéléré de manière spectaculaire. En deux jours, mon client FTP simple est devenu une application riche en fonctionnalités.

#### Fonctionnalités avancées

**Transferts en arrière-plan** : Implémentation complexe permettant de lancer des téléchargements (`get file &`) tout en continuant à naviguer dans l'arborescence.

**Opérations batch** : Ajout des commandes `mget` et `mput` avec support des wildcards et de la récursivité (`-r`).

**Gestion des tâches** : Commandes `jobs` et `cancel` pour piloter les transferts longs.

#### Expérience utilisateur soignée

- **Bookmarks** : Système de sauvegarde des connexions favorites
- **Listings enrichis** : Affichage tabulaire triable avec icônes et couleurs
- **Auto-complétion intelligente** : Suggestions contextuelles pour les chemins locaux et distants

#### Robustesse et sécurité

- **Résilience** : Reconnexion automatique et mécanismes de retry
- **Sécurité** : Intégration du crate `zeroize` pour nettoyer les mots de passe en mémoire

### La magie de l'IA pour les features isolées

Ces ajouts se sont faits avec une fluidité remarquable. L'IA excellait dans la génération de code Rust idiomatique pour des fonctionnalités bien délimitées. Je formulais une demande ("Ajoute une commande pour gérer les bookmarks avec sauvegarde sur disque"), et quelques minutes plus tard, j'avais du code fonctionnel.

## Jours 5-7 : La stabilisation et... les limites de l'IA

### Le besoin de rigueur

Après l'euphorie de l'ajout de fonctionnalités, les derniers jours ont été consacrés à la consolidation. C'est là que la dynamique a changé.

Le 18 novembre, j'ai décidé de me concentrer sur la qualité du code :

- **Sécurité de la concurrence** : Création de `mutex_utils` pour éliminer les dangereux `unwrap()` sur les locks
- **Tests unitaires** : Écriture d'une suite de tests pour les modules critiques
- **Documentation** : Ajout de commentaires et documentation inline

### La grande limite : Le refactoring

Le 19 novembre, j'ai établi un plan de refactoring complet. **C'est ici que les limites de l'assistance IA sont devenues flagrantes.**

#### Les pièges de l'IA en refactoring

1. **Surengineering systématique** : Les propositions de l'IA tombaient souvent dans l'excès d'abstraction. Patterns complexes, traits inutiles, architectures over-engineered pour un projet de cette taille.

2. **Manque de cohérence globale** : L'IA n'a pas de véritable compréhension contextuelle sur la durée. Elle propose des solutions localement correctes mais qui peuvent entrer en conflit avec des décisions architecturales prises précédemment.

3. **Biais vers la complexité** : Là où une solution simple aurait suffi, l'IA suggérait systématiquement des approches "enterprise-grade" inadaptées.

#### L'expertise humaine indispensable

C'est finalement mon expérience de développeur senior qui a permis de :
- Structurer un plan de refactoring cohérent et progressif
- Simplifier l'architecture plutôt que de l'alourdir
- Prioriser la stabilité (tests, gestion d'erreurs) sur la complexité technique

**Leçon importante** : L'IA peut générer du code rapidement, mais c'est le développeur qui doit maintenir la vision d'ensemble et la cohérence architecturale.

## Conclusion : L'IA comme turbo, pas comme pilote automatique

### Ce que l'IA fait exceptionnellement bien

✅ **Démarrage rapide** : Passer de zéro à un MVP en quelques heures dans un langage inconnu

✅ **Exploration** : Découvrir un écosystème (les crates Rust) sans passer des semaines à lire la doc

✅ **Production véloce** : Ajouter des fonctionnalités isolées à un rythme soutenu

✅ **Déblocage** : Résoudre rapidement les erreurs de compilation et comprendre les concepts

### Ce que l'IA ne sait pas (encore) faire

❌ **Refactoring cohérent** : Maintenir une vision architecturale sur la durée

❌ **Décisions de design** : Arbitrer entre simplicité et complexité selon le contexte

❌ **Jugement expérimenté** : Savoir quand s'arrêter et éviter le surengineering

### Le verdict final

Cette expérience valide une hypothèse : **l'IA est un multiplicateur de productivité formidable, mais elle ne remplace pas l'expertise humaine.**

Pour un développeur senior :
- L'IA élimine la courbe d'apprentissage initiale d'un nouveau langage
- Elle accélère drastiquement la phase de développement de features
- Mais elle nécessite un pilotage constant et des décisions architecturales humaines

Pour un développeur junior ou débutant, les risques sont plus importants :
- Difficulté à évaluer la qualité du code généré
- Tendance à accepter le surengineering proposé
- Manque de recul pour simplifier et refactorer efficacement

### L'avenir du développement ?

Le "vibe coding" n'est pas du développement paresseux - c'est du développement **accéléré mais exigeant**. Il faut plus que jamais :
- Une vision claire de ce qu'on construit
- La capacité à évaluer et challenger les propositions de l'IA
- L'expertise pour simplifier plutôt que complexifier

**L'IA permet d'aller vite. L'expertise humaine garantit qu'on va dans la bonne direction.**

---

*Le projet RustyFTP est disponible en open source. N'hésitez pas à explorer le code pour voir concrètement ce qu'une semaine de "vibe coding" peut produire.*

**Pour les curieux :** 📦 [Télécharger et explorer le code sur GitHub](https://github.com/hansipie/RustyFTP)

![](/rustyftp2.png)

## Pour aller plus loin

**Questions ouvertes :**
- Comment l'IA évoluera-t-elle pour mieux gérer le refactoring et la cohérence architecturale ?
- Quelles nouvelles compétences les développeurs doivent-ils cultiver dans ce nouveau paradigme ?
- À quel point peut-on s'appuyer sur l'IA pour apprendre un langage "profondément" ?

**Votre expérience :**
Avez-vous tenté des projets similaires avec l'assistance de l'IA ? Quelles ont été vos découvertes et vos limites ? Partagez vos retours en commentaire !
