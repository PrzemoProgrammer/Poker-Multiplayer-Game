class PlayersCards {
  constructor() {
    this.playersCards = new Map();
  }

  addPlayerCards(key, data) {
    this.playersCards.set(key, data);
  }

  getPlayersCards() {
    return this;
  }

  deletePlayerCards(clientID) {
    this.playersCards.delete(clientID);
  }

  // addPlayer(key, data) {
  //   this.players.set(key, data);
  // }

  // setPlayers(players) {
  //   this.players = players;
  // }

  // getPlayers() {
  //   return this.players;
  // }

  // getPlayer(key) {
  //   return this.players.get(key);
  // }

  // getPlayerCount() {
  //   return this.players.size;
  // }

  // deletePlayer(clientID) {
  //   this.players.delete(clientID);
  // }

  //   updatePlayer(key, value) {
  //     const playerData = this.getPlayer(key)
  //   }
}

module.exports = new PlayersCards();
