+++
title = "GPT-6 Astra : OpenAI n'abandonne pas les développeurs, il change leur rôle"
date = "2026-09-08T13:00:00+02:00"
draft = false
description = "GPT-6 Astra mise sur les agents autonomes et le computer use. OpenAI délaisse-t-il les développeurs ou redéfinit-il leur travail ?"
tags = [
  "IA",
  "OpenAI",
  "Anthropic",
  "Développement",
  "Agents IA"
]
categories = [ "IA" ]
preview = "/20260908-gpt6-astra-developpeurs/20260908-gpt6-astra-assistant-vers-agent.png"
+++

Ma première lecture du lancement de GPT-6 Astra m'a laissé une impression nette. OpenAI ne vend plus seulement un modèle qui répond. L'entreprise vend un modèle qui agit.

Les exemples mis en avant parlent de formulaires remplis, de dossiers analysés, de logiciels manipulés et de tâches menées de bout en bout. Le *computer use* devient une capacité centrale. L'assistant attendait une question. L'agent reçoit un objectif et se débrouille avec les outils disponibles.

J'étais prêt à en tirer une conclusion simple : OpenAI a arrêté de parler aux développeurs.

En relisant les annonces, la documentation API et les intégrations disponibles, cette conclusion ne tient pas. OpenAI parle toujours aux développeurs. Il leur propose simplement une place différente.

![Passage d'un assistant qui répond à un agent autonome qui planifie, utilise des outils et livre un résultat.](/20260908-gpt6-astra-developpeurs/20260908-gpt6-astra-assistant-vers-agent.png)

## Astra est présenté comme un opérateur

Microsoft résume le changement sans détour. L'IA d'entreprise doit passer de la conversation à la livraison d'unités de travail plus substantielles. Astra peut construire un plan, naviguer dans des applications, mettre à jour des données et produire un résultat exploitable.

Cette orientation dépasse le développement logiciel. OpenAI montre des usages dans la recherche, les documents, les tableurs, la conformité ou la gestion de dossiers. Une interface graphique sans API n'est plus forcément un obstacle. Le modèle peut interpréter ce qui se trouve à l'écran et agir dans l'application.

C'est probablement ce qui donne l'impression d'un changement de public. Le développeur n'est plus le personnage principal de chaque démonstration. Le produit vise désormais tous les métiers qui travaillent devant un ordinateur.

Mais élargir le public ne signifie pas abandonner ceux qui construisent les outils.

## Les développeurs sont toujours au centre de l'infrastructure

La documentation de GPT-6 Astra décrit un modèle conçu pour le raisonnement complexe, le code, la recherche, la création de documents et le *computer use*. Son API accepte jusqu'à 1 050 000 tokens de contexte et 128 000 tokens en sortie. Elle prend en charge le *function calling*, les sorties structurées, MCP, le shell hébergé, l'application de patchs, la recherche web et l'utilisation d'un ordinateur.

Sous ses airs d'offre pensée uniquement pour un responsable métier qui clique sur un bouton, on découvre une boîte à outils pour construire des systèmes agentiques complets.

Astra est aussi disponible dans GitHub Copilot, notamment dans VS Code, Visual Studio, JetBrains, Xcode et le CLI de Copilot. GitHub le présente comme un modèle destiné au code autonome sur des tâches longues, capable de planifier, diagnostiquer puis vérifier son résultat.

Le message n'est donc pas « vous n'avez plus besoin de développeurs ». Il ressemble davantage à « les développeurs vont définir le cadre dans lequel les agents travaillent ».

Ce cadre comprend les outils accessibles, les permissions, les tests, les données, les limites de coût et les actions qui exigent une validation humaine. Le code reste important, mais une partie de la valeur se déplace vers la conception du système qui produit et vérifie ce code.

![Le rôle du développeur évolue vers la définition des outils, des permissions, des tests et des limites des agents IA.](/20260908-gpt6-astra-developpeurs/20260908-gpt6-astra-role-developpeur.png)

## La comparaison avec Anthropic était trop simple

Mon premier brouillon opposait deux écoles.

D'un côté, OpenAI et l'exécution autonome. De l'autre, Anthropic et l'assistant qui reste sagement dans le terminal.

Cette opposition ne correspond plus au marché actuel. Claude 4 reste un repère important dans l'histoire de Claude Code, mais Anthropic présente désormais Claude Fable 5.1 comme un modèle pour le code, le travail intellectuel et les longues sessions autonomes. Il peut traiter des changements à l'échelle d'un dépôt, conduire des revues de code, écrire ses propres tests et travailler pendant plusieurs jours.

Anthropic poursuit donc le même mouvement vers l'autonomie. La différence se trouve davantage dans l'expérience proposée et dans l'écosystème que dans une opposition entre assistant et opérateur.

Claude Code conserve une identité très liée au terminal et au dépôt local. OpenAI distribue Astra à travers son API, Codex, GitHub Copilot, Microsoft Foundry et plusieurs plateformes cloud. Dans les deux cas, le développeur configure un agent capable d'aller bien au-delà de l'autocomplétion.

Même les tarifs rapprochent les deux offres. GPT-6 Astra et Claude Fable 5.1 sont annoncés à 10 dollars par million de tokens en entrée et 50 dollars en sortie. Anthropic se distingue notamment par la lecture du cache à 0,25 dollar par million de tokens, tandis qu'OpenAI annonce 1 dollar pour les entrées en cache. Le coût réel dépendra toutefois du niveau d'effort, de la longueur des sessions, des appels d'outils et du nombre de tentatives nécessaires pour obtenir un résultat validé.

Pour suivre ces écarts dans le temps, je maintiens aussi un [comparatif des tarifs des LLM](/labs/tarifs-llm/).

![Comparaison de GPT-6 Astra et Claude Fable 5.1 sur l'autonomie, les usages, les intégrations et les tarifs.](/20260908-gpt6-astra-developpeurs/20260908-gpt6-astra-vs-fable-5-1.png)

## Plus d'autonomie signifie plus de responsabilité

Astra est le premier modèle qu'OpenAI classe au niveau « Critical » pour ses capacités en cybersécurité. Avec les bons outils et les bons accès, il peut trouver des vulnérabilités inconnues et développer des méthodes d'exploitation sans être guidé à chaque étape.

Plutôt que de transformer chaque utilisation d'Astra en incident de sécurité, cette capacité rappelle qu'un agent puissant ne devrait pas recevoir des droits illimités par défaut.

Un agent de code n'a pas besoin des identifiants de production pour corriger un test unitaire. Un agent chargé d'analyser un dépôt n'a pas besoin d'un accès en écriture à toute l'infrastructure. Les suppressions, les déploiements, les paiements et l'accès aux secrets doivent conserver des points d'approbation explicites.

J'abordais déjà ces pratiques dans [les bonnes pratiques qui émergent avec les nouveaux modèles](/posts/2026-07-29-nouveaux-modeles-ia-bonnes-pratiques/). Astra ne les rend pas obsolètes. Il les rend plus urgentes.

## Le vrai choix n'est pas OpenAI contre Anthropic

Un benchmark de lancement ne suffit pas pour choisir l'outil qui accompagnera un travail quotidien. La bonne question reste simple : quel système me fait réellement gagner du temps sans diminuer ma compréhension ni augmenter le risque ?

Je regarderais six critères.

1. **Le contrôle**. Puis-je voir les actions réalisées, limiter les permissions et reprendre la main facilement ?
2. **L'autonomie utile**. Le modèle termine-t-il une tâche vérifiable ou produit-il seulement beaucoup d'activité ?
3. **Le coût complet**. Combien coûte un résultat validé, appels d'outils et reprises compris ?
4. **L'intégration**. Fonctionne-t-il avec mon terminal, mon IDE, mes dépôts et mon infrastructure existante ?
5. **La sécurité**. Les secrets, les environnements sensibles et les actions irréversibles sont-ils correctement isolés ?
6. **La charge cognitive**. Dois-je surveiller chaque étape ou puis-je me concentrer sur les décisions importantes ?

![Les six critères pour choisir un agent IA : contrôle, autonomie utile, coût complet, intégration, sécurité et charge cognitive.](/20260908-gpt6-astra-developpeurs/20260908-gpt6-astra-six-criteres.png)

Le meilleur modèle n'est pas forcément celui qui arrive en tête d'un tableau. C'est celui dont les erreurs sont visibles, dont le coût reste acceptable et dont le fonctionnement s'intègre à une méthode de travail que l'on comprend.

## OpenAI ne nous parle plus de la même manière

GPT-6 Astra confirme la fin du développeur réduit à la production manuelle de lignes de code.

Nous allons toujours concevoir, lire, déboguer et maintenir des logiciels. Nous devrons aussi définir des objectifs, construire des évaluations, limiter des permissions et vérifier des trajectoires d'exécution de plus en plus longues.

La frontière ne passe pas entre ceux qui codent et ceux qui utilisent l'IA. Elle passe entre ceux qui délèguent sans cadre et ceux qui savent construire un cadre fiable.

---

## Sources

- [GPT-6 Astra: A new generation of intelligence](https://openai.com/index/gpt-6-astra/), annonce officielle d'OpenAI
- [GPT-6 Astra Model](https://developers.openai.com/api/docs/models/gpt-6-astra), documentation API OpenAI
- [GPT-6 Astra System Card](https://deploymentsafety.openai.com/gpt-6-astra), OpenAI Deployment Safety Hub
- [GPT-6 Astra is generally available in GitHub Copilot](https://github.blog/changelog/2026-09-04-gpt-6-astra-is-generally-available-in-github-copilot/), GitHub Changelog
- [GPT-6 Astra: Frontier intelligence for work](https://azure.microsoft.com/en-us/blog/gpt-6-astra-frontier-intelligence-for-work-now-generally-available-in-microsoft-foundry/), Microsoft Azure Blog
- [Introducing Claude Fable 5.1 and Claude Mythos 5.1](https://www.anthropic.com/claude-fable-and-mythos-5-1), Anthropic
- [OpenAI begins rolling out Astra](https://www.cnbc.com/2026/09/03/open-ai-astra-gpt-6-cyber.html), CNBC
