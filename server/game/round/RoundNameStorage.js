const { GAME_ROUND_NAMES } = require("../config/gameConfig");

class RoundNameStorage {
  constructor() {
    this.roundName = GAME_ROUND_NAMES[0];
  }

  setName(newName) {
    this.roundName = newName;
  }

  getRoundName() {
    return this.roundName;
  }
}

module.exports = new RoundNameStorage();
