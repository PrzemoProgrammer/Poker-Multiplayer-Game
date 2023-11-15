class TableCardsStorage extends Array {
  constructor() {
    super();
  }

  addCard(value) {
    this.push(value);
  }

  get getCards() {
    return this;
  }
}

module.exports = new TableCardsStorage();
