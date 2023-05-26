const bcrypt = require("bcrypt"); // importe la bibliothèque bcrypt
const jwt = require("jsonwebtoken"); // mporte la bibliothèque jsonwebtoken

const User = require("../models/User"); // importe le modèle de données User défini dans le fichier User.js
const dotenv = require("dotenv");
dotenv.config();

// les condition pour mot de passe
const verify_password = (mot_de_passe) => {
  if (mot_de_passe.length < 8) { // minimum de 8 caractere
    return false;
  }

  const majuscule = /[A-Z]/; // def des maj
  const chiffres = /\d/g;

  if (!majuscule.test(mot_de_passe)) {
    return false;
  }

  const resultat = mot_de_passe.match(chiffres);
  if (resultat === null || resultat.length < 2) { // minimum de 2 chiffres
    return false;
  }

  return true;
};

// La méthode exports.signup est le contrôleur qui gère la création d'un nouvel utilisateur.
exports.signup = (req, res, next) => {
  const { password, email } = req.body;
  if (!verify_password(password)) { // verification si respect des regles ci dessus
    return res.status(400).json({
      message:
        "Le mot de passe doit contenir au moins 8 caractères, 1 majuscule et 2 chiffres.", // sinon message d'erreur
    });
  }
  bcrypt
    .hash(req.body.password, 10) // methode hash pour le password + le nombre 10 qui définie le nombre d'iteration
    .then((hash) => {
      const user = new User({
        // stockage de l'email et le password du client apres la méthode hash
        email: req.body.email,
        password: hash,
      });
      user
        .save() // methode save pour enregistrer dans la base de données ce client
        .then(() => res.status(201).json({ message: "Utilisateur créé !" })) // si ca a fonctionner alors message de validation
        .catch((error) => res.status(400).json({ error })); // message si un utilisateur existe deja
    })
    .catch((error) => res.status(500).json({ error })); // message si ca ne fonctionne pas du tout
};

// La méthode exports.login est le contrôleur qui gère l'authentification d'un utilisateur deja dans la base de donnée existant.
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }) // méthode findOne pour chercher un utlisateur dans la base de donnée User
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" }); // Si aucun utilisateur n'est trouvé, la méthode renvoie une réponse HTTP avec un code de statut 401
      }
      bcrypt
        .compare(req.body.password, user.password) // si trouvé utilisation de la méthode .compare de bcrypt pour comparer avec le hash
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" }); // si le .compare de donne rien alors message negatif
          }
          // Si les deux correspondent, la méthode renvoie une réponse HTTP avec un code de statut 200 (succès) et un objet JSON contenant l'ID de l'utilisateur,
          // et un jeton d'authentification signé avec une clé secrète aléatoire ("RANDOM_TOKEN_SECRET") et une durée de validité de 24h.
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: process.env.TIMER_TOKEN,
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};