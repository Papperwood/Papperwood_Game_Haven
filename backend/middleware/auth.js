const jwt = require('jsonwebtoken'); //  importe le module jsonwebtoken, qui est une bibliothèque permettant de travailler avec les JSON Web Tokens
 
// vérifie si l'utilisateur qui envoie la requête est bien authentifié.
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1]; // extraie le token d'authentification du header Authorization de la requête
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // methode verify pour verifier la token
       const userId = decodedToken.userId; // si c'est ok alors extraction de l'identifiant
       req.auth = { // ajoute l'objet auth à l'objet req de la requête contenant l'identifiant de l'utilisateur
           userId: userId
       };
	next(); // fin on passe a la fonction suivante
   } catch(error) {  // si la vérification echoue alors message dr'erreur
       res.status(401).json({ error });
   }
};