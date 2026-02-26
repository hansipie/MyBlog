+++
title = "Quitter Windows : le bilan complet d'une migration en trois actes"
date = 2026-02-26T00:00:00+01:00
draft = false
description = "Après 25 ans d'aller-retours, j'ai décidé de quitter Windows pour Linux. Pour de vrai, cette fois. Récit d'un mois de découvertes, de galères, et d'attachement."
tags = ["linux", "bazzite", "distrobox", "migration"]
categories = ["Linux"]
+++

![](/quitter-windows/banner.png)
Après 25 ans d'aller-retours, j'ai décidé de quitter Windows pour Linux. Pour de vrai, cette fois.

Ce qui devait être un "on verra bien" s'est transformé en un mois de découvertes, de galères, et finalement — d'attachement. Voici le récit complet.

━━━━━━━━━━━━━━━━━━━━━━

## Acte 1 — Le saut dans le vide

![](/quitter-windows/acte1.png)

Depuis la fin des années 90, Linux fait partie de mon paysage informatique.

Mandrake, Suse, RedHat, Slackware, Ubuntu, CentOS... j'ai tout essayé. J'ai monté des serveurs DNS, configuré du routage réseau, expérimenté sans fin. J'ai toujours reconnu à Linux sa puissance, sa légèreté, sa versatilité.

Mais il y avait UN problème : les jeux.

Ce problème m'a systématiquement ramené vers cette "prison dorée" qu'est Windows. À chaque fois. Sans exception.

**Ce qui a tout changé : SteamOS.**

Valve a ouvert une brèche. On voit maintenant des gamers migrer vers Linux en masse. La démocratisation est en marche, notamment avec Bazzite.

Alors j'ai tenté ma chance avec Fedora Silverblue — la base atomique de Bazzite. En OG que je suis. 😎

Le checklist d'installation :
→ Partitionnement des disques
→ Installation de Fedora Silverblue
→ Dual boot Windows (pas fou non plus)
→ Drivers Nvidia + software RGB
→ Environnement utilisateur, de code, de jeux

Résultat sur Cyberpunk 2077 :
- Fedora Silverblue : 60 fps
- Windows : 70 fps
- Bazzite : 70 fps

10 fps de moins sur Fedora. Pas rédhibitoire — ça s'optimise. L'essentiel : je pouvais jouer, coder, surfer, tout ça sous Linux.

Au-delà du gaming, cette expérience m'a fait découvrir l'univers des Linux atomiques. Et franchement ? C'est incroyable. Certains disent que c'est le futur des OS Linux. Après cette première semaine, j'avais envie de le croire.

━━━━━━━━━━━━━━━━━━━━━━

## Acte 2 — Le premier mur

![](/quitter-windows/acte2.png)

La lune de miel n'aura pas duré longtemps.

Une semaine après la migration, premier vrai défi : je veux coder une app mobile avec Android Studio.

Installation ? Nickel.
Lancement de l'émulateur ? **Segmentation fault.**

Crash immédiat. Pas d'écran. Rien. Bienvenue dans le monde réel de Linux. 😅

Après investigation, j'identifie cinq problèmes imbriqués :
→ Conflits de drivers graphiques (Mesa Ubuntu vs Fedora host)
→ SELinux qui bloque l'exécution depuis la heap
→ Triple virtualisation (hardware → Podman → QEMU)
→ Permissions KVM mal mappées
→ Variables Qt manquantes pour l'affichage

Rien que ça.

**La solution :** plutôt que de forcer l'émulateur dans le conteneur Distrobox, j'utilise `distrobox-host-exec` pour le lancer directement sur l'hôte. Android Studio reste dans son conteneur. L'émulateur tourne nativement avec accès direct au GPU et au KVM.

Résultat : ça marche. 🎉

Et c'est là que j'ai compris quelque chose d'important :

Sous Windows, quand ça ne marche pas, tu réinstalles.
Sous Linux, tu **comprends**.

C'est plus exigeant, c'est vrai. Mais il y a toujours une solution. Et cette solution, tu la maîtrises.

━━━━━━━━━━━━━━━━━━━━━━

## Acte 3 — Un mois plus tard

![](/quitter-windows/acte3.png)

La dernière fois que j'ai booté Windows, c'était pour un build. Un seul. Et en attendant que la machine redémarre, j'ai réalisé que ça faisait des semaines que je n'avais pas vu ce fond d'écran bleu.

**Les doutes du début**

Soyons honnêtes : les premières semaines, il y a eu des moments de flottement. Des outils que j'avais sous Windows et que je ne retrouvais pas sous Linux. Des petites habitudes cassées. Ce sentiment désagréable de chercher quelque chose qui n'est plus là.

Mais à chaque fois, l'un de deux trucs s'est produit :
→ J'ai trouvé une alternative Linux qui fait le job (souvent mieux)
→ Ou j'ai réalisé que j'avais pas vraiment besoin de cet outil

Ce deuxième cas est le plus intéressant. On accumule des logiciels par inertie. On les utilise parce qu'ils sont là, pas parce qu'on en a besoin. Changer de système force une cure de minceur salutaire.

**La stratégie en 3 étapes**

J'avais planifié ma migration en trois phases. Pas par hasard — c'est la seule façon de ne pas se retrouver bloqué sans filet si quelque chose tourne mal.

*Étape 1 — Dual boot avec partition NTFS partagée*

Documents, dossiers perso, bibliothèque de jeux : tout sur une partition accessible depuis les deux systèmes. En théorie, c'est élégant. En pratique, deux agacements récurrents : Windows scannait la partition à chaque démarrage, et certains fichiers de jeux développaient de petites incompatibilités qui forçaient des re-téléchargements. Pas bloquant. Mais irritant.

*Étape 2 — Dual boot sans partition partagée (situation actuelle)*

La partition partagée migrée vers Btrfs, le filesystem natif Linux. Cette étape est clé : elle élimine tous les problèmes de cohabitation. Windows et Linux vivent maintenant chacun dans leur coin, sans se marcher dessus. Propre.

*Étape 3 — Suppression de la partition Windows*

L'objectif final. La ligne d'arrivée. On y est... presque.

**Où j'en suis**

Je passe 99% de mon temps sous Linux. Windows dort sur son coin de disque, tranquille, ignoré. Cette transition s'est faite naturellement — pas de moment "ok, maintenant j'arrête Windows". Juste une lente obsolescence de fait.

━━━━━━━━━━━━━━━━━━━━━━

## Post-scriptum — L'étape 3 n'aura pas lieu

![](/quitter-windows/ps1.png)

J'avais annoncé une étape 3 : supprimer définitivement la partition Windows.

Je ne la ferai pas.

Non pas parce que Linux m'a déçu — au contraire. Mais parce que j'ai pris du recul sur ce que ça représente vraiment. Windows occupe une place écrasante sur le marché des OS. Cette réalité ne disparaît pas parce qu'on supprime une partition. Et en tant que développeur, vivre totalement en dehors de cet écosystème serait me couper de quelque chose que j'ai tout intérêt à comprendre et à tester.

Garder Windows n'est pas un aveu d'échec. C'est un choix pragmatique.

Linux est mon système principal. Celui où je travaille, où je joue, où je vis numériquement. Windows est une partition qui dort, disponible quand le contexte l'exige — et c'est très bien comme ça.

La migration était une réussite bien avant d'atteindre l'étape 3. 🐧

━━━━━━━━━━━━━━━━━━━━━━

## Post-scriptum 2 — La distro, et pourquoi ça n'a presque pas d'importance

![](/quitter-windows/ps2.png)

J'ai finalement arrêté mon choix sur Bazzite. L'appel des FPS était trop fort. 😄

Mais honnêtement ? Le choix de la distro est presque anecdotique dans mon usage quotidien — et c'est là qu'entre en scène **Distrobox**.

Distrobox, c'est Linux en boîte : tu instancieras n'importe quelle distribution dans un conteneur, avec accès complet à tes fichiers et à tes outils, comme si tu étais nativement dessus. Résultat : je travaille dans un environnement parfaitement configuré, sans jamais me soucier de la nature atomique et immuable de Bazzite en dessous.

L'OS hôte gère la stabilité et les mises à jour. Distrobox gère mes outils. Les deux coexistent sans se gêner.

C'est probablement le vrai game changer de cette migration — plus encore que le choix de la distro elle-même.
