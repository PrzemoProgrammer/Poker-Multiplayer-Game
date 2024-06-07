module.exports = class CroupierCardsStorage extends Array {
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

  reset() {
    this.length = 0;
  }
};
