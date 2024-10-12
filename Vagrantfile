Vagrant.configure("2") do |config|

  # Configuration du Serveur Web
  config.vm.define "web_server" do |web|
    web.vm.box = "ubuntu/bionic64"
    web.vm.hostname = "web-server"

    # Réseau interne pour que le client et l'attaquant puissent accéder au serveur
    web.vm.network "private_network", type: "static", ip: "192.168.56.10"

    # Configuration matérielle de la VM
    web.vm.provider "virtualbox" do |vb|
      vb.memory = "512"
      vb.cpus = 1
    end

    # Provisionnement pour installer Node.js, déployer le site et démarrer le serveur
    web.vm.provision "shell", inline: <<-SHELL
      # Mettre à jour les paquets et installer les dépendances
      sudo apt-get update
      sudo apt-get install -y curl

      # Installer Node.js
      curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
      sudo apt-get install -y nodejs

      # Créer un dossier pour l'application web
      mkdir -p /var/www/myapp

      # Copier les fichiers du projet (frontend statique + backend Node.js) dans la VM
      cp -r /vagrant/* /var/www/myapp/

      # Installer les dépendances du projet Node.js
      cd /var/www/myapp
      npm install

      # Démarrer l'application Node.js en arrière-plan avec PM2 (gestionnaire de processus)
      sudo npm install -g pm2
      pm2 start server.js
      pm2 startup
      pm2 save
    SHELL

    # Synchroniser le dossier contenant le site web local avec la VM
    web.vm.synced_folder "./site", "/vagrant"
  end

  # Configuration du Client Web
  config.vm.define "web_client" do |client|
    client.vm.box = "debian/buster64"
    client.vm.hostname = "web-client"

    # Réseau interne
    client.vm.network "private_network", type: "static", ip: "192.168.56.11"

    # Configuration matérielle de la VM
    client.vm.provider "virtualbox" do |vb|
      vb.memory = "512"
      vb.cpus = 1
    end

    # Provision pour installer un navigateur web (par exemple Lynx, pour l'accès via CLI)
    client.vm.provision "shell", inline: <<-SHELL
      sudo apt-get update
      sudo apt-get install -y curl
      # Installer Firefox et X11 utils
      sudo apt-get install -y firefox-esr xauth x11-apps
      # Ajouter la variable DISPLAY dans le fichier .bashrc pour qu'elle soit disponible à chaque session
      echo "export DISPLAY=192.168.56.1:0" >> /home/vagrant/.bashrc
    SHELL
  end

  # Configuration de la machine Attaquant
  config.vm.define "attacker" do |attacker|
    attacker.vm.box = "debian/buster64"
    attacker.vm.hostname = "attacker"

    # Réseau interne
    attacker.vm.network "private_network", type: "static", ip: "192.168.56.12"

    # Configuration matérielle de la VM
    attacker.vm.provider "virtualbox" do |vb|
      vb.memory = "1024"
      vb.cpus = 2
    end

    # Provision pour installer Wireshark, Firefox et Ettercap
    attacker.vm.provision "shell", inline: <<-SHELL
      sudo apt-get update

      # Préconfigurer la réponse pour éviter le blocage lors de l'installation de Wireshark
      echo "wireshark-common wireshark-common/install-setuid boolean false" | sudo debconf-set-selections

      # Installer Wireshark, Firefox et Ettercap
      sudo apt-get install -y wireshark firefox-esr ettercap-graphical xauth x11-apps

      # Ajouter la variable DISPLAY dans le fichier .bashrc pour qu'elle soit disponible à chaque session
      echo "export DISPLAY=192.168.56.1:0" >> /home/vagrant/.bashrc

      # Créer le groupe 'wireshark' si non existant
      sudo groupadd wireshark || true

      # Ajouter l'utilisateur 'vagrant' au groupe 'wireshark'
      sudo usermod -aG wireshark vagrant
    SHELL
  end

end

