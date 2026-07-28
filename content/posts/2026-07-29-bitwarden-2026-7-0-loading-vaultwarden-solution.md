+++
title = "Bitwarden 2026.7.0 bloqué sur Loading avec Vaultwarden, la cause et la solution"
date = "2026-07-28T23:29:56.081Z"
draft = false
description = "L'extension Bitwarden 2026.7.0 peut rester bloquée sur Loading avec Vaultwarden 1.36.0. Voici l'origine du problème et la procédure pour le corriger sans perdre son coffre."
tags = [
  "Bitwarden",
  "Vaultwarden",
  "Firefox",
  "Dépannage",
  "Auto-hébergement"
]
categories = [ "Sécurité" ]
preview = "/20260729-bitwarden-vaultwarden-loading/bitwarden-vaultwarden-2026-7-loading-solution.png"
+++

L'extension Bitwarden pour Firefox fonctionnait normalement avec mon serveur Vaultwarden auto-hébergé. Puis, après une mise à jour, son interface a commencé à rester bloquée sur les indicateurs de chargement. La connexion au compte réussissait, mais aucun élément du coffre ne s'affichait.

Le problème ne venait ni de Firefox, ni du réseau, ni d'une corruption des mots de passe. Il s'agissait d'une incompatibilité de format entre l'extension Bitwarden 2026.7.0 et Vaultwarden 1.36.0.

La correction tient en deux opérations. Il faut mettre Vaultwarden à jour vers la version 1.37.0 ou une version ultérieure, puis réinitialiser le stockage local de l'extension si elle conserve encore les anciennes données synchronisées.

Voici comment identifier le problème, comprendre son origine et le résoudre sans toucher au contenu du coffre stocké sur le serveur.

![Infographie expliquant le blocage de Bitwarden 2026.7.0 avec Vaultwarden 1.36.0, le conflit de format Cipher.data et la mise à jour vers Vaultwarden 1.37.0.](/20260729-bitwarden-vaultwarden-loading/bitwarden-vaultwarden-2026-7-loading-solution.png)

## Les symptômes

Dans mon cas, la configuration concernée était la suivante :

- Firefox 153.0.1 installé avec Flatpak ;
- extension Bitwarden 2026.7.0 ;
- serveur Vaultwarden 1.36.0 ;
- Web Vault 2026.4.1 ;
- instance Vaultwarden déployée avec Coolify.

L'extension présentait plusieurs symptômes caractéristiques :

- l'authentification fonctionnait ;
- le serveur répondait correctement en HTTPS ;
- la synchronisation semblait démarrer ;
- la liste du coffre restait sur son squelette de chargement ;
- fermer puis rouvrir l'interface ne changeait rien.

Le Web Vault et l'application Bitwarden pouvaient continuer à fonctionner. Ce comportement pouvait donc donner l'impression que le problème venait uniquement de Firefox.

## L'erreur qui révèle la cause

Les journaux Bitwarden contenaient cette erreur :

```text
invalid type: JsValue(Object(...)), expected a string
```

Cette ligne est importante. Le client recevait bien les données, mais il ne parvenait pas à les interpréter. Il trouvait un objet JSON à un emplacement où son nouveau modèle de données attendait une chaîne de caractères.

Le chargement infini était seulement la conséquence visible de cet échec de désérialisation.

## Pourquoi Bitwarden 2026.7.0 et Vaultwarden 1.36.0 étaient incompatibles

Vaultwarden reproduit l'API du serveur Bitwarden officiel. Cette compatibilité demande de suivre les évolutions des clients Bitwarden, y compris lorsque le format des réponses change.

Vaultwarden 1.36.0 conservait un ancien mécanisme de compatibilité. Pour chaque élément du coffre, sa réponse pouvait inclure un champ `data` contenant un objet avec plusieurs propriétés chiffrées :

```json
{
  "data": {
    "name": "...",
    "username": "...",
    "password": "...",
    "uris": []
  }
}
```

Ce champ historique n'était plus nécessaire pour les clients modernes, mais il restait présent afin de prendre en charge d'anciennes versions.

En juin 2026, Bitwarden a donné une nouvelle fonction à ce même champ. Dans le cadre du chiffrement de données sous forme de blob, `Cipher.data` est devenu une chaîne chiffrée facultative :

```typescript
data?: string;
```

L'extension Bitwarden 2026.7.0 et son SDK WebAssembly appliquent ce nouveau modèle. Lorsqu'ils recevaient la réponse de Vaultwarden 1.36.0, ils tentaient donc de lire `data` comme une chaîne. Vaultwarden envoyait encore un objet.

Le SDK interrompait alors le traitement de l'élément. La requête de synchronisation pouvait répondre avec un code HTTP 200, mais l'extension ne parvenait pas à construire la liste du coffre.

## La correction apportée par Vaultwarden 1.37.0

La version 1.37.0 de Vaultwarden supprime l'ancien champ `data` généré pour assurer la rétrocompatibilité. Les données spécifiques aux différents types d'éléments continuent d'être transmises dans les structures attendues, comme `login`, `card`, `identity` ou `secureNote`.

La note de version de Vaultwarden 1.37.0 indique explicitement que cette mise à jour est nécessaire pour les clients Bitwarden 2026.7.0 et suivants.

La mise à jour serveur constitue donc la correction principale. Effacer le cache de Firefox sans mettre à jour Vaultwarden ne suffit pas, car l'extension récupérera de nouveau une réponse incompatible lors de la synchronisation suivante.

## Étape 1, sauvegarder Vaultwarden

Avant toute mise à jour, créez une sauvegarde de la base et vérifiez qu'elle existe réellement.

Vaultwarden possède une commande de sauvegarde intégrée pour les installations utilisant SQLite. Le nom exact du conteneur dépend de votre déploiement :

```bash
docker exec vaultwarden /vaultwarden backup
```

La commande doit confirmer la création d'un fichier de ce type :

```text
/data/db_20260728_222403.sqlite3
```

Vérifiez ensuite que le fichier est présent et non vide :

```bash
docker exec vaultwarden stat -c '%n %s bytes' /data/db_20260728_222403.sqlite3
```

Adaptez le nom du fichier à celui retourné par la commande de sauvegarde. Si votre conteneur ne s'appelle pas `vaultwarden`, retrouvez son nom avec `docker ps`.

Cette sauvegarde protège la base SQLite. Pensez aussi à sauvegarder régulièrement le volume `/data`, car il peut contenir les pièces jointes, les clés et d'autres fichiers utiles à une restauration complète.

## Étape 2, mettre Vaultwarden à jour

### Avec Docker Compose

Si votre fichier Compose utilise une image récente de Vaultwarden, téléchargez la nouvelle image puis recréez le service :

```bash
docker compose pull vaultwarden
docker compose up -d vaultwarden
```

Vérifiez ensuite la version réellement exécutée :

```bash
docker exec vaultwarden /vaultwarden --version
```

Le résultat doit indiquer au minimum :

```text
Vaultwarden 1.37.0
```

Utiliser le tag `latest` facilite la mise à jour, mais rend la version déployée moins explicite dans la configuration. Pour un environnement sensible, épingler une version puis organiser les mises à jour reste plus prévisible.

### Avec Coolify

Dans Coolify :

1. ouvrez le service Vaultwarden ;
2. vérifiez que le volume persistant est bien monté sur `/data` ;
3. déclenchez une sauvegarde ;
4. demandez le téléchargement de la dernière image ;
5. redémarrez ou redéployez le service ;
6. attendez que son état redevienne sain ;
7. vérifiez la version depuis le terminal du conteneur avec `/vaultwarden --version`.

Dans mon cas, le passage de Vaultwarden 1.36.0 à 1.37.0 a aussi mis le Web Vault à jour de 2026.4.1 vers 2026.6.4. Le service a ensuite retrouvé l'état `running:healthy` et plusieurs tests HTTPS consécutifs ont répondu avec un code 200.

## Étape 3, tester l'extension Bitwarden

Après la mise à jour du serveur :

1. fermez le panneau de l'extension ;
2. rouvrez-le ;
3. verrouillez puis déverrouillez le coffre si nécessaire ;
4. lancez une synchronisation manuelle.

Dans beaucoup de cas, la liste doit réapparaître immédiatement.

Si l'interface reste bloquée, l'extension conserve probablement un état local créé avec l'ancienne réponse du serveur.

## Étape 4, réinitialiser les données locales de l'extension

Commencez par la méthode la moins intrusive :

1. ouvrez `about:addons` dans Firefox ;
2. désactivez Bitwarden ;
3. réactivez l'extension ;
4. reconnectez-vous au serveur auto-hébergé si nécessaire.

Vous pouvez aussi ouvrir `about:debugging#/runtime/this-firefox`, repérer Bitwarden puis utiliser le bouton de rechargement de l'extension.

Si le chargement persiste, supprimez puis réinstallez l'extension depuis Mozilla Add-ons. Cette opération efface généralement son stockage local et impose une nouvelle connexion. Elle ne supprime pas les éléments enregistrés sur le serveur Vaultwarden.

Avant une suppression ou une manipulation manuelle du profil Firefox, assurez-vous de connaître :

- l'adresse de votre serveur Vaultwarden ;
- votre adresse de connexion ;
- votre mot de passe maître ;
- votre méthode de double authentification ;
- l'emplacement d'une sauvegarde récente du serveur.

Sur une installation avancée, on peut aussi fermer Firefox, sauvegarder uniquement les répertoires de stockage associés à l'identifiant interne de l'extension Bitwarden puis les déplacer hors du profil. Cette méthode demande d'identifier correctement l'UUID interne de l'extension. Une erreur de chemin pourrait toucher les données d'une autre extension, je recommande donc la réinstallation depuis `about:addons` pour la plupart des utilisateurs.

Dans mon cas, la mise à jour serveur a corrigé le format des nouvelles réponses. Une réinitialisation du stockage IndexedDB de Bitwarden a ensuite forcé une synchronisation complète. La liste s'est affichée normalement après la reconnexion.

## Ce qu'il ne faut pas faire

Plusieurs actions semblent logiques, mais ne traitent pas la cause principale :

- réinstaller entièrement Firefox avant d'avoir vérifié la version de Vaultwarden ;
- effacer tout le profil Firefox et perdre les données des autres extensions ;
- conclure à une corruption du coffre parce que l'interface reste vide ;
- modifier les éléments depuis plusieurs clients pendant le diagnostic ;
- rester durablement sur une ancienne extension sans planifier la mise à jour du serveur ;
- restaurer une ancienne base Vaultwarden alors que les données sont encore accessibles dans le Web Vault.

Le retour temporaire à l'extension Bitwarden 2026.6.1 pouvait contourner le problème. Cette solution était utile en attendant la publication de Vaultwarden 1.37.0, mais elle laisse le navigateur sur une version plus ancienne. La mise à jour du serveur reste préférable.

## Comment éviter ce type de panne

Un serveur compatible avec Bitwarden doit être mis à jour en coordination avec ses clients. Les extensions de navigateur se mettent souvent à jour automatiquement, parfois avant le serveur auto-hébergé.

Quelques pratiques réduisent le risque :

- surveiller les notes de version de Vaultwarden ;
- sauvegarder la base avant chaque mise à jour ;
- vérifier la version réellement exécutée, pas seulement le tag Docker ;
- conserver une procédure de retour arrière ;
- tester les nouvelles versions avec un second navigateur ou un profil Firefox séparé ;
- ne pas confondre une réponse HTTP réussie avec une synchronisation exploitable ;
- consulter la console de l'extension lorsque l'interface reste bloquée.

L'erreur `expected a string` orientait directement vers un problème de schéma. Ce type de message est plus utile qu'un simple écran de chargement, car il montre que le transport réseau fonctionne et que l'échec se produit lors de l'interprétation des données.

## Conclusion

Le blocage de Bitwarden 2026.7.0 sur `Loading` avec Vaultwarden 1.36.0 provenait d'une collision autour du champ JSON `Cipher.data`. Vaultwarden l'envoyait encore comme un objet historique. Le nouveau client Bitwarden l'utilisait comme une chaîne destinée au chiffrement par blob.

Vaultwarden 1.37.0 a supprimé l'ancien comportement et restauré la compatibilité avec les clients Bitwarden 2026.7.0 et suivants.

La procédure de résolution est donc claire :

1. sauvegarder Vaultwarden ;
2. mettre le serveur à jour vers la version 1.37.0 ou une version ultérieure ;
3. vérifier la version et l'état du service ;
4. relancer l'extension ;
5. réinitialiser son stockage local si elle reste bloquée.

Cette panne n'impliquait aucune perte du coffre. Les données chiffrées étaient toujours présentes sur le serveur. Le client ne savait simplement plus interpréter une propriété dont le sens venait de changer.

Pour aller plus loin sur l'usage de Bitwarden et Vaultwarden avec des agents locaux, consultez [Gérer les secrets de ses agents IA avec Bitwarden et Hermes](/posts/2026-06-08-gerer-secrets-agents-ia-hermes-bitwarden/).

## Sources

- [Vaultwarden 1.37.0, notes de version](https://github.com/dani-garcia/vaultwarden/releases/tag/1.37.0)
- [Vaultwarden PR #7434, Remove old compatibility code](https://github.com/dani-garcia/vaultwarden/pull/7434)
- [Vaultwarden issue #7462, clients 2026.7.0 sans éléments affichés](https://github.com/dani-garcia/vaultwarden/issues/7462)
- [Bitwarden PR #20765, ajout de Cipher.data pour le chiffrement par blob](https://github.com/bitwarden/clients/pull/20765)
- [Bitwarden issue #22033, extension Firefox 2026.7.0 et Vaultwarden](https://github.com/bitwarden/clients/issues/22033)
