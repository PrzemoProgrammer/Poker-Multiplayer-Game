const PlayersStorage = require("../storage/PlayersStorage");
const Player = require("../player/Player");
const { GAME_POSITIONS } = require("../../config/gameConfig");

module.exports = class PlayersManager {
  constructor() {
    this.playersStorage = new PlayersStorage();
  }

  addPlayer(key, clientData, hashedPassword) {
    const player = new Player(clientData);
    player.databaseID = hashedPassword;
    this.playersStorage.addPlayer(key, player);
  }

  addExistingPlayer(key, player) {
    this.playersStorage.addPlayer(key, player);
  }

  updatePlayerCards(playerId, newPlayerCards) {
    const player = this.getPlayer(playerId);
    player.updateCards = newPlayerCards;
  }

  updatePlayerMoney(playerId, updatedPlayerMoney) {
    const player = this.getPlayer(playerId);
    player.updateMoney = updatedPlayerMoney;
  }

  updatePlayerChips(playerId, updatedPlayerMoney) {
    const player = this.getPlayer(playerId);
    player.updateChips = updatedPlayerMoney;
  }

  updatePlayerGamePosition(playerId, newPlayerGamePosition) {
    const player = this.getPlayer(playerId);
    player.updateGamePosition = newPlayerGamePosition;
  }

  updatePlayerBet(playerId, newPlayerBet) {
    const player = this.getPlayer(playerId);
    player.updateBet = newPlayerBet;
  }

  get getBiggestBetFromPlayers() {
    const players = this.getPlayersObject;
    const playersBets = [];
    for (const playerId in players) {
      const playerBets = players[playerId].getBet;
      playersBets.push(playerBets);
    }
    const maxGameBet = Math.max(...playersBets);
    return maxGameBet;
  }

  setPlayerAllIn(playerId, value) {
    const player = this.getPlayer(playerId);
    player.allIn = value;
  }

  get playersMoney() {
    const players = this.getPlayersObject;
    const playersMoney = {};
    for (const key in players) {
      playersMoney[key] = this.getPlayerMoney(key);
    }
    return playersMoney;
  }

  getPlayerNickname(playerID) {
    return this.getPlayer(playerID).nickname;
  }

  // get getSmallBLindPlayerData() {
  //   const players = this.getPlayersObject;
  //   const smallBlindPlayerData = {};
  //   for (const playerId in players) {
  //     const playerGamePosition = players[playerId].getGamePosition;
  //     if (playerGamePosition === GAME_POSITIONS[1]) {
  //       const playerSitPosition = players[playerId].getSitPosition;
  //       smallBlindPlayerData.playerIdGameTurn = playerId;
  //       smallBlindPlayerData.sitPosition = playerSitPosition;
  //     }
  //   }
  //   return smallBlindPlayerData;
  // }

  // get getDealerPlayerData() {
  //   const players = this.getPlayersObject;
  //   const dealerPlayerData = {};
  //   for (const playerId in players) {
  //     const playerGamePosition = players[playerId].getGamePosition;
  //     if (playerGamePosition === GAME_POSITIONS[0]) {
  //       const playerSitPosition = players[playerId].getSitPosition;
  //       dealerPlayerData.playerIdGameTurn = playerId;
  //       dealerPlayerData.sitPosition = playerSitPosition;
  //     }
  //   }
  //   return dealerPlayerData;
  // }

  // getPlayerWithGamePositionOrNext(gamePosition) {
  //   const players = this.getPlayersObject;
  //   let player = null;
  //   for (const playerId in players) {
  //     const player = players[playerId];

  //     const playerTableSitPosition = players[playerId].sit;
  //     if (playerGamePosition === GAME_POSITIONS[0]) {
  //       const playerSitPosition = players[playerId].getSitPosition;
  //       dealerPlayerData.playerIdGameTurn = playerId;
  //       dealerPlayerData.sitPosition = playerSitPosition;
  //     }
  //   }
  //   return dealerPlayerData;

  //   // const players = this.getPlayersObject;
  //   // const dealerPlayerData = {};
  //   // for (const playerId in players) {
  //   //   const playerGamePosition = players[playerId].getGamePosition;
  //   //   if (playerGamePosition === GAME_POSITIONS[0]) {
  //   //     const playerSitPosition = players[playerId].getSitPosition;
  //   //     dealerPlayerData.playerIdGameTurn = playerId;
  //   //     dealerPlayerData.sitPosition = playerSitPosition;
  //   //   }
  //   // }
  //   // return dealerPlayerData;
  // }

  get getPlayers() {
    return this.playersStorage.getPlayers;
  }

  getPlayer(playerId) {
    return this.playersStorage.getPlayer(playerId);
  }

  get getPlayersObject() {
    const playersMap = this.getPlayers;
    const playersToObject = Object.fromEntries(playersMap);
    return playersToObject;
  }

  get getPlayersClientData() {
    const players = this.getPlayersObject;
    const playersClientData = {};
    for (const key in players) {
      playersClientData[key] = players[key].getClientData;
    }
    return playersClientData;
  }

  get getPlayersAllData() {
    const players = this.getPlayersObject;
    const playersData = {};
    for (const key in players) {
      playersData[key] = players[key].getData;
    }
    return playersData;
  }

  getPlayerClientData(playerId) {
    const player = this.getPlayer(playerId);
    const playerClientData = player.getClientData;
    return playerClientData;
  }

  get getPlayerCount() {
    return this.playersStorage.getPlayerCount;
  }

  deletePlayer(clientID) {
    this.playersStorage.deletePlayer(clientID);
  }

  setPlayerCheckStatus(playerId, value) {
    const player = this.getPlayer(playerId);
    if (player) player.setCheckStatus = value;
  }

  isPlayerAllIn(playerId) {
    const player = this.getPlayer(playerId);
    return player.isAllIn;
  }

  get areAllPlayersAllIn() {
    const players = this.getPlayersObject;
    const areAllPlayersAllIn = Object.values(players).every(
      (player) => player.playerData.clientData.allIn === true
    );
    return areAllPlayersAllIn;
  }

  getPlayerIDAllInPlayers() {
    const allInPlayersID = [];
    const players = this.getPlayersObject;
    for (const key in players) {
      const player = players[key];
      if (player.isAllIn) {
        const playerID = player.getId;
        allInPlayersID.push(playerID);
      }
    }

    return allInPlayersID;
  }

  // //! /////////////////////////////////////////////////
  // setPlayerTakeAction(playerID, value) {
  //   const player = this.getPlayer(playerID);
  //   player.takeAction = value;
  // }

  // isPlayerTakeAction(playerID) {
  //   const player = this.getPlayer(playerID);
  //   return player.takeAction;
  // }

  // resetPlayerAction(playerID) {
  //   const players = this.getPlayersObject;
  //   const player = players[playerID];
  //   player.takeAction = false;
  // }
  // //! /////////////////////////////////////////////////

  resetPlayersSigns() {
    const players = this.getPlayersObject;
    for (const key in players) {
      this.setPlayerCheckStatus(key, false);
    }
  }

  resetPlayersData() {
    const players = this.getPlayersObject;
    for (const playerKey in players) {
      this.setPlayerCheckStatus(playerKey, false);
      this.setPlayerAllIn(playerKey, false);
      this.updatePlayerGamePosition(playerKey, "player");
      this.updatePlayerCards(playerKey, []);
    }
  }

  getPlayerBet(playerId) {
    const player = this.getPlayer(playerId);
    return player.getBet;
  }

  getPlayerMoney(playerId) {
    const player = this.getPlayer(playerId);
    return player.getMoney;
  }

  getPlayerChips(playerId) {
    const player = this.getPlayer(playerId);
    return player.getChips;
  }

  get getPlayersCards() {
    const players = this.getPlayersObject;
    const playersCards = {};
    for (const key in players) {
      playersCards[key] = players[key].getCards;
    }
    return playersCards;
  }

  get areAllPlayersCheck() {
    const players = this.getPlayersObject;
    const areAllPlayersCheck = Object.values(players).every(
      (player) => player.playerData.clientData.check === true
    );
    return areAllPlayersCheck;
  }

  calculateBetDifferenceToHightest(clientId) {
    const maxGameBet = this.getBiggestBetFromPlayers;
    const playerBet = this.getPlayerBet(clientId);
    return maxGameBet - playerBet;
  }

  getPlayersTableSitPositions() {
    const players = this.getPlayersObject;
    const playersTableSitPositions = [];
    for (const playerID in players) {
      const playerSitTablePosition = players[playerID].getSitPosition;
      playersTableSitPositions.push(playerSitTablePosition);
    }
    return playersTableSitPositions;

    // const playersTableSitPositions = {};
    // for (const playerID in players) {
    //   playersTableSitPositions[key] = players[playerID].getSitPosition;
    // }
    // return playersTableSitPositions;
  }
};
