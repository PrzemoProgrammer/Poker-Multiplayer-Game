const PlayersManager = require("./PlayersManager");

class PlayersMoneyManager {
  updatePlayersMoney(playersBets, players) {
    const updatedPlayersMoney = this.calculatePlayersMoney(
      playersBets,
      players
    );
    this.updatePlayersMoneyOnServer(updatedPlayersMoney);
    return updatedPlayersMoney;
  }

  updatePlayersMoneyOnServer(updatedPlayersMoney) {
    for (const playerId in updatedPlayersMoney) {
      const updatedPlayerMoney = updatedPlayersMoney[playerId].money;
      this.updatePlayerMoneyOnServer(playerId, updatedPlayerMoney);
    }
  }

  updatePlayerMoneyOnServer(playerId, updatedPlayerMoney) {
    PlayersManager.updatePlayerMoney(playerId, updatedPlayerMoney);
  }

  calculatePlayersMoney(playersBets, players) {
    const updatedPlayersMoney = {};
    for (const playerId in players) {
      updatedPlayersMoney[playerId] = {};
      const player = players[playerId];
      const playerBets = playersBets[playerId].bet;
      const updatedPlayerMoney = this.calculatePlayerMoney(player, playerBets);
      updatedPlayersMoney[playerId].money = updatedPlayerMoney;
    }

    return updatedPlayersMoney;
  }

  updatePlayerMoney(playerId, newBet) {
    const player = PlayersManager.getPlayer(playerId);
    const updatedPlayerMoney = this.calculatePlayerMoney(player, newBet);
    this.updatePlayerMoneyOnServer(playerId, updatedPlayerMoney);
    return updatedPlayerMoney;
  }

  calculatePlayerMoney(player, newBet) {
    const actualPlayerMoney = player.getMoney || player.clientData.money;
    const updatedPlayerMoney = actualPlayerMoney - newBet;
    return updatedPlayerMoney < 0 ? actualPlayerMoney : updatedPlayerMoney;
  }
}

module.exports = new PlayersMoneyManager();
