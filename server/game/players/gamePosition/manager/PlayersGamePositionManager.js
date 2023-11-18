const {
  SIT_POSITIONS,
  GAME_POSITIONS,
  MAX_PLAYERS,
} = require("../../../config/gameConfig");
const PlayersManager = require("../../manager/PlayersManager");

module.exports = class PlayersGamePositionManager {
  static gamePositions = GAME_POSITIONS;

  static initGamePositions(players) {
    const gamePositions = this.getPlayersIDWithGamePositions(players);
    this.updateGamePositionsOnServer(gamePositions);
    return gamePositions;
  }

  static updateGamePositionsOnServer(gamePositions) {
    for (const playerId in gamePositions) {
      const newPlayerGamePosition = gamePositions[playerId].position;
      this.updateGamePositionOnServer(playerId, newPlayerGamePosition);
    }
  }

  static updateGamePositionOnServer(playerId, newPlayerGamePosition) {
    PlayersManager.updatePlayerGamePosition(playerId, newPlayerGamePosition);
  }

  static getPlayersIDWithGamePositions(players) {
    const gamePositions = this.drawPositions();
    return this.setPlayersPosition(gamePositions, players);
  }

  static drawPositions() {
    const dealer = this.drawDealer();
    const smallBlind = this.drawSmallBlind(dealer);
    const bigBlind = this.drawBigBlind(smallBlind);
    return { dealer, smallBlind, bigBlind };
  }

  static setPlayersPosition({ dealer, smallBlind, bigBlind }, players) {
    const playersPositionData = {};

    for (const playerId in players) {
      playersPositionData[playerId] = {};
      switch (players[playerId].clientData.sit) {
        case dealer:
          playersPositionData[playerId].position = this.gamePositions[0];
          break;
        case smallBlind:
          playersPositionData[playerId].position = this.gamePositions[1];
          break;
        case bigBlind:
          playersPositionData[playerId].position = this.gamePositions[2];
          break;
        default:
          playersPositionData[playerId].position = this.gamePositions[3];
          break;
      }
    }

    return playersPositionData;
  }

  static drawDealer() {
    const allSitPositions = SIT_POSITIONS;
    console.log(allSitPositions);
    const randomIndex = Math.floor(Math.random() * allSitPositions.length);
    const randomSitPosition = SIT_POSITIONS[randomIndex];
    return randomSitPosition;
  }

  static drawSmallBlind(dealerPosition) {
    return this.recalculatePlayersLimit(dealerPosition);
  }

  static drawBigBlind(smallBlindPosition) {
    return this.recalculatePlayersLimit(smallBlindPosition);
  }

  static recalculatePlayersLimit(value) {
    let position = value + 1;
    if (this.isMoreThanMaxPlayers(position)) position = 1;

    return position;
  }

  static isMoreThanMaxPlayers(value) {
    return value > MAX_PLAYERS;
  }
};
