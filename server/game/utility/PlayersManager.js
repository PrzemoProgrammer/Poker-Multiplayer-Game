const Players = require("../players/Players");
const Player = require("../players/Player");

class PlayersManager {
  addPlayer(key, clientData) {
    const player = new Player(clientData);
    Players.addPlayer(key, player);
  }

  updatePlayerCards(playerId, newPlayerCards) {
    const player = Players.getPlayer(playerId);
  }

  updatePlayerMoney(playerId, updatedPlayerMoney) {
    const player = Players.getPlayer(playerId);
    player.updateMoney(updatedPlayerMoney);
  }

  updatePlayerGamePosition(playerId, newPlayerGamePosition) {
    const player = Players.getPlayer(playerId);
    player.updateGamePosition(newPlayerGamePosition);
  }

  updatePlayerBet(playerId, newPlayerBet) {
    const player = Players.getPlayer(playerId);
    player.updateBet(newPlayerBet);

    console.log("DUPAAAAAAA");
    console.log(player);
    console.log("DUPAAAAAAA");
  }

  getPlayers() {
    const playersMap = Players.getPlayers();
    const playersObject = {};
    const entriesIterator = playersMap.entries();
    for (const [key, value] of entriesIterator) {
      playersObject[key] = value;
    }
    return playersObject;
  }

  getPlayersClientData() {
    const players = this.getPlayers();
    const playersClientData = {};
    for (const key in players) {
      playersClientData[key] = players[key].getClientData();
    }

    return playersClientData;
  }

  getPlayersData() {
    const players = this.getPlayers();
    const playersData = {};
    for (const key in players) {
      playersData[key] = players[key].getData();
    }

    return playersData;
  }

  getPlayer(key) {
    const player = Players.getPlayer(key);
    const playerClientData = player.getClientData();
    return playerClientData;
  }

  getPlayerCount() {
    return Players.getPlayerCount();
  }

  deletePlayer(clientID) {
    Players.deletePlayer(clientID);
  }
}

module.exports = new PlayersManager();
