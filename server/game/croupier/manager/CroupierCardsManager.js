const {
  CARD_VALUE,
  CARD_NUMBER,
  CARD_COLOR,
} = require("../../card/config/cardConfig");
const CroupierCardsStorage = require("../storage/CroupierCardsStorage");

module.exports = class CroupierCardsManager {
  constructor() {
    this.croupierCardsStorage = new CroupierCardsStorage();
    this.initCards();
  }

  initCards() {
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
        this.croupierCardsStorage.addCard(card);
      }
    }
  }

  shuffleCroupierCards() {
    this.croupierCardsStorage.shuffleCards();
  }

  get getCards() {
    return this.croupierCardsStorage.getCards;
  }

  removeFirstCardFromDeck() {
    return this.croupierCardsStorage.subtractFirstCard;
  }

  getCardsFromDeck(numberOfCards) {
    const cards = [];
    for (let i = 0; i < numberOfCards; i++) {
      const card = this.removeFirstCardFromDeck();
      cards.push(card);
    }
    return cards;
  }

  reset() {
    this.croupierCardsStorage.reset();
    this.initCards();
  }
};
