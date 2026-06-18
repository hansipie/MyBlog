+++
title = "Gérer les secrets de ses agents IA avec Bitwarden et Hermes"
date = 2026-06-08T21:20:00+02:00
draft = false
description = "Comment centraliser, limiter et injecter les secrets d'agents IA locaux avec Bitwarden Secrets Manager et Hermes, sans multiplier les fichiers .env exposés."
tags = ["IA", "Sécurité", "Hermes", "Bitwarden", "Secrets"]
categories = ["IA"]
preview = "/20260608-secrets-hermes-bitwarden/01-env-vs-bitwarden.png"
+++

Les agents IA locaux donnent une impression de simplicité trompeuse. On installe un harness, on ajoute deux ou trois clés API, puis l'agent commence à coder, chercher sur le web, envoyer des messages, appeler des modèles et piloter des outils. Le problème, c'est que chaque nouvelle capacité ajoute souvent un nouveau secret : une clé OpenRouter, un token GitHub, un mot de passe SMTP, un jeton Telegram, un token MCP, une clé ElevenLabs, un identifiant Notion, parfois même des accès d'infrastructure.

Au début, tout finit dans un fichier `.env`. Puis dans un autre. Puis dans `config.yaml`. Puis dans une note copiée au mauvais endroit. Le désordre devient vite un risque de sécurité.

La bonne approche consiste à traiter les agents IA comme n'importe quel autre système logiciel qui manipule des credentials sensibles : les secrets doivent être centralisés, chiffrés, rotatifs, audités et injectés uniquement au moment où le processus en a besoin.

Dans cet article, on prend un cas concret avec Hermes Agent, un harness d'agent IA local et Bitwarden Secrets Manager, la brique Bitwarden dédiée aux secrets techniques.

## Pourquoi les agents IA aggravent le problème des secrets

Un serveur web classique a souvent quelques variables d'environnement bien identifiées : base de données, cache, fournisseur mail, stockage objet. Un agent IA local, lui, accumule des accès très hétérogènes.

Il peut avoir besoin de :

- clés de fournisseurs de modèles, comme OpenAI, Anthropic ou OpenRouter ;
- tokens d'outils développeur, comme GitHub ou Linear ;
- credentials de messagerie, comme Telegram, Slack, Discord, SMTP ou Matrix ;
- accès à des services personnels, comme Notion, Google, Airtable, Spotify ou Home Assistant ;
- clés MCP ou API internes ;
- mots de passe d'administration pour des systèmes que l'agent doit diagnostiquer.

Cette diversité change le risque. Une fuite de clé ne donne pas seulement accès à une API isolée. Elle peut donner à un attaquant une carte très précise de votre environnement personnel ou professionnel.

Le danger vient aussi du mode d'exécution. Un agent manipule des fichiers, lance des commandes, lit des logs, explore des dossiers et peut parfois recevoir du contenu non fiable depuis le web. Même si le modèle est bien intentionné, le harness doit limiter ce qu'il expose. Un secret qui traîne en clair dans un fichier de configuration est une invitation au désastre.

## Le piège du `.env` permanent

![](/20260608-secrets-hermes-bitwarden/01-env-vs-bitwarden.png)

Le fichier `.env` est pratique. Il est aussi facile à oublier.

Les incidents classiques sont connus :

- fichier `.env` commité par erreur ;
- sauvegarde cloud qui réplique des secrets en clair ;
- copie dans un ticket, une note ou un message ;
- script de debug qui affiche l'environnement complet ;
- ancien token jamais supprimé après une rotation ;
- machine compromise où tous les secrets locaux sont lisibles d'un coup.

Pour un projet jouet, ce risque peut sembler acceptable. Pour un harness d'agent, il l'est beaucoup moins. Le harness devient un concentrateur de privilèges. S'il possède vos clés de modèles, vos tokens GitHub et vos accès de messagerie, il mérite une vraie stratégie de gestion des secrets.

La question n'est donc pas : « Est-ce que je peux mettre mes clés dans `.env` ? »

La vraie question est : « Quel est le minimum de secret que je dois garder localement pour que mon agent puisse démarrer ? »

Avec Bitwarden Secrets Manager, la réponse devient : un token d'accès machine, limité à un projet, que l'on peut révoquer.

## Bitwarden Secrets Manager en deux idées

![](/20260608-secrets-hermes-bitwarden/02-bootstrap-token.png)

Bitwarden est connu comme gestionnaire de mots de passe. Secrets Manager est son pendant pour les usages techniques : API keys, tokens, identifiants applicatifs, secrets CI/CD, credentials d'agents ou de scripts.

Le modèle repose sur quelques concepts simples.

Un secret est une paire nom, valeur. Exemple : `OPENROUTER_API_KEY` associé à la clé réelle.

Un projet regroupe des secrets par périmètre. Par exemple : `Hermes`, `Blog`, `Production`, `Dev`, ou `Agent local`.

Un machine account est une identité non humaine. Elle sert à donner à une machine, un script ou un agent le droit de lire certains secrets.

Un access token est le jeton utilisé par cette machine pour accéder au projet autorisé. C'est le secret racine. Il ne doit jamais être banalisé, mais il est beaucoup plus simple à protéger qu'une collection de vingt clés API dispersées.

L'intérêt est opérationnel : vous pouvez remplacer, révoquer ou déplacer les secrets depuis Bitwarden sans réécrire toutes les configurations locales. Le harness récupère les secrets au démarrage, puis les injecte dans son environnement d'exécution.

## L'architecture recommandée

![](/20260608-secrets-hermes-bitwarden/03-defense-en-profondeur.png)

L'architecture cible est simple.

Bitwarden devient la source de vérité. Les secrets techniques vivent dans un projet Bitwarden. Hermes ne stocke plus les valeurs sensibles dans son fichier de configuration principal. À la place, il sait comment demander les secrets au démarrage via la CLI Bitwarden Secrets Manager, `bws`.

Sur la machine locale, il reste seulement ce qui permet le bootstrap : le token d'accès du machine account, ainsi que quelques paramètres non sensibles, comme l'URL du serveur Bitwarden ou le nom du projet.

Le schéma mental est le suivant :

1. vous créez les secrets dans Bitwarden ;
2. vous créez un machine account avec accès au projet ;
3. vous générez un access token ;
4. Hermes utilise ce token pour récupérer les secrets ;
5. les secrets sont injectés dans l'environnement du processus ;
6. l'agent fonctionne sans stocker toutes les clés en clair dans ses fichiers.

Le modèle ne supprime pas le risque. Si le token du machine account fuit, les secrets du projet sont exposés. Mais il réduit fortement la surface d'exposition. Au lieu d'avoir des secrets partout, vous avez un point d'entrée contrôlé, révocable et limité.

## Mise en place avec Hermes et Bitwarden

La documentation Hermes propose une intégration dédiée à Bitwarden Secrets Manager. L'objectif est d'éviter les bricolages autour de fichiers `.env` et de rendre le flux suffisamment simple pour un usage quotidien.

Le déroulé recommandé ressemble à ceci.

### 1. Créer un projet Bitwarden

Dans Bitwarden Secrets Manager, créez un projet dédié à Hermes. Évitez de mélanger tous vos secrets personnels et professionnels dans un seul espace. Un projet par usage permet de limiter les dégâts en cas de fuite.

Exemples de projets :

- `Hermes Local` ;
- `Hermes Production` ;
- `Agents IA Dev` ;
- `MCP Services`.

### 2. Ajouter les secrets nécessaires

Ajoutez ensuite les secrets avec des noms compatibles avec les variables d'environnement attendues par vos outils.

Par exemple :

```text
OPENROUTER_API_KEY
ANTHROPIC_API_KEY
GITHUB_TOKEN
TAVILY_API_KEY
TELEGRAM_BOT_TOKEN
```

### 3. Créer un machine account

Créez ensuite un machine account dédié à Hermes. Donnez-lui uniquement les droits nécessaires, idéalement en lecture seule sur le projet concerné.

C'est un point important : ne réutilisez pas un token très large pour tous vos scripts. Un agent local de développement n'a pas besoin d'accéder aux secrets de production d'une application critique.

### 4. Générer l'access token

Générez le token d'accès du machine account. Bitwarden ne l'affiche qu'au moment de la création, il faut donc le copier immédiatement dans l'emplacement de bootstrap prévu.

Ce token devient le seul secret local réellement nécessaire. Il faut le traiter comme une clé maîtresse limitée : pas de commit Git, pas de capture d'écran, pas de partage dans un chat, pas de stockage dans une note non chiffrée.

### 5. Configurer Hermes

![](/20260608-secrets-hermes-bitwarden/05-cheatsheet-cli.png)

La documentation Hermes indique une commande d'assistant dédiée :

```bash
hermes secrets bitwarden setup
```

L'assistant prend en charge la configuration de l'intégration Bitwarden. Selon l'environnement, il peut installer ou utiliser le binaire `bws`, demander le token, puis préparer la récupération des secrets.

Pour vérifier la synchronisation, la documentation mentionne aussi :

```bash
hermes secrets bitwarden sync
```

Puis, pour appliquer l'injection des secrets dans le shell courant :

```bash
hermes secrets bitwarden sync --apply
```

L'idée n'est pas de recopier manuellement toutes les clés dans Hermes. L'idée est que Hermes sache demander à Bitwarden les variables dont il a besoin.

### 6. Lancer l'agent avec des secrets injectés

Pour des scripts ou des harnesses qui n'ont pas d'intégration native, la CLI Bitwarden Secrets Manager peut aussi servir de wrapper d'exécution. Le principe est de lancer une commande dans un environnement où les secrets sont injectés.

La forme générale est :

```bash
bws run -- 'votre_commande'
```

Ou, si vous voulez cibler explicitement un projet :

```bash
bws run --project-id <UUID> -- 'votre_commande'
```

Hermes a l'avantage d'avoir une intégration pensée pour ce cas. Pour d'autres harnesses, ce pattern reste utile : le gestionnaire de secrets devient une couche d'exécution, pas seulement un coffre-fort passif.

## Bonnes pratiques pour un agent harness

![](/20260608-secrets-hermes-bitwarden/04-rotation-flotte-agents.png)

La première bonne pratique est de séparer les périmètres. Un projet Bitwarden pour le développement local, un autre pour la production, un autre pour les tests. Si un token fuit, il ne doit pas ouvrir tout votre monde numérique.

La deuxième est d'utiliser des machine accounts dédiés. Un compte machine par agent ou par famille d'agents permet de révoquer proprement un accès sans casser tous les autres workflows.

La troisième est de documenter les noms de variables, pas leurs valeurs. Votre README peut expliquer que Hermes attend `OPENROUTER_API_KEY` et `GITHUB_TOKEN`. Il ne doit jamais contenir les valeurs.

La quatrième est de faire une rotation périodique. Un secret qui n'a jamais été changé depuis deux ans est probablement devenu un secret partagé, copié, oublié ou sauvegardé ailleurs.

La cinquième est de ne jamais afficher l'environnement complet dans les logs. Beaucoup d'outils de debug affichent trop d'informations. Avec un agent IA, c'est encore plus sensible, car les logs peuvent ensuite être lus, résumés ou envoyés à un modèle.

La sixième est de garder une solution de secours claire. Que se passe-t-il si Bitwarden est indisponible au moment du démarrage ? Est-ce que l'agent doit échouer ? Utiliser un cache ? Refuser les actions sensibles ? Ce choix doit être explicite.

## Ce que Bitwarden ne règle pas

Un gestionnaire de secrets ne transforme pas automatiquement un harness en coffre-fort parfait.

Il ne protège pas contre un agent à qui vous demandez explicitement d'afficher une variable d'environnement sensible. Il ne protège pas non plus contre une machine déjà compromise, capable de lire la mémoire ou d'intercepter les processus.

Il ne remplace pas le principe du moindre privilège. Si vous donnez à Hermes un token GitHub avec tous les droits sur toutes vos organisations, Bitwarden protégera le stockage du token, mais pas l'étendue excessive de ses permissions.

Il ne supprime pas non plus le besoin de surveiller les coûts. Une clé de modèle volée peut générer une facture importante. Même bien stockée, elle doit être associée à des plafonds, alertes et quotas côté fournisseur.

Enfin, il faut rester attentif au risque spécifique des agents : le prompt injection. Un contenu web hostile ne devrait jamais pouvoir convaincre l'agent de révéler ses secrets, de les écrire dans un fichier ou de les envoyer dans une réponse. La gestion des secrets réduit la surface d'exposition, mais elle doit être complétée par des garde-fous de permissions et de filtrage.

## Mon avis : le `.env` doit devenir un outil de transition

Le fichier `.env` reste utile pour prototyper. Mais pour un agent utilisé tous les jours, connecté à plusieurs services, il doit devenir temporaire.

Le bon niveau de maturité est le suivant :

- en local rapide, `.env` peut dépanner ;
- pour un usage régulier, Bitwarden Secrets Manager centralise les secrets ;
- pour un usage d'équipe, chaque agent ou environnement reçoit son propre périmètre ;
- pour la production, les tokens sont minimisés, surveillés, rotatifs et audités.

Hermes va dans le bon sens en proposant une intégration explicite avec Bitwarden. C'est exactement le type de fonctionnalité dont les harnesses d'agents ont besoin, avec moins de magie, plus de contrôle et une meilleure hygiène par défaut.

## Conclusion

Les agents IA locaux ne sont plus de simples scripts. Ce sont des orchestrateurs qui relient modèles, outils, données personnelles et services externes. Les traiter comme des jouets revient à accumuler des secrets en clair dans des coins de disque dur.

Bitwarden Secrets Manager apporte une réponse pragmatique : centraliser les secrets, limiter les accès par projet, utiliser des machine accounts, injecter les variables au runtime et rendre la rotation supportable.

Avec Hermes, cette approche devient accessible sans construire toute une infrastructure Vault. Elle ne dispense pas de gérer les permissions, les logs ou les quotas, mais elle donne une base saine.

La règle simple tient en une phrase. Un harness d'agent ne devrait pas être un album photo de vos clés API. Il devrait savoir où les demander, quand les utiliser et comment fonctionner sans les exposer inutilement.

