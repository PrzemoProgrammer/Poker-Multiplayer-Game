class TableBetsStorage {
  constructor() {
    this.tableBets = 0;
  }

  set setBets(value) {
    this.tableBets = value;
  }

  get getBets() {
    return this.tableBets;
  }
}

module.exports = new TableBetsStorage();
