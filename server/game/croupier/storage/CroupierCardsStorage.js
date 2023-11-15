class CroupierCardsStorage extends Array {
  constructor() {
    super();
  }

  addCard(value) {
    this.push(value);
  }

  get getCards() {
    return this;
  }

  get subtractFirstCard() {
    return this.shift();
  }

  shuffleCards() {
    this.sort((a, b) => 0.5 - Math.random());
  }
}

module.exports = new CroupierCardsStorage();
