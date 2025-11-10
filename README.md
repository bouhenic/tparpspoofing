# TP MITM ARP SPOOFING
## Objectif
Ce dépôt contient un fichier Vagrantfile permettant la création d'un réseau de 3 VMs . Ces VMs permettent le test d'une attaque "Man-in-the-middle" de type ARP spoofing.
1. Cloner le répertoire :
```bash
git clone https://github.com/bouhenic/tparpspoofing
cd tpsarpspoofing
```
2. Créer et lancer les VM :
```bash
vagrant up
```
3. Connexion aux VMs :
Connexion à la VM "alice"
```bash
vagrant ssh web_client -- -X
```
-- -X sert à utiliser X11 de la machine host pour lancer les applications graphiques.
Connexion à la VM "web server"
```bash
vagrant ssh web_server
```
Connexion à la VM attaquante
```bash
vagrant ssh attacker -- -X
```
