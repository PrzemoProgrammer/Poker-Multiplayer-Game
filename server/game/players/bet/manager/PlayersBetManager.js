const PlayersManager = require("../../manager/PlayersManager");
const {
  SMALL_BLIND_BET,
  BIG_BLIND_BET,
  GAME_POSITIONS,
} = require("../../../config/gameConfig");

module.exports = class PlayersBetManager {
  static initBets(playersIDWithGamePositions, players) {
    const calculatedPlayersBets = this.calculateBetsOnStart(
      playersIDWithGamePositions,
      players
    );
    this.updateBetsOnServer(calculatedPlayersBets);
    return calculatedPlayersBets;
  }

  static updateBetsOnServer(calculatedPlayersBets) {
    for (const playerId in calculatedPlayersBets) {
      const newPlayerBet = calculatedPlayersBets[playerId].bet;
      this.updateBetOnServer(playerId, newPlayerBet);
    }
  }

  static updateBetOnServer(playerId, newPlayerBet) {
    const actualPlayerBet = PlayersManager.getPlayerBet(playerId);
    const updateNewPlayerBet = actualPlayerBet + newPlayerBet;
    PlayersManager.updatePlayerBet(playerId, updateNewPlayerBet);
  }

  static calculateBetsOnStart(playersIDWithGamePositions, players) {
    const playersIDWithMoney = this.calculateMoneyAndBets(
      playersIDWithGamePositions,
      players
    );

    return playersIDWithMoney;
  }

  static calculateMoneyAndBets(playersIDWithGamePositions, players) {
    const smallBlindValue = SMALL_BLIND_BET;
    const bigBlindValue = BIG_BLIND_BET;
    const smallBlindGamePosition = GAME_POSITIONS[1];
    const bigBlindGamePosition = GAME_POSITIONS[2];
    const playersIDMoneyAndBets = {};

    for (const playerId in players) {
      playersIDMoneyAndBets[playerId] = {};
      if (
        playersIDWithGamePositions[playerId].position === bigBlindGamePosition
      ) {
        playersIDMoneyAndBets[playerId].bet = bigBlindValue;
      } else if (
        playersIDWithGamePositions[playerId].position === smallBlindGamePosition
      ) {
        playersIDMoneyAndBets[playerId].bet = smallBlindValue;
      } else {
        playersIDMoneyAndBets[playerId].bet = 0;
      }
    }

    return playersIDMoneyAndBets;
  }

  static resetPlayersBets() {
    const players = PlayersManager.getPlayersObject;
    for (const playerId in players) {
      const player = players[playerId];
      player.updateBet = 0;
    }
  }
};
