const { GAME_ROUND_NAMES } = require("../../config/gameConfig");

class RoundNameStorage {
  constructor() {
    this.roundName = GAME_ROUND_NAMES[0];
  }

  set setName(newName) {
    this.roundName = newName;
  }

  get getRoundName() {
    return this.roundName;
  }
}

module.exports = new RoundNameStorage();
