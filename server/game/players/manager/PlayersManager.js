const PlayersStorage = require("../storage/PlayersStorage");
const Player = require("../player/Player");
const { GAME_POSITIONS } = require("../../config/gameConfig");

class PlayersManager {
  addPlayer(key, clientData) {
    const player = new Player(clientData);
    PlayersStorage.addPlayer(key, player);
  }

  updatePlayerCards(playerId, newPlayerCards) {
    const player = this.getPlayer(playerId);
    player.updateCards = newPlayerCards;
  }

  updatePlayerMoney(playerId, updatedPlayerMoney) {
    const player = this.getPlayer(playerId);
    player.updateMoney = updatedPlayerMoney;
  }

  updatePlayerGamePosition(playerId, newPlayerGamePosition) {
    const player = this.getPlayer(playerId);
    player.updateGamePosition = newPlayerGamePosition;
  }

  updatePlayerBet(playerId, newPlayerBet) {
    const player = this.getPlayer(playerId);
    player.updateBet = newPlayerBet;
  }

  get getBiggestBetFromPlayers() {
    const players = this.getPlayersObject;
    const playersBets = [];
    for (const playerId in players) {
      const playerBets = players[playerId].getBet;
      playersBets.push(playerBets);
    }
    const maxGameBet = Math.max(...playersBets);
    return maxGameBet;
  }

  get getSmallBLindPlayerData() {
    const players = this.getPlayersObject;
    const smallBlindPlayerData = {};
    for (const playerId in players) {
      const playerGamePosition = players[playerId].getGamePosition;
      if (playerGamePosition === GAME_POSITIONS[1]) {
        const playerSitPosition = players[playerId].getSitPosition;
        smallBlindPlayerData.playerIdGameTurn = playerId;
        smallBlindPlayerData.sitPosition = playerSitPosition;
      }
    }
    return smallBlindPlayerData;
  }

  get getPlayers() {
    return PlayersStorage.getPlayers;
  }

  getPlayer(playerId) {
    return PlayersStorage.getPlayer(playerId);
  }

  get getPlayersObject() {
    const playersMap = this.getPlayers;
    const playersToObject = Object.fromEntries(playersMap);
    return playersToObject;
  }

  get getPlayersClientData() {
    const players = this.getPlayersObject;
    const playersClientData = {};
    for (const key in players) {
      playersClientData[key] = players[key].getClientData;
    }
    return playersClientData;
  }

  get getPlayersAllData() {
    const players = this.getPlayersObject;
    const playersData = {};
    for (const key in players) {
      playersData[key] = players[key].getData;
    }
    return playersData;
  }

  getPlayerClientData(playerId) {
    const player = this.getPlayer(playerId);
    const playerClientData = player.getClientData;
    return playerClientData;
  }

  get getPlayerCount() {
    return PlayersStorage.getPlayerCount;
  }

  deletePlayer(clientID) {
    PlayersStorage.deletePlayer(clientID);
  }

  setPlayerCheckStatus(playerId, value) {
    const player = this.getPlayer(playerId);
    player.setCheckStatus = value;
  }

  resetPlayersSigns() {
    const players = this.getPlayersObject;
    for (const key in players) {
      this.setPlayerCheckStatus(key, false);
    }
  }

  getPlayerBet(playerId) {
    const player = this.getPlayer(playerId);
    return player.getBet;
  }

  getPlayerMoney(playerId) {
    const player = this.getPlayer(playerId);
    return player.getMoney;
  }

  get getPlayersCards() {
    const players = this.getPlayersObject;
    const playersCards = {};
    for (const key in players) {
      playersCards[key] = players[key].getCards;
    }
    return playersCards;
  }

  get areAllPlayersCheck() {
    const players = this.getPlayersObject;
    const areAllPlayersCheck = Object.values(players).every(
      (player) => player.playerData.clientData.check === true
    );
    return areAllPlayersCheck;
  }

  calculateBetDifferenceToHightest(clientId) {
    const maxGameBet = this.getBiggestBetFromPlayers;
    const playerBet = this.getPlayerBet(clientId);
    return maxGameBet - playerBet;
  }
}

module.exports = new PlayersManager();
