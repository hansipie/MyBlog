---
title: "Android Emulator sur Bazzite : Quand Linux met des bâtons dans les roues (et comment s'en sortir)"
description: L'histoire d'une migration de Windows vers Linux et des défis inattendus pour faire tourner l'émulateur Android
date: 2026-01-16T10:00:00Z
preview: null
draft: false
tags:
  - Dev
  - Linux
  - Android
  - Distrobox
categories:
  - DIY
---

*De Windows à Linux : quand développer pour Android devient un parcours du combattant... mais pas insurmontable.*
![](/bannerbazziteandro.png)
## Le point de départ : un besoin simple, une envie d'évolution

J'avais besoin de développer pour Android. Rien d'extraordinaire, une tâche que j'ai réalisée des centaines de fois sous Windows. Installer Android Studio, créer un émulateur, lancer l'application, et voilà. Un processus rodé, fluide, presque ennuyeux de simplicité.

Mais voilà, j'étais en pleine migration vers Linux. Après des années sous Windows, j'avais décidé de franchir le pas et de basculer sur Bazzite, une distribution Linux "atomique" basée sur Fedora. Le genre de distribution moderne qui promet stabilité et fiabilité grâce à un système de fichiers racine en lecture seule.

Naïvement, je pensais que ce serait aussi simple que sous Windows. Spoiler : ça ne l'a pas été.

## Les contraintes : bienvenue dans le monde atomique

Première découverte : avec un système atomique, impossible d'installer des outils de développement directement sur le système hôte. Le système de fichiers racine est verrouillé, immuable. C'est le prix à payer pour la stabilité.

La solution ? **Distrobox**. Un outil qui permet de créer des conteneurs légers où l'on peut installer tout ce qu'on veut. En gros, une petite bulle Ubuntu (j'ai choisi Ubuntu pour sa compatibilité) qui tourne dans mon système Bazzite.

```bash
# Créer un environnement de développement
distrobox create --name dev-android --image ubuntu:22.04
distrobox enter dev-androidez
```

Première contrainte acceptée. Pas le choix de toute façon.

## Le faux sentiment de victoire : Android Studio installé !

Dans mon conteneur Ubuntu fraîchement créé, j'ai installé Android Studio. Téléchargement du SDK, installation des outils, création d'un Virtual Device (AVD)... tout s'est déroulé sans accroc. L'interface s'affichait correctement, les menus répondaient, les paramètres se configuraient.

J'étais satisfait. Presque trop. "Finalement, Linux ce n'est pas si compliqué", me disais-je.

Et puis j'ai cliqué sur le bouton "Play" pour lancer l'émulateur.

## Le mur : l'émulateur refuse obstinément de démarrer

![](/BannerHeapWar.png)

**Segmentation fault.**

Deux mots qui font froid dans le dos de tout développeur. L'émulateur plantait avant même de s'afficher. J'ai réessayé. Même résultat. Encore. Toujours pareil.

J'ai commencé à creuser. Forums, documentation Android, Stack Overflow, ChatGPT, Gemini... Les heures ont défilé.

## Les sources de friction : comprendre pourquoi ça ne marche pas

### 1. La guerre des drivers graphiques

L'émulateur Android utilise QEMU avec accélération GPU. Problème : dans mon conteneur Ubuntu, les drivers Mesa (les drivers graphiques open-source) sont ceux d'Ubuntu. Mais mon GPU, lui, est géré par les drivers de l'hôte Bazzite (Fedora).

Cette incompatibilité entre les versions de Mesa créait des conflits insurmontables. Le conteneur essayait d'utiliser des drivers qui ne correspondaient pas au matériel réel.

### 2. SELinux, le garde-chiourme

Bazzite utilise SELinux, le système de sécurité de Red Hat/Fedora. Et SELinux n'aime pas qu'on exécute du code depuis le heap (la mémoire dynamique). Devinez ce que fait l'émulateur Android ? Exactement ça.

SELinux bloquait l'émulateur avant même qu'il puisse vraiment démarrer.

### 3. La virtualisation imbriquée, ou l'enfer dans l'enfer

Lancer l'émulateur depuis un conteneur, c'est créer une chaîne de virtualisation :
- Mon PC (matériel réel)
- → Conteneur Podman/Distrobox
- → QEMU (l'émulateur Android)

Trois couches de virtualisation. C'est comme essayer de courir un marathon avec des chaussures deux tailles trop petites et un sac de 20 kg sur le dos. Techniquement possible, mais atrocement inefficace.

### 4. KVM et les permissions

L'émulateur Android a besoin de KVM (Kernel-based Virtual Machine) pour la virtualisation matérielle. Bien que `/dev/kvm` soit partagé avec le conteneur, les permissions et les groupes d'utilisateurs n'étaient pas correctement mappés entre l'hôte et le conteneur.

### 5. Qt et l'affichage graphique

L'interface de l'émulateur utilise Qt. Dans le conteneur, les variables d'environnement `QT_QPA_PLATFORM` et `DISPLAY` n'étaient pas correctement configurées. L'émulateur ne savait tout simplement pas où et comment afficher sa fenêtre.

## L'illumination : sortir du conteneur

Après avoir passé des heures à essayer de réparer ce qui semblait irréparable, j'ai eu une idée contre-intuitive : **et si je n'exécutais pas l'émulateur dans le conteneur ?**

La solution était là, dans la documentation de Distrobox : `distrobox-host-exec`. Une commande qui permet d'exécuter des programmes directement sur l'hôte, depuis le conteneur.

### L'architecture de la solution

```
┌─────────────────────────────────────────────────────────────┐
│                     Hôte Bazzite                            │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Android Emulator (via distrobox-host-exec)         │    │
│  │  - Accès direct GPU                                 │    │
│  │  - Accès direct KVM                                 │    │
│  │  - Accès direct à l'affichage                       │    │
│  └─────────────────────────────────────────────────────┘    │
│                            ▲                                │
│                            │                                │
│  ┌─────────────────────────┴───────────────────────────┐    │
│  │        Conteneur Distrobox (Ubuntu)                 │    │
│  │  - Android Studio (interface)                       │    │
│  │  - SDK Tools                                        │    │
│  │  - ADB, Gradle, etc.                                │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

Android Studio reste dans le conteneur, où il est facile à maintenir et à configurer. Mais l'émulateur, lui, tourne sur l'hôte avec accès direct au GPU, à KVM, et à l'affichage.

### Le script magique

J'ai créé un script shell qui fait le pont entre les deux mondes :

```bash
#!/bin/bash

# Variables d'environnement essentielles
AVD_HOME="$HOME/.android/avd"
EMULATOR="/opt/android-sdk/emulator/emulator"
AVD_NAME="${1:-Pixel_8_API_34}"

# La commande qui change tout
EMULATOR_CMD="export QT_QPA_PLATFORM=xcb && export DISPLAY=:0 && export ANDROID_AVD_HOME=$AVD_HOME && $EMULATOR -avd $AVD_NAME -no-snapshot -gpu host"

# Exécution sur l'hôte depuis le conteneur
distrobox-host-exec bash -c "$EMULATOR_CMD"
```

**Les éléments clés :**

- `QT_QPA_PLATFORM=xcb` : Force Qt à utiliser X11 au lieu de Wayland
- `DISPLAY=:0` : Spécifie l'affichage de l'hôte
- `-gpu host` : Utilise le GPU réel, pas une émulation
- `-no-snapshot` : Évite les problèmes de persistance
- `distrobox-host-exec` : La clé de voûte qui exécute tout ça sur l'hôte

### Et ça marche !

Après des heures de frustration, l'émulateur s'est enfin lancé. Fluide, rapide, exactement comme sous Windows. J'ai pu déployer mes applications, tester, debugger. Tout fonctionnait.

## Conclusion : Linux, l'amour vache

Voilà. J'avais mon environnement de développement Android fonctionnel sur Linux. Mais à quel prix ?

Sous Windows, tout ça aurait pris 30 minutes. Télécharger, installer, lancer. Point final. Windows est conçu pour être "user-friendly", pour que tout fonctionne "out of the box". Et ça marche. C'est indéniable.

Linux, lui, ne fait pas de cadeaux. Il ne mâche pas le travail. Il faut comprendre ce qu'on fait, pourquoi les choses plantent, comment le système fonctionne en profondeur. C'est frustrant. C'est chronophage. Parfois, c'est épuisant.

**Mais il y a toujours une solution.**

C'est ça, la philosophie Linux. Rien n'est impossible si on se donne les moyens de comprendre et de chercher. La communauté est là, la documentation existe, les outils sont puissants. Mais il faut accepter de mettre les mains dans le cambouis.

Pour certains, c'est un repoussoir. Pour d'autres, c'est exactement ce qu'ils cherchent : le contrôle total, la compréhension profonde, la satisfaction d'avoir résolu un problème complexe.

Ma migration de Windows vers Linux ? Elle continue. Avec ses hauts et ses bas. Ses victoires et ses frustrations. Mais au final, je ne regrette rien. Parce que chaque problème résolu est une leçon apprise. Et ça, aucun assistant Windows ne pourra jamais me l'offrir.

---

## 🔧 Ressources utiles

Pour ceux qui voudraient se lancer dans l'aventure :

- [Documentation Distrobox](https://distrobox.it/)
- [Guide distrobox-host-exec](https://github.com/89luca89/distrobox/blob/main/docs/usage/distrobox-host-exec.md)
- [Documentation Bazzite](https://docs.bazzite.gg/)
- [Troubleshooting Android Emulator](https://developer.android.com/studio/run/emulator-troubleshooting)

**Commandes utiles :**

```bash
# Vérifier si KVM est disponible
ls -la /dev/kvm

# Vérifier l'état SELinux
getenforce

# Lister les émulateurs disponibles
emulator -list-avds

# Lancer l'émulateur avec le script
./android-emulator.sh Nom_De_Votre_AVD
```
