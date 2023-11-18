const TableCardsStorage = require("../storage/TableCardsStorage");

module.exports = class TableCardsManager {
  static addCards(cards) {
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      TableCardsStorage.addCard(card);
    }
  }

  static get getTableCards() {
    return TableCardsStorage.getCards;
  }
};
