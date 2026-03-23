---
title: "Comment Claude Code a ressuscité mon projet de 2005"
description: "J'ai retrouvé mon projet Epitech de 2005 — 9 000 lignes de C/C++ compilées en 2026 grâce à Claude Code. REX sur le legacy, les Makefiles cassés et wxWidgets."
date: 2026-03-23T18:00:00+01:00
draft: false
tags:
  - Claude
  - Claude-Code
  - IA
  - Dev
categories:
  - IA
preview: /caps/logo_caps.png
---

# Comment Claude Code a ressuscité mon projet de 2005

Ce weekend, j'ai eu une impulsion étrange : aller fouiller dans mes vieux disques durs et retrouver mon projet de fin d'études Epitech. Celui que j'avais rendu en 2005, un peu fièrement, et que je n'avais plus touché depuis. Vingt et un ans de poussière numérique.
![Logo Caps](/caps/logo_caps.png)
Le projet s'appelle **Caps** : une implémentation complète du protocole [Hotline Communications](https://en.wikipedia.org/wiki/Hotline_Communications), un protocole de partage de fichiers et de chat pair-à-pair très populaire dans la scène Mac des années 90. Mon groupe et moi avions développé un serveur entier (**BlueCap**, en C++), un client en ligne de commande (**RedCap/Console**, en C), et un client graphique (**RedCap/GUI**, en C++/wxWidgets). Environ 9 000 lignes de code applicatif.

J'ai voulu le publier sur GitHub. Et là, j'ai réalisé que ça n'allait pas être simple.

---

## Le réveil brutal

Premier `make`. Échec immédiat.

Ce n'était pas surprenant — mais l'ampleur du bazar était plus grande que prévu. En rouvrant le code, j'ai découvert :

- **Structure plate** : tous les fichiers `.cpp`/`.h` balancés à la racine de chaque composant. Pas de sous-dossiers, pas d'organisation thématique.
- **Makefiles cassés** : le Makefile du client CLI était hardcodé pour NetBSD (`-I/usr/pkg/include -L/usr/pkg/lib`). Il y avait aussi une variable `TCPSERV` référencée mais jamais définie, et un bug classique de 2005 : `$(RM) rm build/RedCap` — ce qui donne en vrai `rm -f rm build/RedCap`, c'est-à-dire une tentative de supprimer un fichier appelé `rm`. Pas de souci, ça rate silencieusement.
- **47 Mo d'artefacts dans git** : binaires compilés, vidéos de démo au format `.mov` et `.avi`, archives `.tgz`.
- **85 000 lignes générées par Autoconf/Automake** : `configure`, `ltmain.sh`, `aclocal.m4`, `libtool`, `config.status`, les caches... Le client CLI était livré avec toute l'infrastructure générée par `autoconf`. Rien de tout ça ne devrait jamais entrer dans un dépôt git.
- **Le Makefile de la GUI** était un fichier *généré par le SDK wxWidgets lui-même*, daté de 1998, signé Julian Smart, et supposait que le projet se trouvait dans l'arborescence des sources de wxWidgets. Il référençait `../../src/makeprog.env`, un fichier qui n'existe nulle part hors du SDK.
- **Signatures d'event handlers incompatibles** avec wxWidgets moderne : les fonctions comme `void PreviewFile()` ne prennent aucun paramètre, alors que le système d'événements wxWidgets exige depuis longtemps un `wxCommandEvent& event`. Résultat : les boutons de l'interface ne faisaient rien.

Bref : un projet parfaitement fonctionnel en 2005 sur une installation DevC++ sous Windows, mais totalement hors d'état d'être compilé en 2026 sur n'importe quel système Linux standard.

---

## Entrer Claude Code

À ce stade j'avais deux options : passer un weekend à tout démêler manuellement, ou laisser Claude Code analyser le bazar avec moi.

J'ai ouvert Claude Code dans le répertoire du projet et je lui ai donné le contexte : vieux projet C/C++, erreurs à la compilation, besoin de remettre ça en ordre sans toucher à la logique métier. Ce point était non-négociable — je voulais conserver le code applicatif intact. C'est une capsule temporelle, pas un refactoring fonctionnel.

Ce qui m'a frappé immédiatement, c'est la façon dont Claude Code lit le code. Il ne se contente pas de repérer les erreurs du compilateur — il comprend *pourquoi* elles existent. En regardant `$(RM) rm build/RedCap`, il a immédiatement expliqué l'expansion de la macro et le bug qui en résulte. En voyant `-I/usr/pkg/include`, il a dit "c'est du NetBSD, ça ne marchera pas sur Fedora, voilà comment le rendre portable". En voyant `void PreviewFile()` dans un `EVT_BUTTON` handler, il a reconnu le pattern wxWidgets et expliqué que la signature était incompatible avec les versions ≥ 2.x.

C'est exactement là où l'IA est utile sur du legacy : le contexte manque, les erreurs sont cryptiques, et l'outillage de l'époque ne ressemble à rien d'actuel. Claude Code est capable de mettre ce contexte en relation — "ce Makefile vient du SDK wxWidgets, voilà pourquoi il ne fonctionne pas sorti de son environnement d'origine".

---

## Le travail concret

Sur onze commits au total, voici ce qui a été fait — avec Claude Code sur les commits les plus complexes.

### Réorganisation structurelle

La GUI est passée de 40+ fichiers à plat à une structure en six sous-dossiers thématiques : `src/core/`, `src/ui/`, `src/chat/`, `src/net/`, `src/files/`, `src/users/`. Le serveur et le client CLI ont également été organisés en `src/` + `docs/`.

La difficulté : les fichiers sources utilisaient des `#include "ConfirmBox.h"` sans chemin. Après déplacement dans `src/ui/`, le compilateur ne trouvait plus rien. La solution : ajouter un flag `-I$(SRCDIR)/xxx` par sous-dossier dans le Makefile, plutôt que modifier les centaines d'includes dans le code source.

### Réécriture des Makefiles

Les trois Makefiles ont été réécrits selon un pattern homogène :

```makefile
SRCDIR = src
OBJDIR = build/obj
BINDIR = build/bin

$(OBJDIR)/%.o: $(SRCDIR)/%.cpp
    @mkdir -p $(dir $@)
    $(CXX) $(CXXFLAGS) -c $< -o $@
```

Pattern rules génériques, répertoires créés à la volée, binaire compilé directement dans `build/bin/` sans `mv` intermédiaire. Pour la GUI, remplacement du Makefile SDK par un Makefile autonome utilisant `wx-config` pour détecter automatiquement les flags wxWidgets de l'installation locale.

### Correction des event handlers wxWidgets

Huit signatures de méthodes corrigées dans la GUI :

```cpp
// Avant
void PreviewFile();
void CreateItemClient();
void DeleteItemClient();

// Après
void PreviewFile(wxCommandEvent& event);
void CreateItemClient(wxCommandEvent& event);
void DeleteItemClient(wxCommandEvent& event);
```

Sans cette correction, les boutons s'affichaient mais ne déclenchaient rien. Bug silencieux, parfaitement compilable, mais inutilisable.

### Grand nettoyage

- Suppression des 47 Mo d'artefacts versionnés (binaires, vidéos, archives)
- Suppression des 85 000 lignes d'infrastructure Autoconf/Automake — dont un fichier `configure` de 20 000 lignes et un `libtool` de 7 000 lignes
- Suppression des fichiers de projet IDE (Dev-C++, Code::Blocks, KDevelop, MSVC) — archivés dans `legacy/` pour la curiosité historique
- Suppression de `laoujensuis.txt`. Mystère non élucidé.

---

## Ce qui n'a pas changé

Zéro ligne de logique applicative modifiée.

Le protocole Hotline est implémenté exactement comme en 2005. Les algorithmes de traitement des transactions réseau, les structures de données, la gestion des utilisateurs, les transferts de fichiers — tout est identique. Les quelques lignes de code source touchées sont des corrections de compilation mineures (includes manquants, flags).

C'était l'objectif depuis le début, et c'est ce qui rend ce type d'exercice intéressant : l'infrastructure de build et l'organisation des fichiers avaient vieilli, pas le code lui-même.

---

## Le résultat

Caps compile aujourd'hui sur Linux, macOS, et Windows via MinGW. Le projet est publié sur GitHub avec un README complet. Une capsule temporelle de 2005 rendue accessible en 2026.

→ [github.com/hansipie/Caps](https://github.com/hansipie/Caps)

---

## Fun fact : Hotline est toujours vivant

![Hotline sur GitHub](/caps/hotline-github.png)

En préparant la publication du projet, j'ai fait une recherche sur GitHub pour voir ce qui existait autour du protocole Hotline. Je m'attendais à tomber sur des archives poussiéreuses des années 90-2000.

Surprise : il y a des projets **actifs, modernes, et sérieusement développés**.

- **[hotline](https://github.com/mierau/hotline)** — Un remake complet de l'app Hotline originale de 1997, écrit en Swift pour macOS, avec le support iOS/iPadOS en développement. Interface native moderne, chat, partage de fichiers, message boards.
- **[Mobius](https://github.com/jhalter/mobius)** — Un serveur Hotline cross-platform écrit en Go, distribué en binaire unique, compatible avec tous les clients existants. Tourne sur macOS, Linux et Windows, avec une API HTTP optionnelle pour l'administration.
- **[Hotline Navigator](https://github.com/fuzzywalrus/Hotline-Navigator)** — Un client Hotline moderne construit avec Tauri, React et Rust. Disponible sur macOS, Windows, Linux, iOS, iPadOS et Android.

Plus de 20 ans après la mort de Hotline Connect (la version commerciale originale), des développeurs continuent à implémenter ce protocole from scratch, en Swift, Go et Rust. Pas par nostalgie passive — mais en construisant des apps vraiment utilisables sur des plateformes modernes.

Il y a quelque chose d'étonnant là-dedans. Hotline n'était pas un protocole standardisé par un organisme, pas un truc académique — c'était un logiciel propriétaire dont le protocole a été reversi-engineered. Et pourtant, il survit.

---

## Ce que ça m'a appris sur Claude Code et le legacy

Claude Code ne remplace pas la compréhension du code — on doit quand même comprendre ce qu'on fait et valider chaque changement. Mais il rend le plongeon dans le legacy beaucoup moins douloureux.

Sur du code récent, dans un projet actif, on a le contexte : on sait pourquoi tel fichier existe, pourquoi tel flag est là, pourquoi tel pattern a été choisi. Sur du legacy de 20 ans, ce contexte est perdu. Les erreurs du compilateur sont cryptiques, les dépendances implicites sont invisibles, et chaque fichier est un puzzle.

Ce que j'ai trouvé utile avec Claude Code dans ce contexte précis :

1. **Diagnostiquer des erreurs hors contexte** — "pourquoi ce Makefile ne compile pas", et obtenir une explication qui tient compte de l'origine historique du fichier
2. **Identifier les patterns legacy** — reconnaître Autoconf, wxWidgets SDK, les flags NetBSD, les conventions Dev-C++ de 2005
3. **Proposer des refactorings ciblés** — réécrire les Makefiles sans toucher aux sources, ajouter des flags `-I` plutôt que modifier les includes

Ce n'est pas un oracle. Il faut valider, tester, comprendre ce qui est proposé. Mais comme pair programmeur pour dépoussiérer du vieux code, c'est remarquablement efficace.

Vingt et un ans de poussière. Trois semaines de travail en pointillé. Et un projet qui tourne à nouveau.
