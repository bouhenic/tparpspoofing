const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Utiliser body-parser pour lire les données du formulaire POST
app.use(bodyParser.urlencoded({ extended: true }));

// Définir le dossier 'public' pour les fichiers statiques (HTML, CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Page d'accueil (login)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Gestion de l'authentification
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Informations d'identification correctes
  const correctUsername = 'admin';
  const correctPassword = 'password123';

  if (username === correctUsername && password === correctPassword) {
    // Si le login est correct, rediriger vers la page de bienvenue
    res.sendFile(path.join(__dirname, 'public', 'welcome.html'));
  } else {
    // Si le login est incorrect, afficher un message d'erreur
    res.send(`
      <h1>Échec de l'authentification</h1>
      <p>Identifiant ou mot de passe incorrect.</p>
      <a href="/">Réessayer</a>
    `);
  }
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});

