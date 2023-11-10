const TableCards = require("../../table/TableCards");

class TableCardsManager {
  addCards(cards) {
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      TableCards.addCard(card);
    }
  }
}

module.exports = new TableCardsManager();
