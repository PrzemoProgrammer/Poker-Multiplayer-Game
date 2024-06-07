module.exports = class TableBetsStorage {
  constructor() {
    this.tableBets = 0;
  }

  set setBets(value) {
    this.tableBets = value;
  }

  get getBets() {
    return this.tableBets;
  }

  reset() {
    this.tableBets = 0;
  }
};
