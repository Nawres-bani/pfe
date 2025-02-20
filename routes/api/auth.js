const router = require("express").Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

// @route   POST api/auth/login-user
// @desc    Login user
// @access  Public
router.post("/login-user", (req, res) => {
  const { email, password } = req.body;

  // Vérifier si les champs email et password sont présents
  if (!email || !password) {
    return res.status(400).send({ msg: "Veuillez entrer tous les champs" });
  }

  // Chercher l'utilisateur dans la base de données avec l'email
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.status(400).send({ status: "usernotok", msg: "L'utilisateur n'existe pas" });
    }

    // Comparer le mot de passe avec celui stocké en base de données
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(400).send({ status: "passnotok", msg: "Mot de passe incorrect" });
      }

      // Créer le token JWT
      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"), // Clé secrète pour signer le token
        { expiresIn: config.get("tokenExpire") }, // Durée de validité du token
        (err, token) => {
          if (err) {
            return res.status(500).send({ msg: "Erreur lors de la création du token" });
          }

          // Retourner le token avec les autres informations (role, etc.)
          res.status(200).json({
            status: "ok",
            msg: "Connexion réussie",
            role: user.role || "user", // Si le rôle est manquant, le rôle par défaut est 'user'
            token, // Le token généré
          });
        }
      );
    }).catch(err => {
      return res.status(500).send({ msg: "Erreur lors de la comparaison du mot de passe", error: err.message });
    });
  }).catch(err => {
    return res.status(500).send({ msg: "Erreur lors de la recherche de l'utilisateur", error: err.message });
  });
});

module.exports = router;
