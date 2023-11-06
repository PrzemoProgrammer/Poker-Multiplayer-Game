const RoundNameStorage = require("../round/RoundNameStorage");
const { GAME_ROUND_NAMES } = require("../config/gameConfig");

class RoundNameManager {
  setRoundName(roundIndex) {
    const roundName = GAME_ROUND_NAMES[roundIndex];
    RoundNameStorage.setName(roundName);
  }

  resetRoundName() {
    this.setRoundName(0);
  }

  startPreflopRound() {
    this.setRoundName(1);
  }

  startFlopRound() {
    this.setRoundName(2);
  }

  startTurnRound() {
    this.setRoundName(3);
  }

  startRiverRound() {
    this.setRoundName(4);
  }

  isPreflopRound() {
    return RoundNameStorage.getRoundName() === GAME_ROUND_NAMES[1];
  }

  isFlopRound() {
    return RoundNameStorage.getRoundName() === GAME_ROUND_NAMES[2];
  }

  isTurnRound() {
    return RoundNameStorage.getRoundName() === GAME_ROUND_NAMES[3];
  }

  isRiverRound() {
    return RoundNameStorage.getRoundName() === GAME_ROUND_NAMES[4];
  }
}

module.exports = new RoundNameManager();
