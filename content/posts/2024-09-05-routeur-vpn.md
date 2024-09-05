---
title: Routeur VPN
description: Voici une procédure complète pour mettre en place un routeur VPN à partir d'un Raspberry Pi.
date: 2024-09-05T13:25:06.970Z
preview: ""
draft: true
tags:
    - network
    - raspberry
    - vpn
categories: []
---

# 0. Matériel:
- 1 Raspberry Pi
- 1 carte SD
- 1 dongle USB Wifi


# 1. Installation de l'OS sur le Raspberry Pi

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


# 2. Installation du daemon OpenVPN

## a. Installation d'OpenVPN
1. **Installez OpenVPN** :
   ```bash
   sudo apt-get install openvpn -y
   ```

## b. Configuration d'OpenVPN
1. **Copiez** ou créez un fichier de configuration `.ovpn` pour le serveur VPN auquel vous souhaitez vous connecter.
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


# 3. Mise en place du routage

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


# 4. Installation du serveur DHCP

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


# 5. Configuration de l'interface `eth0` avec l'adresse IP `192.168.1.1`

## a. Configurer l'adresse IP de l'interface `eth0`
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

## Résumé

Cette procédure couvre toutes les étapes nécessaires pour transformer votre Raspberry Pi en un routeur VPN fonctionnel avec DHCP. Vous commencez par installer et configurer le système d'exploitation, configurez OpenVPN pour établir le tunnel VPN, mettez en place le routage pour permettre à d'autres appareils de se connecter via le VPN, et enfin configurez un serveur DHCP pour attribuer des adresses IP aux appareils connectés à `eth0`.