const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    action: {
      type: String,
      enum: ['modification', 'suppression'], // Type d'action
      required: true
    },
    user: {
      type: String, // Utilisateur effectuant l'action (nom de l'admin par exemple)
      required: true
    },
    personnelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Personnel", // Référence à l'objet Personnel
      required: true
    },
    details: {
      type: String, // Description des modifications ou des données supprimées
      required: true
    },
    date: {
      type: Date,
      default: Date.now // Date de l'action
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("History", historySchema);
