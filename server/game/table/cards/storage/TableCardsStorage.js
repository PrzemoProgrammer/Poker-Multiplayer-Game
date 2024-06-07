module.exports = class TableCardsStorage extends Array {
  addCard(value) {
    this.push(value);
  }

  get getCards() {
    return this;
  }

  reset() {
    this.length = 0;
  }
};
