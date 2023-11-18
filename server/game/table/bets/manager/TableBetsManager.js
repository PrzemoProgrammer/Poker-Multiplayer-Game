const TableBetsStorage = require("../storage/TableBetsStorage");

module.exports = class TableBetsManager {
  static addBetToPot(bet) {
    const actualBetsOnTable = this.getBets;
    const updateBets = actualBetsOnTable + bet;
    TableBetsStorage.setBets = updateBets;
  }

  static addPlayersBets(playersBets) {
    for (const playerId in playersBets) {
      const playerBet = playersBets[playerId].bet;
      this.addBetToPot(playerBet);
    }
  }

  static get getBets() {
    return TableBetsStorage.getBets;
  }
};
