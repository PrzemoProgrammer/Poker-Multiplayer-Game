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
    this.playerData.clientData.position = gamePosition;
  }

  updateMoney(newMoney) {
    this.playerData.clientData.money = newMoney;
  }

  updateBet(newBet) {
    this.playerData.clientData.bet = newBet;
  }

  updateCards(newCards) {
    this.playerData.cards = newCards;
  }

  getId() {
    return this.playerData.clientData.id;
  }
}
module.exports = Player;
