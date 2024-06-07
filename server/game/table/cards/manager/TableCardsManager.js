const TableCardsStorage = require("../storage/TableCardsStorage");

module.exports = class TableCardsManager {
  constructor() {
    this.tableCardsStorage = new TableCardsStorage();
  }
  addCards(cards) {
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      this.tableCardsStorage.addCard(card);
    }
  }

  get getTableCards() {
    return this.tableCardsStorage.getCards;
  }

  reset() {
    this.tableCardsStorage.reset();
  }
};
