const TableBetsStorage = require("../storage/TableBetsStorage");

module.exports = class TableBetsManager {
  constructor() {
    this.tableBetsStorage = new TableBetsStorage();
  }

  addBetToPot(bet) {
    const actualBetsOnTable = this.getBets;
    const updateBets = actualBetsOnTable + bet;
    this.tableBetsStorage.setBets = updateBets;
  }

  addPlayersBets(playersBets) {
    for (const playerId in playersBets) {
      const playerBet = playersBets[playerId].bet;
      this.addBetToPot(playerBet);
    }
  }

  get getBets() {
    return this.tableBetsStorage.getBets;
  }

  reset() {
    this.tableBetsStorage.reset();
  }
};
