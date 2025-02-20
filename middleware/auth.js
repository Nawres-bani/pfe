const config = require("config");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  // Vérification du token
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "Access denied, please login" });
  }

  try {
    // Décoder le token
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    // Ajouter l'id de l'utilisateur à la requête
    req.userid = decoded.id;
    // Passer à la prochaine fonction de la chaîne
    next();
  } catch (error) {
    return res.status(400).json({ msg: "Token not valid, please login again" });
  }
};

module.exports = auth;
