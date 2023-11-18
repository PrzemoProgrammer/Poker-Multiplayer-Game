class TableCardsStorage extends Array {
  addCard(value) {
    this.push(value);
  }

  get getCards() {
    return this;
  }
}

module.exports = new TableCardsStorage();
