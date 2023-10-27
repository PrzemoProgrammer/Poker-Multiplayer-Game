const PlayersManager = require("./PlayersManager");

class PlayersMoneyManager {
  updatePlayersMoney(playersBets, players) {
    const updatedPlayersMoney = this.calculateMoney(playersBets, players);
    this.updatePlayersMoneyOnServer(updatedPlayersMoney);
    return updatedPlayersMoney;
  }

  updatePlayersMoneyOnServer(updatedPlayersMoney) {
    for (const playerId in updatedPlayersMoney) {
      this.updatePlayerMoneyOnServer(playerId, updatedPlayersMoney);
    }
  }

  updatePlayerMoneyOnServer(playerId, updatedPlayersMoney) {
    PlayersManager.updatePlayerMoney(playerId, updatedPlayersMoney);
  }

  calculateMoney(playersBets, players) {
    const updatedPlayersMoney = {};
    for (const playerId in players) {
      updatedPlayersMoney[playerId] = {};
      const actualPlayerMoney = players[playerId].clientData.money;
      const updatedPlayerMoney = actualPlayerMoney - playersBets[playerId].bet;
      updatedPlayersMoney[playerId].money = updatedPlayerMoney;
    }

    return updatedPlayersMoney;
  }
}

module.exports = new PlayersMoneyManager();
