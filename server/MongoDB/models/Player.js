const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  id: Number,
  nick: String,
  score: Number,
  passwordHash: String,
});

module.exports = mongoose.model("Players", PlayerSchema);
