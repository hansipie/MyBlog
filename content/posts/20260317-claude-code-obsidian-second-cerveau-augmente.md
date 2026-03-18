---
title: "Claude Code + Obsidian : comment j'ai transformé mon vault en système de travail augmenté"
description: Connecter Claude Code directement à son vault Obsidian transforme un second cerveau passif en collaborateur actif. Voici comment, et ce que ça change vraiment.
date: 2026-03-17T10:00:00Z
draft: false
tags:
  - Claude
  - Obsidian
  - Productivité
  - IA
  - PKM
categories:
  - IA
preview: /claude-code-obsidian/chapitre-2.png
---

Il y a un paradoxe au cœur de tout système "second cerveau" : on passe des heures à capturer, organiser, lier des notes, et pourtant l'IA reste à l'extérieur. ChatGPT ne sait pas ce que tu as noté le mois dernier. Claude.ai non plus. Tu dois tout réexpliquer à chaque conversation, comme si tu parlais à quelqu'un qui perd la mémoire entre chaque échange.

J'utilise Obsidian et Claude Code depuis plusieurs mois. Ce qui a changé ma façon de travailler, c'est de les avoir connectés. Pas via un plugin, pas via une interface graphique, mais directement par le terminal, dans mon vault.

---

## 🧠 Le problème du second cerveau passif

![](/claude-code-obsidian/chapitre-1.png)

Obsidian excelle à structurer la pensée. Les notes s'organisent, les liens se créent, les projets prennent forme. Mais ça reste passif : c'est toi qui interroges le système, pas le système qui t'aide à avancer.

L'IA générative promet exactement l'inverse : un assistant qui sait tout, disponible à tout moment. Sauf que cet assistant ne connaît rien de ton contexte spécifique. Il ne sait pas que ton projet mobile suit une convention précise, que tu as une deadline la semaine prochaine, ou que tu utilises telle librairie pour telle raison.

Le résultat : tu passes ton temps à réexpliquer. À chaque nouvelle conversation, tu redonnes le contexte. C'est épuisant et ça casse le rythme.

---

## 💡 Le déclic : l'IA qui vit dans les fichiers

![](/claude-code-obsidian/chapitre-2.png)

Claude Code, c'est Claude accessible depuis le terminal, avec accès direct au système de fichiers. La différence fondamentale avec "chatter avec une IA" : Claude peut lire, créer et modifier des fichiers. Il peut naviguer dans ta structure de dossiers, comprendre l'organisation de ton vault, et agir dessus.

Mais l'accès aux fichiers seul ne suffit pas. Ce qui fait vraiment la différence, c'est la capacité à **contextualiser**, à dire à Claude ce qu'il a besoin de savoir sur ton système, une fois pour toutes.

---

## ⚙️ La mise en place concrète

![](/claude-code-obsidian/chapitre-3.png)

### Le `CLAUDE.md` à la racine

C'est la pièce maîtresse. Un fichier Markdown placé à la racine du vault, lu automatiquement par Claude Code à chaque session. Tu y mets ce que Claude doit savoir pour travailler dans ton vault :

- La structure des dossiers et les conventions de nommage
- Les projets actifs et leur état
- Les workflows récurrents
- Les règles de style (pour les articles, les notes, etc.)

Exemple concret : dans mon `CLAUDE.md`, j'ai documenté qu'un side project suit un workflow de promotion spécifique avec un fichier dashboard central. Maintenant, quand je demande à Claude de m'aider sur ce projet, il sait où regarder, ce que je veux accomplir, et comment je travaille. Je n'explique plus. Je demande.

### Les skills : automatiser l'action répétitive

Claude Code permet de définir des "skills" : des commandes slash qui encapsulent un workflow complet. J'en ai plusieurs dans mon vault :

- `/nouveau-projet` : nouveau projet, dans le bon dossier et initialisation du brainstorming
- `/nouvelle-note` : note rapide avec template minimal
- `/yt-search <termes>` : recherche YouTube via `yt-dlp`, tableau de 10 résultats directement dans le terminal

En pratique : une idée de projet me passe par la tête. J'ouvre le terminal, je lance le skill, Claude brainstorm depuis une idée brute avec toute les source pertinentes sur le sujet. 30 secondes, pas de copier-coller entre applications, pas de perte de contexte.

### La mémoire persistante

Claude Code peut maintenir une mémoire entre les sessions dans des fichiers Markdown, dans un dossier dédié. Ce que tu lui dis d'une session à l'autre peut être retenu : tes préférences, les corrections que tu lui as apportées, le contexte d'un projet en cours.

C'est subtil mais important. Ça transforme une IA "sans mémoire" en quelque chose qui ressemble davantage à un collaborateur qui connaît ton contexte.

### Les serveurs MCP

MCP (Model Context Protocol) permet de connecter des sources de données externes directement dans le contexte de Claude. Dans mon cas : une base de connaissances spécialisée dans le droit administratif français, accessible depuis le vault. Quand j'ai besoin d'informations de ce domaine, Claude peut les interroger directement sans que j'aie à changer d'outil.

Autre exemple concret : l'open data public français. [data.gouv.fr](https://www.data.gouv.fr) expose des milliers de jeux de données officiels, statistiques, référentiels géographiques, données économiques, résultats électoraux. Via un serveur MCP connecté à cette API, Claude peut interroger ces données directement depuis le vault. C'est une source d'une fiabilité rare : des données produites et maintenues par les administrations publiques, pas par un résumé d'un article de blog. Quand tu travailles sur une analyse ou un article qui nécessite des chiffres officiels, tu n'as plus à chercher la bonne page sur data.gouv.fr, copier les données, les reformater. Tu demandes, Claude interroge, tu obtiens.

---

## 🔄 Ce que ça change vraiment

![](/claude-code-obsidian/chapitre-4.png)

**Gérer un projet avec un seul point d'entrée.** J'ai un dashboard Obsidian pour un side project : une page avec les priorités, l'état du déploiement, les prochaines étapes. Claude connaît ce fichier, connaît les conventions du projet. Quand j'arrive le matin et que je veux avancer, je dis simplement "qu'est-ce que je devrais faire aujourd'hui sur ce projet ?". Il lit le dashboard, comprend le contexte, et propose. Je n'ai pas réexpliqué le projet depuis des semaines.

**Générer des assets depuis une idée brute.** J'ai un skill qui génère des visuels pour les réseaux sociaux à partir d'un sujet. Je note l'idée dans Obsidian, je lance le skill, Claude orchestre la génération. Le fichier se retrouve au bon endroit, avec la bonne nomenclature, prêt à être utilisé.

**Documenter un outil open source.** Quand je travaille sur un outil en développement actif, Claude connaît l'architecture, les conventions choisies, les décisions techniques documentées dans le vault. Je n'explique plus pourquoi on a fait tel choix, c'est dans les notes, Claude les a lues.

---

## ⚠️ Les limites et ce qu'on apprend

![](/claude-code-obsidian/chapitre-5.png)

**La qualité du `CLAUDE.md` détermine tout.** Un fichier mal rédigé, trop vague ou pas à jour, et Claude travaille dans le flou. L'investissement initial de documentation est réel. Ce n'est pas "installer un plugin et ça marche".

**Le mode plan.** Par défaut, Claude Code propose un plan avant d'agir. Au début, ça frustre. On veut juste que ça se fasse. Avec le temps, on comprend que c'est salvateur : ça force à valider l'intention avant d'exécuter. J'ai évité plusieurs erreurs de ce seul fait.

**L'IA ne réfléchit pas à ta place.** Claude peut exécuter des workflows, générer du contenu, naviguer dans tes fichiers. Mais les décisions importantes (quoi construire, quoi arrêter, où mettre l'énergie) restent les tiennes. L'IA amplifie l'action, elle ne remplace pas le jugement.

**Le risque de sur-automatiser.** Il est tentant d'automatiser tout ce qui est répétitif. Mais certaines tâches "répétitives" ont une valeur intrinsèque : elles forcent à penser, à relire, à reformuler. Automatiser la prise de notes, par exemple, c'est souvent se priver de l'essentiel du processus.

---

## 🎯 Conclusion

![](/claude-code-obsidian/chapitre-6.png)

Ce n'est pas une solution magique. C'est un investissement de configuration, réel, qui prend quelques jours à mettre en place correctement. La différence entre un vault Obsidian et un vault Obsidian + Claude Code bien configuré, c'est la différence entre une bibliothèque et un collaborateur qui a lu tous les livres de cette bibliothèque et comprend comment tu travailles.

Un détail qui compte : tout reste local. Le vault, les notes, la mémoire de Claude, les fichiers générés, ce sont des fichiers Markdown et des PNG sur ton disque. Rien n'est enfermé dans un service tiers. Pour la synchronisation, tu choisis ce qui te convient : iCloud, Google Drive, Dropbox, Synology, Nextcloud, un simple rsync vers un VPS. La stack est agnostique. Tu peux changer de solution de sync demain sans toucher à quoi que ce soit d'autre... Et encore mieux : même Obsidian et Claude Code sont eux-même échangeables !

💡 Le vault ne stocke plus seulement de l'information. Il **répond**.

---

Et toi ? As-tu essayé de connecter une IA directement à ta base de notes ? Qu'est-ce qui t'a bloqué, ou au contraire ce qui t'a le plus surpris ? Curieux d'entendre d'autres approches.
