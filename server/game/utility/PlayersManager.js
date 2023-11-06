const Players = require("../players/Players");
const Player = require("../players/Player");
const { GAME_POSITIONS } = require("../config/gameConfig");

class PlayersManager {
  addPlayer(key, clientData) {
    const player = new Player(clientData);
    Players.addPlayer(key, player);
  }

  updatePlayerCards(playerId, newPlayerCards) {
    const player = Players.getPlayer(playerId);
    player.updateCards(newPlayerCards);
  }

  updatePlayerMoney(playerId, updatedPlayerMoney) {
    const player = Players.getPlayer(playerId);
    player.updateMoney(updatedPlayerMoney);
  }

  updatePlayerGamePosition(playerId, newPlayerGamePosition) {
    const player = Players.getPlayer(playerId);
    player.updateGamePosition(newPlayerGamePosition);
  }

  updatePlayerBet(playerId, newPlayerBet) {
    const player = Players.getPlayer(playerId);
    player.updateBet(newPlayerBet);
  }

  // updatePlayerTurn(playerId, turn) {
  //   const player = Players.getPlayer(playerId);
  //   player.updateTurn(turn);
  // }

  getBiggestBetFromPlayers() {
    const players = this.getPlayersObject();
    const playersBets = [];

    for (const playerId in players) {
      const playerBets = players[playerId].getBet();
      playersBets.push(playerBets);
    }

    const maxGameBet = Math.max(...playersBets);
    return maxGameBet;
  }

  getSmallBLindPlayerData() {
    const players = this.getPlayersObject();
    const smallBlindPlayerData = {};
    for (const playerId in players) {
      const playerGamePosition = players[playerId].getGamePosition();
      if (playerGamePosition === GAME_POSITIONS[1]) {
        const playerSitPosition = players[playerId].getSitPosition();
        smallBlindPlayerData.playerIdGameTurn = playerId;
        smallBlindPlayerData.sitPosition = playerSitPosition;
      }
    }

    return smallBlindPlayerData;
  }

  // getSumPlayersBets() {
  //   const players = this.getPlayersObject();

  //   let betsSum = 0;
  //   for (const playerId in players) {
  //     const playerBets = players[playerId].getBet();
  //     betsSum += playerBets;
  //   }

  //   return betsSum;
  // }

  // checkEqualBets(){
  //   const maxGameBet = this.getBiggestBetFromPlayers()

  //   // const playersArray = Object.values(players)

  //   // for(let i = 0; i < playersArray.length; i++) {
  //   //   const player = playersArray[i]
  //   //   const playerBet = player.getBet()
  //   //   const playerMoney = player.getMoney()
  //   //   if(playerBet === maxGameBet || (playerBet > 0 && playerMoney === 0)) {
  //   //     return true
  //   //   } else {
  //   //     return false
  //   //   }

  //   //   }
  //   // }

  //   const areAllPlayersBetEqual = Object.values(players).every(
  //     (player) => player.getBet() === maxGameBet || player.isCheck() === true || (player.getBet() > 0 &&  player.getMoney() === 0)
  //   );

  //   return areAllPlayersBetEqual
  // }

  // didAllPlayersHadTurn() {
  //   const players = this.getPlayersObject();
  //   console.log(players);
  //   const allPlayersHadTurn = Object.values(players).every(
  //     (player) => player.playerData.clientData.turn === true
  //   );
  //   return allPlayersHadTurn;
  // }

  getPlayers() {
    return Players.getPlayers();
  }

  getPlayersObject() {
    const playersMap = Players.getPlayers();
    const playersToObject = Object.fromEntries(playersMap);

    return playersToObject;
  }

  getPlayersClientData() {
    const players = this.getPlayersObject();
    const playersClientData = {};
    for (const key in players) {
      playersClientData[key] = players[key].getClientData();
    }

    return playersClientData;
  }

  getPlayersAllData() {
    const players = this.getPlayersObject();
    const playersData = {};
    for (const key in players) {
      playersData[key] = players[key].getData();
    }

    return playersData;
  }

  getPlayer(key) {
    const player = Players.getPlayer(key);
    const playerClientData = player.getClientData();
    return playerClientData;
  }

  getPlayerCount() {
    return Players.getPlayerCount();
  }

  deletePlayer(clientID) {
    Players.deletePlayer(clientID);
  }
}

module.exports = new PlayersManager();
