+++
title = "Clawdbot : la hype est-elle justifiée ?"
date = 2026-01-28T10:00:00+01:00
draft = false
description = "Analyse critique de Clawdbot, l'assistant IA qui affole la tech, et pourquoi Claude Code pourrait suffire"
tags = ["ia", "claude", "clawdbot", "productivité"]
categories = ["IA"]
+++

## L'assistant IA qui affole la tech

Impossible d'y échapper cette semaine : **Clawdbot** (récemment renommé **Moltbot** après une dispute de marque avec Anthropic) est partout. Plus de 60 000 étoiles GitHub en quelques semaines, des Mac Mini en rupture de stock, des threads viraux sur X qui promettent la révolution de la productivité personnelle.

Le pitch est séduisant : un "Claude with hands", un assistant IA qui ne se contente pas de répondre à vos questions, mais qui **agit** — envoie vos emails, gère votre calendrier, réserve vos vols, contrôle votre domotique, le tout depuis WhatsApp ou Telegram.

Créé par Peter Steinberger, le fondateur autrichien de PSPDFKit, Clawdbot représente une vision ambitieuse : transformer Claude en véritable système d'exploitation personnel.

Mais derrière l'enthousiasme, je reste sceptique. **La hype me semble surfaite.**

![](/clawdvsclaude.png)

## Ce que Clawdbot promet

Soyons honnêtes : sur le papier, c'est impressionnant.

### Les fonctionnalités annoncées

- **Exécution de tâches réelles** : rédaction et envoi d'emails, gestion de calendrier, réservations
- **Automatisation web** : navigation, remplissage de formulaires, extraction de données
- **Contrôle système** : commandes shell, gestion de fichiers, repositories Git
- **Mémoire persistante** : vos préférences et historiques stockés localement
- **Multi-plateforme** : accessible via WhatsApp, Telegram, Discord, iMessage

### L'argument du "self-hosted"

Clawdbot se veut respectueux de la vie privée : tout tourne sur votre propre matériel. Pas de données envoyées à un tiers (hormis les appels API à Anthropic, évidemment).

## Les problèmes que personne ne mentionne

### La sécurité : un désastre annoncé

C'est le point le plus préoccupant. Les experts en cybersécurité tirent la sonnette d'alarme :

> *"When you run Clawdbot, you aren't just using an app. You are deploying a privileged control plane directly onto the internet."*
> — [Security Boulevard](https://securityboulevard.com/2026/01/clawdbot-is-what-happens-when-ai-gets-root-access-a-security-experts-take-on-silicon-valleys-hottest-ai-agent/)

Les chiffres font froid dans le dos :

- **Plus de 1 000 instances Clawdbot** exposées publiquement sur internet
- Beaucoup **sans aucune authentification**
- SlowMist a découvert des **centaines de clés API et historiques de conversation** accessibles à tous
- Vulnérabilités permettant le **vol de credentials** et l'**exécution de code à distance**

Comme le résume Eric Schwake, directeur stratégie cybersécurité chez Salt Security :

> *"A significant gap exists between the consumer enthusiasm for Clawdbot's one-click appeal and the technical expertise needed to operate a secure agentic gateway."*

### Les coûts cachés

Le logiciel est open source et gratuit. Mais la réalité est moins rose :

- **Impossible d'utiliser un abonnement Claude Max** (violation des conditions d'utilisation d'Anthropic)
- Vous payez les appels API au token — un testeur rapporte **80 millions de tokens en une journée**, soit environ **80$**
- Ajoutez le coût d'un VPS ou d'un Mac Mini dédié pour le faire tourner 24/7

### Le chaos du rebrand

La saga Clawdbot → Moltbot illustre bien l'immaturité du projet :

1. Anthropic exige un changement de nom (trop proche de "Claude")
2. Pendant le transfert des comptes GitHub et Twitter, **des scammeurs volent les deux en 10 secondes**
3. Un faux token $CLAWD atteint 16 millions de dollars avant de crasher de 90%

Difficile d'inspirer confiance pour un outil censé gérer vos emails et votre vie numérique.

## Et si Claude Code suffisait ?

Voici ma position : **j'utilise déjà Claude Code, et il fait tout ce dont j'ai besoin.**

### Claude Code a déjà des "mains"

L'argument marketing de Clawdbot — "Claude with hands" — ignore que Claude Code possède déjà ces capacités :

| Capacité | Clawdbot | Claude Code |
|----------|----------|-------------|
| Accès au système de fichiers | ✅ | ✅ |
| Exécution de commandes shell | ✅ | ✅ |
| Gestion Git | ✅ | ✅ |
| Recherche web | ✅ | ✅ |
| Mémoire persistante | ✅ | ✅ (CLAUDE.md) |
| Intégration MCP | ✅ | ✅ |
| Manipulation de données | ✅ | ✅ |

### Au-delà du développement

Claude Code n'est pas limité au code. En ce moment même, je l'utilise pour :

- Gérer mon vault Obsidian (création de dossiers, rédaction d'articles)
- Faire de la recherche web et synthétiser des sources
- Organiser mes fichiers et documents

C'est un assistant polyvalent qui s'adapte à mon contexte de travail, pas un gadget qui essaie de tout faire via WhatsApp.

### Les avantages concrets de Claude Code

- **Track record prouvé** : plus d'un an d'existence, utilisé en production
- **Sécurité maîtrisée** : pas d'exposition réseau, contrôle total
- **Coût prévisible** : abonnement Max inclus, pas de surprise
- **Intégration native** : terminal, IDE, workflow de développeur
- **Simplicité** : `claude` dans le terminal, c'est parti
- **Web search natif** : la recherche web fonctionne *out of the box*, sans configuration, sans MCP supplémentaire — Clawdbot nécessite de configurer des skills et des intégrations pour y arriver

## L'article qui dit tout haut ce que je pense

Un développeur a publié un guide intitulé ["Transform Claude Code Into Your Free, Ultra-Powerful Clawdbot Alternative"](https://jinlow.medium.com/transform-claude-code-into-your-free-ultra-powerful-clawdbot-alternative-the-complete-80ae8c43bf3e). Son résumé :

> **"Everything Clawdbot can do, Claude Code does better — for free."**

En utilisant les fonctionnalités natives de Claude Code — MCP servers, hooks, CLAUDE.md — on peut construire un système équivalent sans la complexité et les risques de Clawdbot.

## Conclusion : cool, mais pas pour moi

Clawdbot est un projet intéressant qui pousse une vision ambitieuse de l'IA agentique. Pour certains cas d'usage — recevoir des notifications sur Telegram, déléguer des tâches depuis son téléphone — il apporte une valeur ajoutée.

Mais pour moi, **la hype est disproportionnée** :

- Les risques de sécurité sont réels et sous-estimés
- La complexité de configuration contredit la promesse de simplicité
- Claude Code offre déjà 90% des fonctionnalités, de manière plus sûre et plus intégrée
- Le projet a 3 semaines — aucun track record, aucune preuve de productivité réelle

Si vous êtes technique et à l'aise avec un terminal, **Claude Code est probablement tout ce dont vous avez besoin**. Pas besoin d'un Mac Mini dédié, pas besoin d'exposer un gateway sur internet, pas besoin de payer des tokens à la volée.

Parfois, l'outil le plus puissant est celui qu'on maîtrise déjà.

---

## Sources

- [Clawdbot Official Site](https://clawd.bot/)
- [GitHub - clawdbot/clawdbot](https://github.com/clawdbot/clawdbot)
- [TechCrunch - Everything about Clawdbot/Moltbot](https://techcrunch.com/2026/01/27/everything-you-need-to-know-about-viral-personal-ai-assistant-clawdbot-now-moltbot/)
- [Security Boulevard - AI Gets Root Access](https://securityboulevard.com/2026/01/clawdbot-is-what-happens-when-ai-gets-root-access-a-security-experts-take-on-silicon-valleys-hottest-ai-agent/)
- [The Register - Security Concerns](https://www.theregister.com/2026/01/27/clawdbot_moltbot_security_concerns)
- [Trending Topics - Data Leak Warnings](https://www.trendingtopics.eu/clawbot-hyped-ai-agent-risks-leaking-personal-data-security-experts-warn/)
- [Medium - The Truth About the Hype](https://medium.com/@champ18ion.personal/what-is-clawdbot-the-truth-about-the-2026-personal-os-hype-and-the-risks-you-arent-seeing-1c91969ca008)
- [Zen Van Riel - Clawdbot vs Claude Code Comparison](https://zenvanriel.nl/ai-engineer-blog/clawdbot-vs-claude-code-comparison-guide/)
- [JIN - Transform Claude Code Into Clawdbot Alternative](https://jinlow.medium.com/transform-claude-code-into-your-free-ultra-powerful-clawdbot-alternative-the-complete-80ae8c43bf3e)
