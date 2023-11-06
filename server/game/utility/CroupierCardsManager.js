const { CARD_VALUE, CARD_NUMBER, CARD_COLOR } = require("../config/cardConfig");
const CroupierCards = require("../croupier/CroupierCards");
const PlayersManager = require("./PlayersManager");

class CroupierCardsManager {
  constructor() {
    this.createCroupierCards();
    this.shuffleCroupierCards();
  }

  createCroupierCards() {
    for (let i = 0; i < CARD_COLOR.length; i++) {
      const color = CARD_COLOR[i];
      for (let j = 0; j < CARD_NUMBER.length; j++) {
        const cardName = color + CARD_NUMBER[j];
        const cardValue = CARD_VALUE[j];

        const card = {
          name: cardName,
          suit: color,
          value: cardValue,
        };
        CroupierCards.addCard(card);
      }
    }
  }

  shuffleCroupierCards() {
    CroupierCards.shuffleCards();
  }

  getCards() {
    return CroupierCards.getCards();
  }

  removeFirstCardFromDeck() {
    return CroupierCards.subtractFirstCard();
  }

  getCardsFromDeck(numberOfCards) {
    const cards = [];
    for (let i = 0; i < numberOfCards; i++) {
      const card = this.removeFirstCardFromDeck();
      cards.push(card);
    }
    return cards;
  }
}

module.exports = new CroupierCardsManager();
