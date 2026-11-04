---
title: "Frontrise"
description: "Fonds d'écran animés (vidéos et shaders GLSL) pour GNOME Shell sur Wayland."
date: 2026-11-04T00:21:52+02:00
tags: [Rust, GNOME, Wayland, GLSL]
params:
  appCategory: MultimediaApplication
  os: "Linux (GNOME, Wayland)"
  image: "/images/projets/frontrise.webp"
  statusLabel: ACTIVE
  kind: Rust
  link: "https://github.com/hansipie/Frontrise"
  linkLabel: "GitHub"
---

![Aperçu de Frontrise](/images/projets/frontrise.webp)

**Frontrise** affiche des vidéos et des scènes de shaders comme fonds d'écran animés sur **GNOME Shell 50** en session **Wayland**. Il se compose d'une application en Rust (GTK 4, libadwaita, GStreamer) et d'une extension GNOME Shell.

## Fonctionnalités
- **Vidéos** sur chaque écran, synchronisées ou une par écran.
- **Scènes** : shaders GLSL de type Shadertoy (`mainImage`), trois fournis (Aurora, Pulse, Nebula). Les scènes peuvent **réagir au son** (`iSpectrum[32]`, `iLevel`, `iBass`) : seule la puissance par bande est utilisée, rien n'est enregistré.
- **Bibliothèque** avec recherche, favoris, miniatures et import par glisser-déposer.
- **Playlists** : intervalle, lecture aléatoire, ordre, précédent/suivant.
- **Écrans** : fond par écran, mode « comme l'écran X », remplir ou ajuster, mémorisation des réglages des écrans débranchés.
- **Bureau, Vue d'ensemble et écran de verrouillage**.
- **Pause automatique** sur batterie, en économie d'énergie ou quand une application est en plein écran.
- Menu dans la barre supérieure, démarrage à l'ouverture de session, contrôle en ligne de commande.

## Comment ça marche
L'application ouvre des fenêtres de rendu que l'extension garde réduites (absentes d'Alt+Tab et de la Vue d'ensemble), puis peint un clone en direct dans les acteurs de fond de GNOME. L'extension signale aussi les applications en plein écran pour mettre en pause.

## Installation
Le script `install.sh` place le binaire dans `~/.local/bin/frontrise`, le fichier desktop et l'icône, et l'extension dans `~/.local/share/gnome-shell/extensions/`. Il faut les paquets de développement de GTK 4, libadwaita et GStreamer, un compilateur C et la chaîne Rust stable.

## Limites
- GNOME Shell 50 uniquement (testé dans un GNOME Shell 50.6 imbriqué sans affichage).
- Pas de réglage de la vitesse de lecture.
- Les fonds ne reçoivent pas les clics (GNOME ne transmet aucune entrée au fond d'écran).
- Les fenêtres de rendu sont reconnues par leur titre.

[GitHub →](https://github.com/hansipie/Frontrise)
