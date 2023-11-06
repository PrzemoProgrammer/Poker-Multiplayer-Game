const Player = require("../players/Player");

class Players {
  constructor() {
    this.players = new Map();
    this.createBotPlayers();
  }

  createBotPlayers() {
    const botPlayers = [
      {
        nick: "Jan3",
        money: 2000,
        id: "FqwM02TqT",
        sit: 5,
        position: "player",
        bet: 0,
      },
      {
        nick: "ZByszek",
        money: 10000,
        id: "SqwT22TqV",
        sit: 4,
        position: "player",
        bet: 0,
      },
      {
        nick: "Adamoss",
        money: 20000,
        id: "GLw932TQF",
        sit: 3,
        position: "player",
        bet: 0,
      },
      {
        nick: "Przmsidshadsdasd",
        money: 100000,
        id: "PGw962TU2",
        sit: 2,
        position: "player",
        bet: 0,
      },
    ];
    for (let i = 0; i < botPlayers.length; i++) {
      const key = botPlayers[i].id;
      const clientData = botPlayers[i];
      const player = new Player(clientData);
      this.addPlayer(key, player);
    }
  }

  addPlayer(key, player) {
    this.players.set(key, player);
  }

  getPlayers() {
    return this.players;
  }

  getPlayer(key) {
    return this.players.get(key);
  }

  getPlayerCount() {
    return this.players.size;
  }

  deletePlayer(clientID) {
    this.players.delete(clientID);
  }
}

module.exports = new Players();
