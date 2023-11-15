const TableCardsStorage = require("../storage/TableCardsStorage");

class TableCardsManager {
  addCards(cards) {
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      TableCardsStorage.addCard(card);
    }
  }

  get getTableCards() {
    return TableCardsStorage.getCards;
  }
}

module.exports = new TableCardsManager();
