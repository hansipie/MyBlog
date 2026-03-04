---
title: "La Mort de YggTorrent : quand un site de pirates se fait pirater"
description: Le 4 mars 2026, YggTorrent ferme définitivement après un hack massif. Retour sur neuf ans d'histoire, une dérive commerciale et la chute d'un géant du torrent francophone.
date: 2026-03-04T17:35:15.304Z
draft: false
tags:
  - Piratage
  - Cybersécurité
  - Torrent
categories:
  - Actu Tech
# preview: /ygg-chronologie.png
---

*Le plus grand tracker de torrents francophone vient de tomber — non pas sous les coups d'une saisie judiciaire, mais sous ceux d'un pirate qui lui reprochait d'avoir trahi ses propres valeurs.*

<!-- ![Frise chronologique YggTorrent 2017-2026](/ygg-chronologie.png) -->

Le 4 mars 2026, YggTorrent affiche un message laconique : **"L'histoire s'arrête ici."** En quelques heures, le plus grand tracker de torrents francophone disparaît de la toile. Un hacker du nom de Gr0lum vient d'exfiltrer 6,6 millions de comptes, de publier l'intégralité du code source et des bases de données, et d'exposer les pratiques financières douteuses de ses administrateurs.

L'ironie est totale : un site qui a bâti son empire sur la culture du partage libre vient de tomber sous les coups d'un pirate qui lui reprochait d'avoir trahi cette même culture.

---

## 2017–2024 : La naissance d'un géant francophone

### L'héritier de T411

L'histoire commence dans les cendres. En mars 2017, T411 — le tracker de référence en France depuis des années — est frappé d'une saisie judiciaire et disparaît du jour au lendemain, laissant des millions d'utilisateurs orphelins.

C'est dans ce vide que naît **YggTorrent** : le domaine est réservé le 21 mai 2017, et le site ouvre officiellement en tant que tracker public en **juillet 2017**. Le projet démarre modestement, mais l'appétit est là. Quelques mois plus tard, le **31 octobre 2017**, c'est T411.si — l'un des clones qui avaient tenté de reprendre le flambeau — qui annonce sa fermeture et sa migration vers Ygg. La communauté se consolide d'un coup.

### La montée en puissance

Les années suivantes voient Ygg s'imposer comme **le** point de passage obligé du téléchargement de torrents en langue française. Au 1er janvier 2020, Alexa Internet classe le site **35e site le plus visité en France** — premier dans sa catégorie téléchargement. Films, séries, jeux, logiciels, musique : la communauté construit un catalogue considérable, entretenu par des équipes de contributeurs bénévoles organisés en groupes de release.

Le modèle est celui du tracker semi-privé classique : inscription sur invitation ou après un temps d'attente, ratio upload/download à maintenir, communauté soudée. Ygg se distingue par une interface soignée, un forum actif et une relative tolérance envers les débutants.

### Le tournant du 17 mai 2024

Le **17 mai 2024**, Ygg franchit un cap décisif : le passage en **tracker totalement privé**. Plus d'inscriptions ouvertes au public, accès uniquement par invitation. Officiellement, il s'agit de protéger la communauté des attaques et de l'infiltration. Dans les faits, la décision concentre le pouvoir et les revenus entre quelques mains — et prépare le terrain pour la suite.

---

## La dérive commerciale : quand le piratage devient un business

<!-- ![Mode Turbo, exit scam et fuite des utilisateurs](/ygg-monetisation.png) -->

### Le "Mode Turbo" : quand on fait payer pour pirater

Le **21 décembre 2025**, en pleine période de fêtes. Une annonce tombe sur le forum Ygg et provoque un tollé immédiat : le lancement du **"Mode Turbo"**. Pour bénéficier de téléchargements sans limite et sans temps d'attente, il faudra désormais passer à la caisse.

La grille tarifaire est sans ambiguïté :
- **14,99€/mois**
- **85,99€ à vie**

Pour les comptes gratuits, les restrictions tombent comme un couperet : **30 secondes d'attente** avant chaque torrent, **5 fichiers par jour** maximum. Le site qui se présentait comme un espace de liberté et de partage devient, de fait, un service freemium.

### L'escalade : bannissements en série et accusations graves

La réaction des équipes de release est immédiate. La **Team QTZ** — l'un des groupes les plus prolifiques du site avec plus de 3 300 fichiers partagés — publie une lettre ouverte dénonçant un intermédiaire qui « impose une commission, souvent aux dépens des plus vulnérables ». Elle est bannie dans la foulée, son message supprimé. La **Team Forward**, responsable d'environ 35 000 fichiers partagés, reçoit un seul mot en guise de congédiement : **"OUST"**. D'autres groupes — tsundere-raws, BTT — subissent le même sort. Le fil de discussion est verrouillé, le salon de discussion désactivé.

Les révélations du hack allaient ensuite exposer l'ampleur de la dérive. Les données exfiltrées permettent de reconstituer un tableau accablant :

- **~10 millions d'euros de revenus** pour 2024-2025, avec des pics à **490 000€ par mois** et plus de 249 000 commandes passées par ~100 000 payeurs uniques
- **54 776 numéros de carte bancaire complets** — avec cryptogrammes visuels — stockés en clair
- **Un script malveillant caché** sous le nom "ImageCarouselManager" qui scannait les navigateurs des visiteurs pour détecter les wallets crypto (MetaMask, Coinbase, etc.)
- **Une fraude bancaire organisée** : les paiements transitaient par de faux sites e-commerce (ventes de t-shirts fictives) pour tromper les banques, avant d'être convertis en crypto et blanchis via **Tornado Cash** et le Monero

Derrière le site : deux administrateurs, **"Oracle"** (au Maroc) et **"Destroy"** (en France), accusés d'avoir orchestré l'ensemble du dispositif.

---

## Le hack de Gr0lum : une nuit pour détruire neuf ans

<!-- ![Comment Gr0lum a détruit YggTorrent en une nuit](/ygg-hack.png) -->

### La faille

Le 3 mars 2026, un hacker qui se présente sous le pseudonyme **Gr0lum** commence à s'intéresser à l'infrastructure de YggTorrent. Il utilise **Shodan** — le moteur de recherche des objets connectés exposés sur Internet — pour identifier les serveurs du site. Ce qu'il découvre stupéfie : un **serveur de pré-production** est accessible publiquement, son pare-feu désactivé, avec **13 ports ouverts**. Le serveur contient le code source et des mots de passe en clair.

Détail aggravant : l'administrateur technique **"Destroy"** utilisait ce serveur comme ordinateur personnel. Ses identifiants FTP et les mots de passe sauvegardés dans son navigateur y étaient accessibles — offrant à Gr0lum un accès direct aux systèmes de production.

### L'exfiltration

En l'espace de quelques heures, Gr0lum exfiltre :

- **6,6 millions de comptes utilisateurs** avec leurs données personnelles
- **11 Go d'archives** contenant le code source complet, les bases de données du tracker et du forum, et les identifiants des administrateurs
- Environ **50% des mots de passe** stockés avec l'algorithme **MD5** — obsolète et facilement cassable
- Les historiques de navigation des administrateurs et les journaux de transactions financières

### Le message

Avant de tout publier, Gr0lum laisse un message. Non pas une revendication de trophée, mais une **dénonciation point par point** des pratiques qu'il accuse les administrateurs de Ygg d'avoir menées : le Mode Turbo, le stockage des CB, le script de détection de wallets, les circuits financiers frauduleux.

Le 4 mars 2026 au matin, les serveurs de YggTorrent affichent leur dernier message : **"L'histoire s'arrête ici."**

---

## Et après ? La communauté cherche ses héritiers

### Ygg.gratis et le retour aux origines

Dans les heures qui suivent la fermeture, le collectif **Utopeer** lance **Ygg.gratis** — un fork pensé comme un retour aux fondamentaux : pas de paywall, gouvernance communautaire, infrastructure transparente. Trop tôt pour dire si le projet tiendra ses promesses, mais l'élan est là.

### Un écosystème qui survit

YggTorrent est mort. Le torrent francophone, lui, ne l'est pas. **Sharewood**, **TheOldSchool.eu** et d'autres trackers spécialisés continuent d'opérer, souvent avec des communautés plus petites mais plus soudées autour de valeurs partagées.

### Ce que cette histoire dit vraiment

La trajectoire de YggTorrent est un miroir tendu à l'ensemble des plateformes communautaires : qu'arrive-t-il quand un projet né de la culture du don et du partage commence à générer des revenus ? La tentation de la monétisation est compréhensible. La dérive, apparemment, inévitable.

Ce qui distingue l'histoire de Ygg, c'est que sa chute n'est pas venue de l'extérieur — pas d'Hadopi, pas d'Europol, pas de saisie spectaculaire. Elle est venue **de l'intérieur**, d'un utilisateur qui estimait que la trahison des valeurs fondatrices méritait une réponse radicale.

C'est une leçon que les trackers survivants — et plus largement tous les projets communautaires qui flirtent avec la monétisation — feraient bien de méditer.

Le piratage continuera. Mais sous quelle forme, et à quel prix éthique ?

---

*Sources : Clubic, KultureGeek, Solutions Numériques, L'Observateur, Wikipedia (Ygg), Reddit r/france.*
