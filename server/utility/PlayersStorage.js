class PlayersStorage {
  constructor() {
    this.players = {
      FqwM02TqT: { nick: "Jan3", money: 0, id: "FqwM02TqT" },
      SqwT22TqV: { nick: "ZByszek", money: 100, id: "SqwT22TqV" },
      GLw932TQF: { nick: "Adamoss", money: 350, id: "GLw932TQF" },
    };
  }

  addPlayer(key, data) {
    this.players[key] = data;
  }

  setPlayers(players) {
    this.players = players;
  }

  getPlayers() {
    return this.players;
  }

  getPlayer(key) {
    return this.players[key];
  }
}

module.exports = new PlayersStorage();
