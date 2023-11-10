const {
  SIT_POSITIONS,
  GAME_POSITIONS,
  MAX_PLAYERS,
} = require("../../config/gameConfig");
const PlayersManager = require("./PlayersManager");

class PlayersGamePositionManager {
  constructor() {
    this.gamePositions = GAME_POSITIONS;
  }

  initGamePositions(players) {
    const gamePositions = this.getPlayersIDWithGamePositions(players);
    this.updateGamePositionsOnServer(gamePositions);

    return gamePositions;
  }

  updateGamePositionsOnServer(gamePositions) {
    for (const playerId in gamePositions) {
      const newPlayerGamePosition = gamePositions[playerId].position;
      // const updatedPlayerMoney = gamePositions[playerId].money;

      this.updateGamePositionOnServer(playerId, newPlayerGamePosition);
      // this.updatePlayerMoneyOnServer(playerId, updatedPlayerMoney);
    }
  }

  updateGamePositionOnServer(playerId, newPlayerGamePosition) {
    PlayersManager.updatePlayerGamePosition(playerId, newPlayerGamePosition);
  }

  // updatePlayerMoneyOnServer(playerId, updatedPlayerMoney) {
  //   PlayersManager.updatePlayerMoney(playerId, updatedPlayerMoney);
  // }

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

    // const playersPositionData = {};

    // for (const playerId in players) {
    //   playersPositionData[playerId] = {};
    //   if (players[playerId].clientData.sit === dealer) {
    //     playersPositionData[playerId].position = this.gamePositions[0];
    //   } else if (players[playerId].clientData.sit === smallBlind) {
    //     playersPositionData[playerId].position = this.gamePositions[1];
    //   } else if (players[playerId].clientData.sit === bigBlind) {
    //     playersPositionData[playerId].position = this.gamePositions[2];
    //   } else {
    //     playersPositionData[playerId].position = this.gamePositions[3];
    //   }
    // }
    // return playersPositionData;
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

module.exports = new PlayersGamePositionManager();
