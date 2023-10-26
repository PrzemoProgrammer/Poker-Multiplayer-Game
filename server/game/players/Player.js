class Player {
  constructor(clientData) {
    this.playerData = {
      clientData: clientData,
      cards: [],
    };
  }

  getClientData() {
    return this.playerData.clientData;
  }

  getData() {
    return this.playerData;
  }

  updateGamePosition(gamePosition) {
    this.playerData.position = gamePosition;
  }

  updateBet(newBet) {
    this.playerData.bet = newBet;
  }

  updateCards(newCards) {
    this.playerData.cards = newCards;
  }
}
module.exports = Player;
