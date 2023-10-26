class CroupierCards extends Array {
  constructor() {
    super();
  }

  addCard(value) {
    this.push(value);
  }

  getCards() {
    return this;
  }

  shuffleCards() {
    this.sort((a, b) => 0.5 - Math.random());
  }

  subtractFirstCard() {
    return this.shift();
  }
}

module.exports = new CroupierCards();
