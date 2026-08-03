+++
title = "Héberger Vaultwarden sur Coolify et le protéger avec Tailscale"
date = "2026-08-03T14:07:00+01:00"
draft = false
description = "Tutoriel pour héberger Vaultwarden avec Coolify, limiter son accès au réseau Tailscale et obtenir un certificat Let's Encrypt par DNS-01 Cloudflare."
tags = [
  "Vaultwarden",
  "Coolify",
  "Tailscale",
  "Sécurité",
  "Traefik",
  "Cloudflare",
  "Auto-hébergement"
]
categories = [ "Sécurité" ]
preview = "/20260803-vaultwarden-coolify-tailscale/architecture-vaultwarden-coolify-tailscale.png"
+++

Un gestionnaire de mots de passe concentre des données particulièrement sensibles. Même si le coffre est chiffré, son exposition publique laisse une surface d'attaque permanente : tentatives de connexion, recherche de vulnérabilités, exploitation d'une version obsolète, attaques contre l'interface d'administration et collecte d'informations sur les comptes.

L'auto-hébergement ajoute une autre responsabilité. Une erreur de proxy, un port Docker publié par mégarde ou un certificat mal configuré peut exposer le service sans que l'interface de Coolify le montre clairement. Un domaine qui répond en HTTPS ne prouve pas non plus que l'accès est correctement limité.

J'ai donc choisi de rendre mon instance Vaultwarden accessible uniquement depuis mon réseau Tailscale. Je conserve une adresse simple, `https://<vaultwarden-public-dname>`, mais son enregistrement DNS pointe vers l'adresse Tailscale du serveur. Les clients Bitwarden utilisent une URL HTTPS classique tandis que le serveur reste hors de portée depuis Internet.

Cette configuration demande une adaptation pour le certificat TLS. Let's Encrypt ne peut pas valider une adresse Tailscale avec le challenge HTTP habituel. La solution consiste à ajouter un second résolveur ACME à Traefik et à utiliser un challenge DNS-01 chez Cloudflare.

![Architecture de Vaultwarden hébergé dans Coolify, accessible par Tailscale et protégé par un certificat Let's Encrypt obtenu avec DNS-01 Cloudflare.](/20260803-vaultwarden-coolify-tailscale/architecture-vaultwarden-coolify-tailscale.png)

## Architecture retenue

Le chemin suivi par une requête est le suivant :

```text
Application ou extension Bitwarden
        |
        | connexion Tailscale
        v
<vaultwarden-public-dname>
        |
        | DNS A vers une adresse 100.x.x.x
        v
Traefik sur le serveur Coolify
        |
        | réseau Docker privé
        v
Conteneur Vaultwarden
```

Les choix importants sont les suivants :

- Vaultwarden reste hébergé comme service Coolify ;
- le domaine public pointe vers l'adresse Tailscale du serveur ;
- l'enregistrement Cloudflare fonctionne en mode `DNS only` ;
- Traefik continue d'utiliser HTTP-01 pour les domaines publics habituels ;
- un second résolveur nommé `cloudflare` utilise DNS-01 pour Vaultwarden ;
- un routeur dynamique prioritaire associe `<vaultwarden-public-dname>` au résolveur Cloudflare ;
- le certificat DNS-01 est stocké dans un fichier ACME séparé.

Le nom existe publiquement dans le DNS. Son adresse appartient toutefois à la plage `100.64.0.0/10`, utilisée par Tailscale et non routable depuis Internet. Un appareil doit rejoindre le tailnet avant de pouvoir atteindre le serveur.

## Prérequis

Il faut disposer de :

- Vaultwarden déjà déployé dans Coolify avec un volume persistant sur `/data` ;
- Tailscale installé et connecté sur le serveur Coolify ;
- un domaine géré par Cloudflare ;
- un accès SSH au serveur ;
- un compte administrateur sur Coolify ;
- une sauvegarde récente de Vaultwarden.

Tous les appareils qui utilisent Bitwarden devront également se connecter à Tailscale. Cela concerne les extensions de navigateur, les applications de bureau et les téléphones.

## Sauvegarder Vaultwarden avant de modifier le proxy

Pour une installation Vaultwarden avec SQLite, la commande de sauvegarde intégrée crée une copie cohérente de la base :

```bash
docker exec <conteneur-vaultwarden> /vaultwarden backup
```

Vérifiez ensuite que le fichier annoncé existe et contient des données :

```bash
docker exec <conteneur-vaultwarden> \
  stat -c '%n %s bytes' /data/db_<date>.sqlite3
```

Cette copie protège la base SQLite. Une sauvegarde complète doit aussi inclure le volume `/data`, car il contient notamment les pièces jointes et les clés nécessaires à une restauration.

L'article [Bitwarden 2026.7.0 bloqué sur Loading avec Vaultwarden, la cause et la solution](/posts/2026-07-29-bitwarden-2026-7-0-loading-vaultwarden-solution/) décrit plus en détail la sauvegarde et la mise à jour d'une instance Vaultwarden dans Coolify.

## Étape 1, connecter le serveur à Tailscale

Sur le serveur Coolify, vérifiez que Tailscale fonctionne :

```bash
tailscale status
tailscale ip -4
```

La deuxième commande retourne une adresse de ce type :

```text
100.x.x.x
```

Cette adresse doit rester stable pour le nœud concerné. Il est également utile de donner un nom explicite au serveur dans l'administration Tailscale et de vérifier qu'il n'utilise pas une clé de nœud arrivée à expiration.

## Étape 2, créer le domaine privé dans Cloudflare

Dans la zone DNS Cloudflare, créez un enregistrement `A` :

```text
Type : A
Nom  : <vaultwarden-public-dname>
Cible: 100.x.x.x
Proxy: DNS only
```

Le nuage doit rester gris. Le proxy Cloudflare ne peut pas joindre directement l'adresse privée Tailscale et son activation changerait le chemin réseau.

Vérifiez l'enregistrement :

```bash
dig +short A <vaultwarden-public-dname>
```

Le résultat doit être l'adresse Tailscale du serveur.

Évitez d'ajouter un enregistrement `AAAA` vers l'adresse IPv6 publique du serveur. Une telle entrée pourrait offrir un chemin d'accès qui contourne Tailscale.

## Étape 3, configurer le domaine dans Vaultwarden

Dans les variables d'environnement du service Vaultwarden, définissez :

```env
DOMAIN=https://<vaultwarden-public-dname>
```

Dans Coolify, associez également le domaine au service afin que le proxy rejoigne le bon réseau Docker. Redéployez Vaultwarden puis vérifiez que le conteneur répond depuis le proxy.

Le nom du conteneur peut être retrouvé avec :

```bash
docker ps --format '{{.Names}}\t{{.Image}}' | grep vaultwarden
```

Dans mon installation, le proxy Traefik et Vaultwarden partagent un réseau Docker créé par Coolify. Le routeur dynamique pourra donc joindre Vaultwarden par son nom de conteneur sur le port 80.

## Pourquoi le certificat Let's Encrypt échoue au départ

Coolify configure normalement Traefik avec un résolveur ACME basé sur HTTP-01 :

```yaml
- '--certificatesresolvers.letsencrypt.acme.httpchallenge=true'
- '--certificatesresolvers.letsencrypt.acme.storage=/traefik/acme.json'
- '--certificatesresolvers.letsencrypt.acme.httpchallenge.entrypoint=http'
```

Cette méthode demande aux serveurs de Let's Encrypt de charger une URL sous :

```text
http://<vaultwarden-public-dname>/.well-known/acme-challenge/...
```

Le domaine pointe vers une adresse Tailscale. Let's Encrypt la considère comme une adresse non publique et retourne une erreur semblable à celle-ci :

```text
no valid A records found for <vaultwarden-public-dname>
no valid AAAA records found for <vaultwarden-public-dname>
```

Traefik présente alors son certificat autosigné de secours :

```text
CN=TRAEFIK DEFAULT CERT
```

Le routage peut fonctionner avec un code HTTP 200 lorsque la vérification TLS est désactivée, mais les applications Bitwarden refuseront ce certificat. Il ne faut pas contourner durablement l'erreur avec l'option `-k` de `curl`.

## Étape 4, créer un jeton DNS Cloudflare

Dans Cloudflare, créez un API Token limité à la zone utilisée par Vaultwarden.

Accordez uniquement ces permissions :

```text
Zone / DNS / Edit
Zone / Zone / Read
```

Limitez la ressource à :

```text
Include / Specific zone / <domaine>
```

Évitez la clé API globale. Le jeton DNS peut modifier les enregistrements de la zone, il mérite donc des droits minimaux.

Sur le serveur, stockez-le dans un fichier protégé :

```bash
install -m 600 /dev/null /data/coolify/proxy/.env
nano /data/coolify/proxy/.env
```

Contenu :

```env
CF_DNS_API_TOKEN=<jeton-cloudflare>
```

Vérifiez les permissions sans afficher le secret :

```bash
stat -c '%a %U:%G %n' /data/coolify/proxy/.env
```

Le résultat attendu est :

```text
600 root:root /data/coolify/proxy/.env
```

## Étape 5, ajouter un second résolveur ACME à Traefik

Le résolveur `letsencrypt` existant reste en place pour les services publics. Le nouveau résolveur s'appelle `cloudflare` et utilise son propre fichier de stockage.

Préparez ce fichier :

```bash
install -m 600 /dev/null /data/coolify/proxy/acme-cloudflare.json
```

Sauvegardez ensuite la configuration du proxy :

```bash
cp -a \
  /data/coolify/proxy/docker-compose.yml \
  /data/coolify/proxy/docker-compose.yml.before-cloudflare-dns01
```

Dans Coolify, ouvrez :

```text
Servers > votre serveur > Proxy > Configuration
```

Ajoutez le fichier d'environnement au service Traefik :

```yaml
services:
  traefik:
    env_file:
      - /data/coolify/proxy/.env
```

Conservez les lignes du résolveur HTTP existant et ajoutez celles du résolveur Cloudflare :

```yaml
- '--certificatesresolvers.cloudflare.acme.email=<adresse-email>'
- '--certificatesresolvers.cloudflare.acme.storage=/traefik/acme-cloudflare.json'
- '--certificatesresolvers.cloudflare.acme.dnschallenge=true'
- '--certificatesresolvers.cloudflare.acme.dnschallenge.provider=cloudflare'
- '--certificatesresolvers.cloudflare.acme.dnschallenge.resolvers=1.1.1.1:53,1.0.0.1:53'
- '--certificatesresolvers.cloudflare.acme.dnschallenge.delaybeforecheck=5'
```

Validez le Compose :

```bash
cd /data/coolify/proxy
docker compose config -q
```

Une commande silencieuse indique que la syntaxe est valide. Recréez ensuite le proxy depuis Coolify ou en ligne de commande :

```bash
docker compose up -d traefik
```

Vérifiez son état :

```bash
docker inspect \
  --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}' \
  coolify-proxy
```

Le résultat attendu est `healthy`.

## Étape 6, créer un routeur dynamique pour Vaultwarden

Coolify génère un routeur Docker qui utilise le résolveur `letsencrypt`. J'ai choisi de ne pas remplacer ce résolveur global, car d'autres domaines publics en dépendent.

Traefik était déjà configuré pour surveiller le répertoire :

```text
/data/coolify/proxy/dynamic/
```

J'y ai créé un routeur prioritaire :

```bash
nano /data/coolify/proxy/dynamic/tailwarden.yaml
```

Contenu :

```yaml
http:
  routers:
    tailwarden-cloudflare:
      rule: 'Host("<vaultwarden-public-dname>")'
      entryPoints:
        - https
      priority: 1000
      service: tailwarden-cloudflare
      tls:
        certResolver: cloudflare
      middlewares:
        - tailwarden-compress

  services:
    tailwarden-cloudflare:
      loadBalancer:
        servers:
          - url: "http://<conteneur-vaultwarden>:80"

  middlewares:
    tailwarden-compress:
      compress: {}
```

Remplacez `<conteneur-vaultwarden>` par le nom réel du conteneur.

La priorité `1000` place ce routeur devant celui généré automatiquement par Coolify pour le même domaine. Le certificat demandé par le résolveur `cloudflare` entre ensuite dans le magasin TLS de Traefik.

Traefik surveille les fichiers dynamiques. Il devrait charger le routeur sans redémarrage. Un redémarrage unique permet de relancer proprement la détection si nécessaire :

```bash
docker restart coolify-proxy
```

## Étape 7, suivre le challenge DNS-01

Consultez les logs sans afficher les secrets :

```bash
docker logs --since 5m coolify-proxy 2>&1 \
  | grep -Ei 'tailwarden|cloudflare|acme|certificate|challenge|error'
```

Traefik crée temporairement un enregistrement TXT :

```text
_acme-challenge.<vaultwarden-public-dname>
```

Let's Encrypt vérifie cet enregistrement puis délivre le certificat. Traefik enregistre le compte ACME et le certificat dans :

```text
/data/coolify/proxy/acme-cloudflare.json
```

Ne publiez jamais le contenu de ce fichier. Il contient la clé privée du certificat.

Vérifiez seulement sa taille et ses permissions :

```bash
stat -c '%s bytes, mode %a, %U:%G' \
  /data/coolify/proxy/acme-cloudflare.json
```

Le fichier doit contenir des données et rester en mode `600`.

## Étape 8, vérifier le certificat et l'application

Depuis un appareil connecté à Tailscale :

```bash
openssl s_client \
  -connect <vaultwarden-public-dname>:443 \
  -servername <vaultwarden-public-dname> \
  </dev/null 2>/dev/null \
  | openssl x509 \
      -noout \
      -subject \
      -issuer \
      -dates \
      -ext subjectAltName
```

Le certificat doit contenir :

```text
DNS:<vaultwarden-public-dname>
```

L'émetteur doit être Let's Encrypt. `TRAEFIK DEFAULT CERT` ne doit plus apparaître.

Testez ensuite l'URL sans désactiver la validation TLS :

```bash
curl -I https://<vaultwarden-public-dname>
```

Dans mon cas, le résultat final était :

```text
HTTP 200
Certificat Let's Encrypt valide
Nom couvert : <vaultwarden-public-dname>
Accès par l'adresse Tailscale du serveur
```

Depuis un appareil qui n'est pas connecté à Tailscale, la connexion doit échouer ou expirer.

## Configurer les clients Bitwarden

Dans chaque application Bitwarden, choisissez l'option d'auto-hébergement puis utilisez :

```text
https://<vaultwarden-public-dname>
```

Faites cette modification dans :

- les extensions de navigateur ;
- les applications de bureau ;
- les applications mobiles ;
- les éventuels scripts qui appellent l'API Vaultwarden.

Sur mobile, autorisez Tailscale à fonctionner en arrière-plan. Certains systèmes coupent les VPN lorsque l'économie de batterie est agressive. Le coffre déjà synchronisé reste utilisable hors ligne, mais les nouvelles modifications attendront le retour de la connexion Tailscale.

## Restreindre aussi les membres du tailnet

Une adresse Tailscale protège le service contre Internet. Les règles d'accès du tailnet déterminent ensuite quels membres peuvent atteindre le serveur.

Pour une installation familiale ou professionnelle, attribuez un tag au nœud Vaultwarden et créez une règle limitée aux utilisateurs autorisés. Le principe ressemble à ceci :

```json
{
  "groups": {
    "group:vault-users": [
      "utilisateur@example.com"
    ]
  },
  "tagOwners": {
    "tag:vault": [
      "autogroup:admin"
    ]
  },
  "grants": [
    {
      "src": ["group:vault-users"],
      "dst": ["tag:vault"],
      "ip": ["tcp:443"]
    }
  ]
}
```

Adaptez cette politique au modèle de contrôle d'accès utilisé dans votre tailnet et testez-la avec un second compte avant de fermer l'accès à l'administrateur principal.

## Nettoyer les anciens certificats ACME

Au fil des créations et suppressions de services, `/data/coolify/proxy/acme.json` peut conserver des certificats pour d'anciens domaines. Traefik tente alors de les renouveler et remplit les logs avec des erreurs `NXDOMAIN` ou `unauthorized`.

Avant tout nettoyage, listez les domaines actifs dans les labels Docker et les fichiers dynamiques. Inspectez ensuite uniquement les noms enregistrés dans le fichier ACME :

```bash
jq -r '.[]?.Certificates[]? | .domain.main' \
  /data/coolify/proxy/acme.json \
  | sort -u
```

N'affichez jamais les champs qui contiennent les certificats encodés ou les clés privées.

Dans mon cas, le fichier historique contenait 41 certificats. Après comparaison avec les routes actives, j'en ai conservé uniquement 2.

Le certificat de Vaultwarden reste dans `acme-cloudflare.json`, il n'est donc pas touché par ce nettoyage.

La procédure sûre consiste à :

1. créer une sauvegarde horodatée de `acme.json` ;
2. produire avec `jq` un nouveau JSON qui conserve le compte ACME et les certificats actifs ;
3. valider le nombre et les domaines du fichier candidat ;
4. arrêter brièvement Traefik pour éviter une écriture concurrente ;
5. installer le fichier avec le mode `600` ;
6. redémarrer Traefik ;
7. contrôler chaque domaine HTTPS et les logs postérieurs au redémarrage.

Une suppression complète de `acme.json` force la réémission de tous les certificats. Elle augmente le risque d'indisponibilité et d'atteinte des limites de Let's Encrypt. Le filtrage prudent est préférable.

## Durcir Vaultwarden au-delà du réseau

Tailscale réduit fortement l'exposition, mais les protections applicatives restent utiles :

- désactiver les inscriptions avec `SIGNUPS_ALLOWED=false` ;
- protéger fortement ou désactiver `/admin` ;
- activer la double authentification sur chaque compte ;
- épingler une version de Vaultwarden et planifier les mises à jour ;
- sauvegarder régulièrement `/data` hors du serveur ;
- tester une restauration ;
- vérifier qu'aucun port Vaultwarden n'est publié sur `0.0.0.0` ;
- surveiller les notes de version de Vaultwarden et des clients Bitwarden.

Le réseau privé limite les personnes capables de contacter l'application. Il ne corrige pas une base non sauvegardée, une version vulnérable ou un compte sans double authentification.

## Dépannage rapide

### Traefik présente son certificat par défaut

Inspectez le certificat :

```bash
openssl s_client \
  -connect <vaultwarden-public-dname>:443 \
  -servername <vaultwarden-public-dname> \
  </dev/null 2>/dev/null \
  | openssl x509 -noout -subject -issuer
```

Si le sujet contient `TRAEFIK DEFAULT CERT`, vérifiez :

- la syntaxe de la règle `Host` ;
- le nom du `certResolver` ;
- la présence du jeton Cloudflare dans le conteneur Traefik ;
- les permissions du fichier ACME ;
- les logs du fournisseur dynamique.

### Le fichier ACME Cloudflare reste vide

Les causes les plus fréquentes sont :

- le routeur dynamique n'est pas chargé ;
- la règle YAML est invalide ;
- le jeton ne possède pas `DNS Edit` et `Zone Read` ;
- le jeton cible une autre zone ;
- Traefik n'a pas été recréé après l'ajout du résolveur statique.

### Vaultwarden retourne une erreur depuis le proxy

Vérifiez le nom du conteneur et la connectivité depuis Traefik :

```bash
docker exec coolify-proxy \
  wget -qSO- --timeout=5 \
  http://<conteneur-vaultwarden>:80/ \
  -O /dev/null
```

Une réponse `HTTP/1.1 200 OK` confirme que le proxy atteint le backend.

### L'URL fonctionne sans Tailscale

Contrôlez les points suivants :

- le domaine ne pointe pas vers l'adresse publique du serveur ;
- aucun enregistrement `AAAA` public n'existe ;
- Cloudflare reste en mode `DNS only` ;
- aucun port Vaultwarden n'est publié directement ;
- aucune autre route publique ne cible le même conteneur.

## Résultat

Cette architecture permet d'utiliser une adresse mémorisable avec les clients Bitwarden tout en réservant le chemin réseau aux appareils connectés à Tailscale. Le certificat reste publiquement reconnu grâce au challenge DNS-01 et les autres applications Coolify continuent d'utiliser le résolveur HTTP-01 habituel.

Le point qui m'a demandé le plus d'attention était la séparation des rôles. Tailscale contrôle l'accès réseau. Traefik termine la connexion HTTPS et route la requête. Cloudflare sert uniquement à prouver la propriété du domaine pendant le challenge DNS. Vaultwarden reste derrière ces couches avec son volume persistant et ses propres protections.

Pour la gestion des secrets utilisés par des agents locaux, consultez aussi [Gérer les secrets de ses agents IA avec Bitwarden et Hermes](/posts/2026-06-08-gerer-secrets-agents-ia-hermes-bitwarden/).

## Sources

- [Vaultwarden, dépôt officiel](https://github.com/dani-garcia/vaultwarden)
- [Tailscale, comprendre les adresses 100.x](https://tailscale.com/kb/1015/100.x-addresses)
- [Traefik, challenge ACME DNS](https://doc.traefik.io/traefik/https/acme/#dnschallenge)
- [Traefik, fournisseur de configuration par fichiers](https://doc.traefik.io/traefik/providers/file/)
- [Cloudflare, créer un API Token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/)
- [Coolify, documentation](https://coolify.io/docs/)
