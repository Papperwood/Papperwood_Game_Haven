const mongoose = require("mongoose"); // importe le module mongoose pour utilisation ici meme
const uniqueValidator = require("mongoose-unique-validator"); // importe le module unique-validator

// définit un nouveau schéma Mongoose appelé userSchema ( c'est une modele a respecter pour sign up puis sign in ...)
const userSchema = mongoose.Schema({ 
  email: { type: String, required: true, unique: true }, // L'adresse e-mail doit être une chaîne de caractères + obligatoire + unique dans la base de données.
  password: { type: String, required: true }, // Le mot de passe doit être une chaîne de caractères + obligatoire
});

userSchema.plugin(uniqueValidator); // ajoute le plugin uniqueValidator au schéma userSchema

module.exports = mongoose.model("User", userSchema);