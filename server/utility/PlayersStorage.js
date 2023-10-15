class PlayersStorage {
  constructor() {
    this.players = {};
  }

  setPlayers(players) {
    this.players = players;
  }

  getPlayers() {
    return this.players;
  }
}

export default new PlayersStorage();
