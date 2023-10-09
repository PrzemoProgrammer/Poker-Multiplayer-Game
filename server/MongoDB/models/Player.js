const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  nick: String,
  money: Number,
  passwordHash: String,
});

module.exports = mongoose.model("Players", PlayerSchema);
