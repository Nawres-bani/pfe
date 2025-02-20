const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("config");

// Importer les routes
const users = require("./routes/api/users");
const personnels = require("./routes/api/Personnel");
const auth = require("./routes/api/auth");
const filiale = require("./routes/api/filiale");
const dashboard = require("./routes/api/dashboard");
const history = require("./routes/api/history");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connexion à MongoDB (tu peux garder la logique de connexion déjà présente)
const mongo_url = config.get("mongo_url");
mongoose.set('strictQuery', true);
mongoose
  .connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connecté..."))
  .catch((err) => console.log("Erreur de connexion MongoDB :", err));

// Utilisation des routes
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/personnels", personnels); // Route pour personnels
app.use("/api/filiale", filiale);
app.use("/api/dashboard", dashboard);
app.use("/api/history", history);

// Lancer le serveur
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`🚀 Serveur lancé sur le port ${port}`));
