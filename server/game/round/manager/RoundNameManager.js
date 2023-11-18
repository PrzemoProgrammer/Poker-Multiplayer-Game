const RoundNameStorage = require("../storage/RoundNameStorage");
const { GAME_ROUND_NAMES } = require("../../config/gameConfig");

module.exports = class RoundNameManager {
  static updateNextRound() {
    const actualRoundName = this.getActualRound;
    const actualRoundNameArrayIndex = GAME_ROUND_NAMES.indexOf(actualRoundName);
    const nextRoundArrayIndex = this.calculateNextRoundIndex(
      actualRoundNameArrayIndex
    );
    this.setRoundName = nextRoundArrayIndex;
  }

  static calculateNextRoundIndex(actualRoundIndex) {
    let newRoundIndex = actualRoundIndex + 1;
    if (this.isLastRound(newRoundIndex)) newRoundIndex = 0;

    return newRoundIndex;
  }

  static isLastRound(value) {
    return value > GAME_ROUND_NAMES.length - 1;
  }

  static set setRoundName(roundIndex) {
    const roundName = GAME_ROUND_NAMES[roundIndex];
    RoundNameStorage.setName = roundName;
  }

  static resetRoundName() {
    this.setRoundName = 0;
  }

  static get isPreflopRound() {
    return this.getActualRound === GAME_ROUND_NAMES[1];
  }

  static get isFlopRound() {
    return this.getActualRound === GAME_ROUND_NAMES[2];
  }

  static get isTurnRound() {
    return this.getActualRound === GAME_ROUND_NAMES[3];
  }

  static get isRiverRound() {
    return this.getActualRound === GAME_ROUND_NAMES[4];
  }

  static get getActualRound() {
    return RoundNameStorage.getRoundName;
  }
};
