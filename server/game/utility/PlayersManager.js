const Players = require("../players/Players");

class PlayersManager {
  constructor() {}

  addPlayer(key, data) {
    Players.addPlayer(key, data);
  }

  setPlayers(players) {
    Players.setPlayers(players);
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

  getPlayer(key) {
    return Players.getPlayer(key);
  }

  getPlayerCount() {
    return Players.getPlayerCount();
  }

  deletePlayer(clientID) {
    Players.deletePlayer(clientID);
  }
}

module.exports = new PlayersManager();
