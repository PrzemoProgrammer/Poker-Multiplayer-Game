const {
  CARD_VALUE,
  CARD_NUMBER,
  CARD_COLOR,
} = require("../../card/config/cardConfig");
const CroupierCardsStorage = require("../storage/CroupierCardsStorage");

module.exports = class CroupierCardsManager {
  static initCards() {
    this.createCroupierCards();
    this.shuffleCroupierCards();
  }

  static createCroupierCards() {
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
        CroupierCardsStorage.addCard(card);
      }
    }
  }

  static shuffleCroupierCards() {
    CroupierCardsStorage.shuffleCards();
  }

  static get getCards() {
    return CroupierCardsStorage.getCards;
  }

  static removeFirstCardFromDeck() {
    return CroupierCardsStorage.subtractFirstCard;
  }

  static getCardsFromDeck(numberOfCards) {
    const cards = [];
    for (let i = 0; i < numberOfCards; i++) {
      const card = this.removeFirstCardFromDeck();
      cards.push(card);
    }
    return cards;
  }
};
