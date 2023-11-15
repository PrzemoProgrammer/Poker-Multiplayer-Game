const RoundNameStorage = require("../storage/RoundNameStorage");
const { GAME_ROUND_NAMES } = require("../../config/gameConfig");

class RoundNameManager {
  updateNextRound() {
    const actualRoundName = this.getActualRound;
    const actualRoundNameArrayIndex = GAME_ROUND_NAMES.indexOf(actualRoundName);
    const nextRoundArrayIndex = this.calculateNextRoundIndex(
      actualRoundNameArrayIndex
    );
    this.setRoundName = nextRoundArrayIndex;
  }

  calculateNextRoundIndex(actualRoundIndex) {
    let newRoundIndex = actualRoundIndex + 1;
    if (this.isLastRound(newRoundIndex)) newRoundIndex = 0;

    return newRoundIndex;
  }

  isLastRound(value) {
    return value > GAME_ROUND_NAMES.length - 1;
  }

  set setRoundName(roundIndex) {
    const roundName = GAME_ROUND_NAMES[roundIndex];
    RoundNameStorage.setName = roundName;
  }

  resetRoundName() {
    this.setRoundName = 0;
  }

  get isPreflopRound() {
    return this.getActualRound === GAME_ROUND_NAMES[1];
  }

  get isFlopRound() {
    return this.getActualRound === GAME_ROUND_NAMES[2];
  }

  get isTurnRound() {
    return this.getActualRound === GAME_ROUND_NAMES[3];
  }

  get isRiverRound() {
    return this.getActualRound === GAME_ROUND_NAMES[4];
  }

  get getActualRound() {
    return RoundNameStorage.getRoundName;
  }
}

module.exports = new RoundNameManager();
