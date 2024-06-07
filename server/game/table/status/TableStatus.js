module.exports = class TableStatus {
  constructor() {
    this.isFirstBetOnTable = false;
  }

  isFirstBetOnTable() {
    return this.isFirstBetOnTable;
  }

  //   setFirstBetOnTableStatus(value) {
  //     this.isFirstBetOnTable = value;
  //   }

  reset() {
    this.isFirstBetOnTable = false;
  }
};
