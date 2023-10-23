const { SIT_POSITIONS, GAME_POSITIONS, MAX_PLAYERS } = require("../config");
const PlayersManager = require("./PlayersManager");

class GamePositionManager {
  constructor() {
    this.gamePositions = GAME_POSITIONS;
  }

  getPlayersIDWithGamePositions(players) {
    const gamePositions = this.drawPositions();
    return this.setPlayersPosition(gamePositions, players);
  }

  drawPositions() {
    const dealer = this.drawDealer();
    const smallBlind = this.drawSmallBlind(dealer);
    const bigBlind = this.drawBigBlind(smallBlind);

    return { dealer, smallBlind, bigBlind };
  }

  setPlayersPosition({ dealer, smallBlind, bigBlind }, players) {
    const playersPositionData = {};

    for (const playerId in players) {
      playersPositionData[playerId] = {};
      if (players[playerId].sit === dealer) {
        playersPositionData[playerId].position = this.gamePositions[0];
      } else if (players[playerId].sit === smallBlind) {
        playersPositionData[playerId].position = this.gamePositions[1];
      } else if (players[playerId].sit === bigBlind) {
        playersPositionData[playerId].position = this.gamePositions[2];
      } else {
        playersPositionData[playerId].position = this.gamePositions[3];
      }
    }
    return playersPositionData;
  }

  drawDealer() {
    const allSitPositions = SIT_POSITIONS;
    const randomIndex = Math.floor(Math.random() * allSitPositions.length);
    const randomSitPosition = SIT_POSITIONS[randomIndex];
    return randomSitPosition;
  }

  drawSmallBlind(dealerPosition) {
    return this.recalculatePlayersLimit(dealerPosition);
    // let smallBlindPosition = dealerPosition + 1;
    // if (this.isMoreThanMaxPlayers(smallBlindPosition)) {
    //   smallBlindPosition = 1;
    // }

    // return smallBlindPosition;
  }

  drawBigBlind(smallBlindPosition) {
    return this.recalculatePlayersLimit(smallBlindPosition);
    // let bigBlindPosition = smallBlindPosition + 1;
    // if (this.isMoreThanMaxPlayers(bigBlindPosition)) {
    //   bigBlindPosition = 1;
    // }
    // return bigBlindPosition;
  }

  recalculatePlayersLimit(value) {
    let position = value + 1;
    if (this.isMoreThanMaxPlayers(position)) position = 1;

    return position;
  }

  isMoreThanMaxPlayers(value) {
    return value > MAX_PLAYERS;
  }
}

module.exports = new GamePositionManager();
