const express = require("express");
const router = express.Router();
const History = require("../../models/History");

// ✅ Récupérer l'historique des actions
router.get("/", async (req, res) => {
  try {
    const history = await History.find().sort({ date: -1 }).populate("personnelId");
    res.json(history);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'historique :", error);
    res.status(500).json({ msg: "Erreur serveur" });
  }
});

module.exports = router;
