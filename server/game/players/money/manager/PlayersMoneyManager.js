const PlayersManager = require("../../manager/PlayersManager");

module.exports = class PlayersMoneyManager {
  static updatePlayersMoney(playersBets, players) {
    const updatedPlayersMoney = this.calculatePlayersMoney(
      playersBets,
      players
    );
    this.updatePlayersMoneyOnServer(updatedPlayersMoney);
    return updatedPlayersMoney;
  }

  static updatePlayersMoneyOnServer(updatedPlayersMoney) {
    for (const playerId in updatedPlayersMoney) {
      const updatedPlayerMoney = updatedPlayersMoney[playerId].money;
      this.updatePlayerMoneyOnServer(playerId, updatedPlayerMoney);
    }
  }

  static updatePlayerMoneyOnServer(playerId, updatedPlayerMoney) {
    PlayersManager.updatePlayerMoney(playerId, updatedPlayerMoney);
  }

  static calculatePlayersMoney(playersBets, players) {
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

  static updatePlayerMoney(playerId, newBet) {
    const player = PlayersManager.getPlayer(playerId);
    const updatedPlayerMoney = this.calculatePlayerMoney(player, newBet);
    this.updatePlayerMoneyOnServer(playerId, updatedPlayerMoney);
    return updatedPlayerMoney;
  }

  static calculatePlayerMoney(player, newBet) {
    const actualPlayerMoney = player.getMoney || player.clientData.money;
    const updatedPlayerMoney = actualPlayerMoney - newBet;
    return updatedPlayerMoney < 0 ? actualPlayerMoney : updatedPlayerMoney;
  }
};
