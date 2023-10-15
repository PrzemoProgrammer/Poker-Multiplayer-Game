const PlayersStorage = require("../utility/PlayersStorage");

class PlayersManager {
  constructor() {}

  addPlayer(key, data) {
    PlayersStorage.addPlayer(key, data);
  }

  setPlayers(players) {
    PlayersStorage.setPlayers(players);
  }

  getPlayers() {
    return PlayersStorage.getPlayers();
  }

  getPlayer(key) {
    return PlayersStorage.getPlayer(key);
  }
}

module.exports = new PlayersManager();
