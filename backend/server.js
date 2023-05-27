require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user'); // Assurez-vous que le chemin d'accès est correct

const app = express();
app.use(bodyParser.json());

// Utilisez les routes ici
app.use('/api/auth', userRoutes);

mongoose
  .connect(
    process.env.MONGODB,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !")) 
  .catch(() => console.log("Connexion à MongoDB échouée !"));


app.listen(3000, () => console.log('Server started on port 3000'));
