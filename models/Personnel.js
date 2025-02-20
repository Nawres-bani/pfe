const mongoose = require("mongoose");

const PersonnelSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  birth_date: { type: Date, required: true },
  phone_number: { type: Number, required: true },
  cin: { type: Number, required: true, unique: true },
  address: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female'], required: true },
  date_emb: { type: Date, default: Date.now },
  salary: { type: Number, required: true },
});

module.exports = mongoose.model("Personnel", PersonnelSchema);
