const express = require("express");
const router = express.Router();
const Personnel = require("../models/Personnel.js");
const History = require("../models/History"); // Importer le modèle d'historique

// ✅ Ajouter un personnel
router.post("/add_personnel", async (req, res) => {
  const { fname, lname, email, birth_date, phone_number, cin, address, gender, date_emb, salary, user } = req.body;

  // Vérifier si tous les champs sont remplis
  if (!fname || !lname || !email || !birth_date || !phone_number || !cin || !address || !gender || !salary) {
    return res.status(400).json({ msg: "Veuillez remplir tous les champs obligatoires." });
  }

  try {
    // Vérifier si le CIN existe déjà
    const personnelExists = await Personnel.findOne({ cin });
    if (personnelExists) {
      return res.status(400).json({ msg: "CIN déjà existant." });
    }

    // Créer un nouveau personnel
    const newPersonnel = new Personnel({
      fname,
      lname,
      email,
      birth_date,
      phone_number,
      cin,
      address,
      gender,
      date_emb,
      salary,
    });

    await newPersonnel.save();

    // Enregistrer l'action dans l'historique
    const history = new History({
      action: 'ajout',
      user: user, // Utilisateur effectuant l'action (admin)
      personnelId: newPersonnel._id,
      details: JSON.stringify(req.body), // Détails de l'ajout
    });
    await history.save();

    res.status(201).json({ msg: "Personnel ajouté avec succès." });

  } catch (error) {
    console.error("Erreur lors de l'ajout du personnel :", error);
    res.status(500).json({ msg: "Erreur serveur" });
  }
});

// ✅ Récupérer tous les personnels
router.get("/", async (req, res) => {
  try {
    const personnels = await Personnel.find();
    res.json(personnels);
  } catch (error) {
    console.error("Erreur lors de la récupération des personnels :", error);
    res.status(500).json({ msg: "Erreur serveur" });
  }
});

// ✅ Mettre à jour un personnel
router.put("/maj/:id", async (req, res) => {
  const { user } = req.body;

  try {
    const personnel = await Personnel.findById(req.params.id);
    if (!personnel) {
      return res.status(404).json({ msg: "Personnel non trouvé." });
    }

    const updatedPersonnel = await Personnel.findByIdAndUpdate(req.params.id, req.body, { new: true });

    // Enregistrer l'action dans l'historique
    const history = new History({
      action: 'modification',
      user: user, // Utilisateur effectuant l'action (admin)
      personnelId: updatedPersonnel._id,
      details: JSON.stringify(req.body), // Détails de la modification
    });
    await history.save();

    res.json({ msg: "Mise à jour réussie." });

  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    res.status(500).json({ msg: "Erreur serveur" });
  }
});

// ✅ Supprimer un personnel
router.delete("/supprimer/:id", async (req, res) => {
  const { user } = req.body;

  try {
    const personnel = await Personnel.findById(req.params.id);
    if (!personnel) {
      return res.status(404).json({ msg: "Personnel non trouvé." });
    }

    const deletedPersonnel = await Personnel.findByIdAndDelete(req.params.id);

    // Enregistrer l'action dans l'historique
    const history = new History({
      action: 'suppression',
      user: user, // Utilisateur effectuant l'action (admin)
      personnelId: deletedPersonnel._id,
      details: 'Données supprimées', // Détails de la suppression
    });
    await history.save();

    res.json({ msg: "Personnel supprimé avec succès." });

  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    res.status(500).json({ msg: "Erreur serveur" });
  }
});

module.exports = router;
