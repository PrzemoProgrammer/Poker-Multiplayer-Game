const TableBets = require("../table/TableBets");

class TableBetsManager {
  addBetToPot(bet) {
    const actualBetsOnTable = this.getBets();
    const updateBets = actualBetsOnTable + bet;
    TableBets.setBets(updateBets);
  }

  addPlayersBets(playersBets) {
    for (const playerId in playersBets) {
      const playerBet = playersBets[playerId].bet;
      this.addBetToPot(playerBet);
    }
  }

  getBets() {
    return TableBets.getBets();
  }
}

module.exports = new TableBetsManager();
