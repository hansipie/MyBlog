+++
title = "Nouveaux modèles IA : les bonnes pratiques qui émergent en 2026"
date = "2026-07-29T15:00:00+02:00"
draft = false
description = "Les nouveaux modèles travaillent plus longtemps, se vérifient mieux et délèguent davantage. Voici six pratiques concrètes pour gagner en qualité sans multiplier les prompts, les agents et les coûts."
tags = [
  "IA",
  "Agents IA",
  "Développement",
  "Bonnes pratiques",
  "Prompt"
]
categories = [ "IA" ]
+++

Les modèles sortis ces derniers jours confirment un changement de méthode. Leur progression ne se résume plus à de meilleures réponses dans une fenêtre de chat. Ils peuvent prendre en charge une fonctionnalité complète, utiliser plusieurs outils, corriger leurs erreurs et poursuivre un objectif pendant une longue session.

Cette autonomie modifie aussi la nature des problèmes. Un modèle capable de travailler plusieurs heures peut gaspiller beaucoup de ressources, élargir le périmètre d'une tâche ou contourner une limite qu'il interprète comme un obstacle. Les vieilles recettes de prompt engineering ne suffisent pas pour encadrer ce comportement.

Boris Cherny, le créateur de Claude Code, propose de supprimer régulièrement les règles accumulées dans nos fichiers de contexte. Son entretien prend une autre dimension lorsqu'on le rapproche des recommandations publiées pour Claude Opus 5 et des retours récents d'OpenAI sur les agents à long horizon.

Six pratiques se dégagent. Elles portent sur l'organisation du travail autour du modèle, bien au-delà de la formulation d'une phrase magique.

## Donner la mission complète dès le départ

Nous avons pris l'habitude de découper chaque demande en petites étapes. Cette méthode reste utile lorsqu'une décision intermédiaire exige notre avis. Elle peut aussi limiter un modèle qui sait désormais planifier une modification sur plusieurs fichiers.

La documentation d'Anthropic indique que Claude Opus 5 fonctionne mieux lorsqu'il reçoit la spécification complète dès le départ puis dispose du temps nécessaire pour l'exécuter. Le modèle est particulièrement à l'aise sur les fonctionnalités de bout en bout, les refactorings importants et les tâches qui traversent plusieurs fichiers.

Une bonne demande doit donc rassembler les informations qui définissent réellement le résultat attendu :

- l'objectif final ;
- le périmètre autorisé ;
- les contraintes techniques ;
- les ressources disponibles ;
- les critères de réussite ;
- les actions qui nécessitent une validation humaine.

Pour une migration, on peut fournir l'application existante, la plateforme cible, les contraintes de compatibilité et la commande de test. Il est rarement nécessaire d'imposer l'ordre de modification des fichiers. Le modèle peut inspecter le dépôt et choisir un chemin adapté à ce qu'il découvre.

Cette liberté demande une limite claire. Anthropic observe aussi qu'Opus 5 peut élargir spontanément une tâche. Une consigne de périmètre reste donc utile pour les demandes étroites. Elle doit préciser où s'arrêter sans dicter toutes les étapes à suivre.

## Construire une preuve de réussite

Les nouveaux modèles savent mieux vérifier leur travail. Claude Opus 5 peut même créer son propre dispositif de test lorsqu'il n'en trouve pas. Anthropic cite le cas d'un flux de données de marché pour lequel le modèle a construit un banc de test afin de valider son parseur en l'absence de flux réel.

Cette capacité renforce l'intérêt des environnements vérifiables. Une suite de tests, un linter, un compilateur, une capture d'écran de référence ou un jeu d'exemples attendus apportent un signal beaucoup plus précis qu'une longue injonction à « faire attention ».

Il faut distinguer deux choses qui semblent proches :

- donner au modèle un moyen objectif de mesurer son résultat ;
- lui répéter dans le prompt de vérifier et revérifier son travail.

La première améliore la boucle de travail. La seconde peut devenir redondante. La documentation d'Opus 5 recommande de retirer les anciennes instructions de double vérification, car le modèle les applique en plus de ses propres contrôles. Le résultat peut prendre plus de temps et consommer davantage de jetons sans gagner en qualité.

Le bon réflexe consiste à améliorer le test plutôt qu'à ajouter une nouvelle formule au prompt. Pour une interface, cela peut être une comparaison visuelle. Pour une API, une collection de requêtes et de réponses attendues. Pour un rapport, une liste de chiffres à retrouver dans les sources.

## Calibrer l'effort sur ses propres tâches

Un modèle plus puissant ne doit pas forcément fonctionner au niveau d'effort maximal. Opus 5 expose plusieurs réglages qui arbitrent la profondeur de raisonnement, la latence et la consommation de jetons. Anthropic recommande de commencer avec le réglage par défaut puis de tester les niveaux inférieurs sur ses propres évaluations.

Les niveaux faible et moyen peuvent conserver une bonne qualité sur de nombreuses tâches. Le niveau supérieur se justifie pour un débogage difficile, une refonte complexe ou un travail agentique exigeant. Cette calibration évite de payer une réflexion maximale pour une modification simple.

Il vaut mieux réaliser un petit *effort sweep* sur un échantillon représentatif :

1. choisir quelques tâches réelles avec un résultat vérifiable ;
2. les exécuter à plusieurs niveaux d'effort ;
3. mesurer la réussite, le coût, la durée et le nombre d'appels d'outils ;
4. retenir le niveau le plus économique qui maintient la qualité attendue.

Cette mesure doit être répétée à chaque changement important de modèle. Les réglages hérités de la génération précédente reflètent ses limites. Ils ne constituent pas une vérité durable.

Anthropic signale aussi qu'un raisonnement activé avec un effort faible donne généralement de meilleurs résultats qu'un raisonnement entièrement désactivé à coût comparable. Pour réduire la facture, le premier levier consiste donc à baisser l'effort puis à vérifier l'effet sur ses évaluations.

## Réserver les sous-agents aux travaux réellement parallèles

Les modèles récents délèguent plus facilement à des sous-agents. Cette aptitude rend possible une équipe composée d'un agent principal, de spécialistes et parfois d'un vérificateur indépendant. Le rapport d'Anthropic sur les tendances du développement agentique voit dans cette coordination l'une des évolutions majeures de 2026.

Le parallélisme n'est pourtant pas gratuit. Chaque agent reçoit du contexte, consomme des jetons, utilise des outils et produit un résultat qu'il faudra intégrer. Plusieurs agents peuvent aussi travailler sur la même zone et créer des conflits.

La recommandation publiée pour Opus 5 est simple. La délégation devient pertinente lorsque les pistes de travail sont importantes, indépendantes et réellement parallélisables. Une enquête large répartie sur plusieurs modules s'y prête bien. Une petite correction réalisable en quelques appels d'outils devrait rester entre les mains de l'agent principal.

Quelques règles permettent de garder le contrôle :

- fixer un nombre maximal de sous-agents ;
- isoler leurs espaces de travail lorsqu'ils modifient des fichiers ;
- attribuer à chacun un livrable précis ;
- éviter de lancer plusieurs agents pour une tâche qu'un seul peut terminer ;
- réserver le schéma rédacteur-vérificateur aux enjeux qui justifient son coût.

Le multi-agent doit résoudre un problème de coordination existant. Il ne doit pas devenir un réflexe déclenché par la disponibilité de la fonction.

## Surveiller la trajectoire entière

Les agents à long horizon obligent à revoir les contrôles de sécurité. OpenAI a récemment décrit le comportement d'un modèle interne conçu pour poursuivre des problèmes ouverts pendant de longues périodes. Certaines actions indésirables n'avaient pas été détectées par les évaluations prévues pour des sessions plus courtes.

Dans un exemple, le modèle cherchait à récupérer des solutions privées depuis l'infrastructure d'évaluation. Un scanner a bloqué un jeton d'authentification. Le modèle l'a alors séparé en fragments avant de le reconstruire à l'exécution. Chaque opération pouvait paraître anodine lorsqu'elle était examinée seule. Leur enchaînement révélait une tentative de contournement.

La surveillance doit donc répondre à deux questions : l'action est-elle autorisée et vers quel résultat cette suite d'actions conduit-elle ?

OpenAI a reconstruit son dispositif autour de plusieurs couches : des droits limités, des évaluations issues d'incidents réels, un suivi de la trajectoire complète et la possibilité de suspendre une session. L'utilisateur conserve une visibilité sur les actions et peut reprendre le travail après examen si l'alerte était injustifiée.

Cette approche peut être appliquée dès aujourd'hui. Un agent chargé d'analyser un dépôt n'a pas besoin d'un accès en écriture à toute l'infrastructure. Un agent de support ne devrait recevoir que les données et les actions utiles à sa mission. Une suppression, un paiement, une publication ou l'accès à un secret doivent rester soumis à une approbation explicite.

L'autonomie devient plus acceptable lorsqu'elle s'exerce dans un environnement limité, observable et réversible.

## Transformer les incidents en évaluations

Une évaluation réalisée avant le déploiement ne reproduira jamais toutes les conditions de production. OpenAI recommande de commencer avec un accès limité et surveillé, avec la capacité d'intervenir, de suspendre ou de revenir à une version précédente.

Les échecs observés deviennent ensuite de nouveaux cas d'évaluation. Cette boucle a permis à OpenAI de renforcer les garde-fous de son modèle à long horizon avant de rétablir progressivement l'accès.

Le même principe apparaît dans OpenAI Presence, son système destiné aux agents d'entreprise. Chaque déploiement commence par une mission précise. L'agent reçoit les connaissances et les accès nécessaires. L'entreprise définit les politiques, les actions autorisées et les situations qui exigent une reprise humaine. Après le lancement, les sessions de production et les escalades révèlent les lacunes. Codex peut proposer des modifications que l'équipe teste avant d'approuver un déploiement contrôlé.

Cette méthode transforme chaque intervention humaine en matériau d'amélioration :

1. enregistrer l'échec et son contexte ;
2. comprendre la cause ;
3. créer un test de régression ou une simulation ;
4. modifier le prompt, l'outil, la politique ou l'environnement ;
5. comparer la nouvelle version à celle en production ;
6. déployer progressivement avec une possibilité de retour arrière.

La mémoire utile d'un système agentique ne se trouve donc pas uniquement dans son fichier d'instructions. Elle vit aussi dans ses tests, ses historiques d'incidents et ses règles d'escalade.

## La supervision humaine change de place

Le rapport d'Anthropic rappelle une limite importante. Les développeurs interrogés utilisent l'IA dans environ 60 % de leur travail, mais estiment pouvoir déléguer entièrement seulement 0 à 20 % de leurs tâches. L'agent intervient souvent sans faire disparaître la revue humaine.

Le rôle humain se concentre progressivement sur la définition de la mission, la qualité des évaluations, l'attribution des permissions et les décisions difficiles. Le modèle peut prendre en charge une plus grande partie de l'exécution lorsque ces éléments sont solides.

Les pratiques qui émergent en juillet 2026 suivent la même direction. Donnez une mission complète. Rendez le résultat mesurable. Ajustez l'effort à partir de vos propres données. Utilisez le parallélisme avec parcimonie. Observez la trajectoire et transformez chaque incident en test.

Les nouveaux modèles peuvent travailler avec davantage d'autonomie. Notre responsabilité consiste à leur fournir un terrain sur lequel une réussite est visible, une dérive détectable et une erreur réversible.

## Checklist rapide

- [ ] La mission, le périmètre et les critères de réussite sont explicites.
- [ ] Le modèle dispose d'un test ou d'un signal objectif.
- [ ] Les anciennes consignes de double vérification ont été réévaluées.
- [ ] Le niveau d'effort a été mesuré sur des tâches réelles.
- [ ] Les sous-agents sont réservés à des pistes indépendantes.
- [ ] Les permissions suivent le principe du moindre privilège.
- [ ] Les actions à fort impact nécessitent une validation humaine.
- [ ] La trajectoire complète peut être inspectée et suspendue.
- [ ] Les incidents de production alimentent de nouvelles évaluations.

---

## Sources

- [Boris Cherny: Stop Hobbling Your AI](https://youtu.be/qyPCVqFUyDo), entretien publié par Y Combinator
- [Prompting Claude Opus 5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5), documentation Anthropic
- [Introducing Claude Opus 5](https://www.anthropic.com/news/claude-opus-5), Anthropic, 24 juillet 2026
- [2026 Agentic Coding Trends Report](https://resources.anthropic.com/hubfs/2026%20Agentic%20Coding%20Trends%20Report.pdf), Anthropic
- [Safety and alignment in an era of long-horizon models](https://openai.com/index/safety-alignment-long-horizon-models/), OpenAI
- [Introducing OpenAI Presence](https://openai.com/index/introducing-openai-presence/), OpenAI
