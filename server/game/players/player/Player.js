class Player {
  constructor(clientData) {
    this.playerData = {
      clientData: clientData,
      cards: [],
    };
  }

  get getClientData() {
    return this.playerData.clientData;
  }

  get getData() {
    return this.playerData;
  }

  get isCheck() {
    return this.playerData.clientData.check;
  }

  get getBet() {
    return this.playerData.clientData.bet;
  }

  get getId() {
    return this.playerData.clientData.id;
  }

  get getGamePosition() {
    return this.playerData.clientData.position;
  }

  get getSitPosition() {
    return this.playerData.clientData.sit;
  }

  get getMoney() {
    return this.playerData.clientData.money;
  }

  get getCards() {
    return this.playerData.cards;
  }

  set updateGamePosition(gamePosition) {
    this.playerData.clientData.position = gamePosition;
  }

  set updateMoney(newMoney) {
    this.playerData.clientData.money = newMoney;
  }

  set updateBet(newBet) {
    this.playerData.clientData.bet = newBet;
  }

  set updateCards(newCards) {
    this.playerData.cards = newCards;
  }

  set setCheckStatus(value) {
    this.playerData.clientData.check = value;
  }
}
module.exports = Player;
