const TableBetsStorage = require("../storage/TableBetsStorage");

class TableBetsManager {
  addBetToPot(bet) {
    const actualBetsOnTable = this.getBets;
    const updateBets = actualBetsOnTable + bet;
    TableBetsStorage.setBets = updateBets;
  }

  addPlayersBets(playersBets) {
    for (const playerId in playersBets) {
      const playerBet = playersBets[playerId].bet;
      this.addBetToPot(playerBet);
    }
  }

  get getBets() {
    return TableBetsStorage.getBets;
  }
}

module.exports = new TableBetsManager();
