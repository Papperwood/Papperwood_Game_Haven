const express = require("express"); // importe le module Express.js et le stocke dans la constante express pour être utilisée dans le code suivant.
const router = express.Router(); // module router d'express 

const userCtrl = require("../controllers/user"); // importe un module contenant les contrôleurs pour les opérations liées aux utilisateurs

router.post("/signup", userCtrl.signup); // définit une route pour gérer les requêtes HTTP POST à l'endpoint "/signup" en utilisant le contrôleur signup du module userCtrl
router.post("/login", userCtrl.login); // définit une route pour gérer les requêtes HTTP POST à l'endpoint "/login" en utilisant le contrôleur login du module userCtrl

module.exports = router;