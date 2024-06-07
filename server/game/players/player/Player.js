class Player {
  constructor(clientData) {
    this.playerData = {
      clientData: clientData,
      cards: [],
      databaseID: null,
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

  get getChips() {
    return this.playerData.clientData.chips;
  }

  get getMoney() {
    return this.playerData.clientData.money;
  }

  get getCards() {
    return this.playerData.cards;
  }

  get inLobby() {
    return this.playerData.clientData.inLobby;
  }

  get isAllIn() {
    return this.playerData.clientData.allIn;
  }

  get buyIn() {
    return this.playerData.clientData.buyIn;
  }

  get databaseID() {
    return this.playerData.databaseID;
  }

  get nickname() {
    return this.playerData.clientData.nick;
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

  set updateChips(newChips) {
    this.playerData.clientData.chips = newChips;
  }

  set setCheckStatus(value) {
    this.playerData.clientData.check = value;
  }

  set inLobby(value) {
    this.playerData.clientData.inLobby = value;
  }

  set allIn(value) {
    this.playerData.clientData.allIn = value;
  }

  set buyIn(value) {
    this.playerData.clientData.buyIn = value;
  }

  set databaseID(value) {
    this.playerData.databaseID = value;
  }
}
module.exports = Player;
