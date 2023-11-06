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

  //   updateTurn(newTurn) {
  //     this.playerData.clientData.turn = newTurn;
  //   }

  isCheck() {
    return this.playerData.clientData.check;
  }

  getBet() {
    return this.playerData.clientData.bet;
  }

  getId() {
    return this.playerData.clientData.id;
  }

  getGamePosition() {
    return this.playerData.clientData.position;
  }

  getSitPosition() {
    return this.playerData.clientData.sit;
  }
}
module.exports = Player;
