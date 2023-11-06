class TableBets {
  constructor() {
    this.tableBets = 0;
  }

  setBets(value) {
    this.tableBets = value;
  }

  getBets() {
    return this.tableBets;
  }
}

module.exports = new TableBets();
