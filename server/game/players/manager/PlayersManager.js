const PlayersStorage = require("../storage/PlayersStorage");
const Player = require("../player/Player");
const { GAME_POSITIONS } = require("../../config/gameConfig");

module.exports = class PlayersManager {
  static addPlayer(key, clientData) {
    const player = new Player(clientData);
    PlayersStorage.addPlayer(key, player);
  }

  static updatePlayerCards(playerId, newPlayerCards) {
    const player = this.getPlayer(playerId);
    player.updateCards = newPlayerCards;
  }

  static updatePlayerMoney(playerId, updatedPlayerMoney) {
    const player = this.getPlayer(playerId);
    player.updateMoney = updatedPlayerMoney;
  }

  static updatePlayerGamePosition(playerId, newPlayerGamePosition) {
    const player = this.getPlayer(playerId);
    player.updateGamePosition = newPlayerGamePosition;
  }

  static updatePlayerBet(playerId, newPlayerBet) {
    const player = this.getPlayer(playerId);
    player.updateBet = newPlayerBet;
  }

  static get getBiggestBetFromPlayers() {
    const players = this.getPlayersObject;
    const playersBets = [];
    for (const playerId in players) {
      const playerBets = players[playerId].getBet;
      playersBets.push(playerBets);
    }
    const maxGameBet = Math.max(...playersBets);
    return maxGameBet;
  }

  static get getSmallBLindPlayerData() {
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

  static get getPlayers() {
    return PlayersStorage.getPlayers;
  }

  static getPlayer(playerId) {
    return PlayersStorage.getPlayer(playerId);
  }

  static get getPlayersObject() {
    const playersMap = this.getPlayers;
    const playersToObject = Object.fromEntries(playersMap);
    return playersToObject;
  }

  static get getPlayersClientData() {
    const players = this.getPlayersObject;
    const playersClientData = {};
    for (const key in players) {
      playersClientData[key] = players[key].getClientData;
    }
    return playersClientData;
  }

  static get getPlayersAllData() {
    const players = this.getPlayersObject;
    const playersData = {};
    for (const key in players) {
      playersData[key] = players[key].getData;
    }
    return playersData;
  }

  static getPlayerClientData(playerId) {
    const player = this.getPlayer(playerId);
    const playerClientData = player.getClientData;
    return playerClientData;
  }

  static get getPlayerCount() {
    return PlayersStorage.getPlayerCount;
  }

  static deletePlayer(clientID) {
    PlayersStorage.deletePlayer(clientID);
  }

  static setPlayerCheckStatus(playerId, value) {
    const player = this.getPlayer(playerId);
    player.setCheckStatus = value;
  }

  static resetPlayersSigns() {
    const players = this.getPlayersObject;
    for (const key in players) {
      this.setPlayerCheckStatus(key, false);
    }
  }

  static getPlayerBet(playerId) {
    const player = this.getPlayer(playerId);
    return player.getBet;
  }

  static getPlayerMoney(playerId) {
    const player = this.getPlayer(playerId);
    return player.getMoney;
  }

  static get getPlayersCards() {
    const players = this.getPlayersObject;
    const playersCards = {};
    for (const key in players) {
      playersCards[key] = players[key].getCards;
    }
    return playersCards;
  }

  static get areAllPlayersCheck() {
    const players = this.getPlayersObject;
    const areAllPlayersCheck = Object.values(players).every(
      (player) => player.playerData.clientData.check === true
    );
    return areAllPlayersCheck;
  }

  static calculateBetDifferenceToHightest(clientId) {
    const maxGameBet = this.getBiggestBetFromPlayers;
    const playerBet = this.getPlayerBet(clientId);
    return maxGameBet - playerBet;
  }
};
