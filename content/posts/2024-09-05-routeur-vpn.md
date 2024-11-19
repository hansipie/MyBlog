---
title: Routeur VPN
description: Une procédure complète pour mettre en place un routeur VPN à partir d'un Raspberry Pi.
date: 2024-09-05T13:25:06.970Z
preview: ""
draft: false
tags:
   - network
   - raspberry
   - vpn
categories: []
---

Il existe dans le commerce des routeurs VPN prêts à l'emploi (exemple: le Asus RT-AX86U Pro), mais ils peuvent être coûteux et ne pas offrir autant de flexibilité que la création de votre propre routeur VPN à l'aide d'un Raspberry Pi, à moindre coût.

Dans ce tuto, je vais vous montrer comment transformer un Raspberry Pi en un client VPN matériel. Cette configuration vous permettra de router le trafic réseau de tous vos appareils à travers un serveur VPN à l'aide d'un Raspberry Pi.

![](/Capture%20d'écran%202024-09-11%20090234.png)

# Pré-requis:
- Un Raspberry Pi
- Un carte microSD (8GB ou plus) pour Raspbian OS
- Un dongle USB Wifi
- Un accès internet
- Un fournisseur de VPN avec un fichier de configuration `.ovpn` (Un serveur OpenVPN auto-hébergé ou un service comme NordVPN, CyberGhost, etc.)
![](/20240910_154853.jpg)

# Etape 1. Installation de l'OS sur le Raspberry Pi

## a. Téléchargement de Raspberry Pi OS
1. **Téléchargez** Raspberry Pi OS (Lite version recommandée pour un usage de routeur) depuis le site officiel [Raspberry Pi](https://www.raspberrypi.org/software/operating-systems/).
2. **Flash l'image** sur une carte microSD en utilisant un outil comme **Raspberry Pi Imager** ou **Balena Etcher**.

## b. Configuration initiale
1. **Insérez** la carte microSD dans le Raspberry Pi et démarrez-le.
2. **Connectez-vous** via SSH (ou directement avec clavier et écran) :
   - Par défaut, le nom d'utilisateur est `pi` et le mot de passe est `raspberry`.
3. **Changez le mot de passe** par défaut pour des raisons de sécurité :
   ```bash
   passwd
   ```
4. **Mettez à jour** les packages du système :
   ```bash
   sudo apt-get update && sudo apt-get upgrade -y
   ```


# Etape 2. Installation du daemon OpenVPN

## a. Installation d'OpenVPN
1. **Installez OpenVPN** :
   ```bash
   sudo apt-get install openvpn -y
   ```

## b. Configuration d'OpenVPN
1. **Copiez** ou créez un fichier de configuration `.ovpn` pour le serveur VPN auquel vous souhaitez vous connecter. Ce fichier contient les paramètres de connexion, les certificats et les clés nécessaires. Il est fourni par votre fournisseur de VPN.
2. **Placez le fichier** de configuration dans le répertoire `/etc/openvpn/` et renommez-le en `client.conf` pour qu'OpenVPN le détecte automatiquement :
   ```bash
   sudo cp /path/to/your/client.ovpn /etc/openvpn/client.conf
   ```
3. **Démarrez OpenVPN** :
   ```bash
   sudo systemctl start openvpn@client
   ```
4. **Vérifiez le statut** d'OpenVPN pour vous assurer qu'il est connecté :
   ```bash
   sudo systemctl status openvpn@client
   ```


# Etape 3. Mise en place du routage

Pour permettre au Raspberry Pi de router le trafic entre les interfaces `eth0` (le réseau local) et `tun0` (connexion VPN), nous devons activer le routage IP et configurer le NAT (Network Address Translation).

## a. Activer le routage IP
1. **Activez le routage IP** sur le Raspberry Pi :
   ```bash
   sudo sysctl -w net.ipv4.ip_forward=1
   ```
2. **Rendre la configuration permanente** en modifiant `/etc/sysctl.conf` :
   ```bash
   sudo nano /etc/sysctl.conf
   ```
   Ajoutez ou décommentez la ligne suivante :
   ```bash
   net.ipv4.ip_forward = 1
   ```
3. **Rechargez la configuration** :
   ```bash
   sudo sysctl -p
   ```

## b. Configurer le NAT avec iptables
1. **Configurez le NAT** pour permettre le routage du trafic sortant via l'interface VPN (`tun0`) :
   ```bash
   sudo iptables -t nat -A POSTROUTING -o tun0 -j MASQUERADE
   ```
2. **Permettez le trafic** entre `eth0` et `tun0` :
   ```bash
   sudo iptables -A FORWARD -i eth0 -o tun0 -j ACCEPT
   sudo iptables -A FORWARD -i tun0 -o eth0 -m state --state RELATED,ESTABLISHED -j ACCEPT
   ```
3. **Sauvegardez les règles iptables** pour qu'elles persistent après un redémarrage :
   ```bash
   sudo sh -c "iptables-save > /etc/iptables/rules.v4"
   ```


# Etape 4. Installation du serveur DHCP

Pour attribuer des adresses IP aux appareils connectés au Raspberry Pi, nous allons installer un serveur DHCP (Dynamic Host Configuration Protocol).

## a. Installation du serveur DHCP
1. **Installez ISC DHCP Server** :
   ```bash
   sudo apt-get install isc-dhcp-server -y
   ```

## b. Configuration du serveur DHCP
1. **Configurez** le fichier `/etc/dhcp/dhcpd.conf` :
   ```bash
   sudo nano /etc/dhcp/dhcpd.conf
   ```
   Ajoutez les paramètres suivants pour le réseau `eth0` :
   ```bash
   default-lease-time 600;
   max-lease-time 7200;
   option domain-name "localhost.local";
   option domain-name-servers 8.8.8.8, 8.8.4.4;

   subnet 192.168.1.0 netmask 255.255.255.0 {
       range 192.168.1.10 192.168.1.50;
       option routers 192.168.1.1;
       option broadcast-address 192.168.1.255;
   }
   ```

## c. Configurer l'interface `eth0` pour DHCP
1. **Définissez** `eth0` comme l'interface pour le serveur DHCP :
   ```bash
   sudo nano /etc/default/isc-dhcp-server
   ```
   Modifiez la ligne suivante :
   ```bash
   INTERFACESv4="eth0"
   ```

## d. Démarrer le serveur DHCP
1. **Démarrez** le serveur DHCP et configurez-le pour démarrer au boot :
   ```bash
   sudo systemctl start isc-dhcp-server
   sudo systemctl enable isc-dhcp-server
   ```


## e. Attribition d'un adresse fixe à l'interface `eth0`

1. **Attribuez l'adresse IP** `192.168.1.1` à `eth0` de manière permanente :
   ```bash
   sudo nano /etc/dhcpcd.conf
   ```
   Ajoutez à la fin du fichier :
   ```bash
   interface eth0
   static ip_address=192.168.1.1/24
   ```
2. **Redémarrez le service réseau** pour appliquer la configuration :
   ```bash
   sudo systemctl restart dhcpcd
   ```

---

## Conclusion

Voilà! Votre Raspberry Pi est maintenant configuré en tant que client VPN matériel. Tous les appareils connectés au Raspberry Pi via l'interface `eth0` utiliseront la connexion VPN pour accéder à Internet de manière sécurisée.
![](/Capture%20d'écran%202024-09-11%20090302.png)