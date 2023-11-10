const PlayersManager = require("./PlayersManager");
const CurrentPlayerTurnStorage = require("../../gameTurn/CurrentPlayerTurnStorage");
const GamePlayersSitPositionsStorage = require("../storage/PlayersSitPositionsStorage");
const { GAME_POSITIONS, MAX_PLAYERS } = require("../../config/gameConfig");

class PlayersTurnManager {
  initPlayerIdGameTurn(playersGamePositions, players) {
    const playerSitPositionGameTurn = this.getPlayerSitPositionGameTurn(
      playersGamePositions,
      players
    );
    const playerIdGameTurn = this.getPlayerIdGameTurn(
      playerSitPositionGameTurn
    );
    CurrentPlayerTurnStorage.setPlayerData(
      playerIdGameTurn,
      playerSitPositionGameTurn
    );

    return playerIdGameTurn;
  }

  calculateNextPlayerIdTurn() {
    const nextPlayerSitPositionGameTurn =
      this.getNextPlayerSitPositionGameTurn();
    const playerIdGameTurn = this.getPlayerIdGameTurn(
      nextPlayerSitPositionGameTurn
    );
    CurrentPlayerTurnStorage.setPlayerData(
      playerIdGameTurn,
      nextPlayerSitPositionGameTurn
    );

    return playerIdGameTurn;
  }

  getNextPlayerSitPositionGameTurn() {
    //dokończyć
    const currentPlayerSitPositionGameTurn =
      CurrentPlayerTurnStorage.getSitPosition();

    let nextPlayerSitPositionGameTurn =
      this.calculateNextPlayerSitPositionGameTurn(
        currentPlayerSitPositionGameTurn
      );

    // console.log("LICZY NEXT PLAYERA");
    // console.log("Aktualny gracz", currentPlayerSitPositionGameTurn);
    // console.log("Drugi gracz", nextPlayerSitPositionGameTurn);

    // let gameFreeSitPositions = GamePlayersSitPositionsStorage.getSitPositions();
    // let containsNumber = gameFreeSitPositions.includes(
    //   nextPlayerSitPositionGameTurn
    // );

    // while (containsNumber) {
    //   nextPlayerSitPositionGameTurn =
    //     this.calculateNextPlayerSitPositionGameTurn(
    //       nextPlayerSitPositionGameTurn
    //     );

    //   containsNumber = gameFreeSitPositions.includes(
    //     nextPlayerSitPositionGameTurn
    //   );
    // }

    // if(!containsNumber) {
    //   return
    // } else {
    //    nextPlayerSitPositionGameTurn = this.calculateNextPlayerSitPositionGameTurn(
    //     nextPlayerSitPositionGameTurn
    //   );

    //   if(nextPlayerSitPositionGameTurn) {
    //     return
    //   } else {
    //      nextPlayerSitPositionGameTurn = this.calculateNextPlayerSitPositionGameTurn(
    //       nextPlayerSitPositionGameTurn
    //     );
    //   }
    // }

    //sprawdzić czy sitnieje w playerach na serverze
    //jeśli istnieje to zwrócić jego sitPosition
    //jesli NIE istnieje obliczyć kolejny nextPlayerSitPositionGameTurn
    //Spradzić czy istnieje w playerach......

    return nextPlayerSitPositionGameTurn;
  }

  // calculatePlayerSitPositionGameTurn() {}

  calculatePlayerIdGameTurn(playersGamePositions, players) {
    const playerSitPositionGameTurn = this.getPlayerSitPositionGameTurn(
      playersGamePositions,
      players
    );

    return this.getPlayerIdGameTurn(playerSitPositionGameTurn);
  }

  getPlayerSitPositionGameTurn(playersGamePositions, players) {
    const bigBlindGamePosition = GAME_POSITIONS[2];
    let playerSitPositionGameTurn = null;
    for (const playerId in players) {
      if (playersGamePositions[playerId].position === bigBlindGamePosition) {
        const bigBlindSitPosition = players[playerId].clientData.sit;
        playerSitPositionGameTurn =
          this.calculateNextPlayerSitPositionGameTurn(bigBlindSitPosition);
      }
    }

    return playerSitPositionGameTurn;
  }

  getPlayerIdGameTurn(playerSitPositionGameTurn) {
    const players = PlayersManager.getPlayersObject();
    let playerIdGameTurn = null;
    for (const playerId in players) {
      if (
        players[playerId].playerData.clientData.sit ===
        playerSitPositionGameTurn
      ) {
        playerIdGameTurn = playerId;
      }
    }
    return playerIdGameTurn;
  }

  setCurrentGameTurnPlayer(playerId, playerSitPosition) {
    CurrentPlayerTurnStorage.setPlayerData(playerId, playerSitPosition);
  }

  // getPlayersIdObjectWithGameTurn(playerSitPositionGameTurn) {
  //   const players = PlayersManager.getPlayersObject();
  //   const playersIdTurn = {};
  //   for (const playerId in players) {
  //     playersIdTurn[playerId] = {};
  //     if (
  //       players[playerId].playerData.clientData.sit ===
  //       playerSitPositionGameTurn
  //     ) {
  //       playersIdTurn[playerId].turn = true;
  //       const playerID = players[playerId].getId();
  //       const playerSitPosition = players[playerId].getSitPosition();
  //       GameTurn.setCurrentPlayerTurn(playerID, playerSitPosition);
  //     } else {
  //       playersIdTurn[playerId].turn = false;
  //     }
  //   }

  //   return playersIdTurn;
  // }

  calculateNextPlayerSitPositionGameTurn(value) {
    let sit = value + 1;
    if (this.isMoreThanMaxPlayers(sit)) sit = 1;

    return sit;
  }

  isMoreThanMaxPlayers(value) {
    return value > MAX_PLAYERS;
  }

  isCurrentPlayerTurn(playerId) {
    return playerId === CurrentPlayerTurnStorage.getId();
  }
}

module.exports = new PlayersTurnManager();

// const PlayersManager = require("./PlayersManager");
// const GameTurn = require("../gameTurn/GameTurn");
// const GamePlayersSitPositionsStorage = require("../utility/PlayersSitPositionsStorage");
// const { GAME_POSITIONS, MAX_PLAYERS } = require("../config/gameConfig");

// class PlayersTurnManager {
//   calculateNextPlayersTurn() {
//     const nextPlayerSitPositionGameTurn =
//       this.getNextPlayerSitPositionGameTurn();

//     return this.getPlayersIdObjectWithGameTurn(nextPlayerSitPositionGameTurn);
//   }

//   getNextPlayerSitPositionGameTurn() {
//     //dokończyć
//     const currentPlayerSitPositionGameTurn =
//       GameTurn.getCurrentTurnPlayerSitPosition();

//     let nextPlayerSitPositionGameTurn =
//       this.calculateNextPlayerSitPositionGameTurn(
//         currentPlayerSitPositionGameTurn
//       );

//     let gameFreeSitPositions = GamePlayersSitPositionsStorage.getSitPositions();
//     let containsNumber = gameFreeSitPositions.includes(
//       nextPlayerSitPositionGameTurn
//     );

//     while (containsNumber) {
//       nextPlayerSitPositionGameTurn =
//         this.calculateNextPlayerSitPositionGameTurn(
//           nextPlayerSitPositionGameTurn
//         );

//       containsNumber = gameFreeSitPositions.includes(
//         nextPlayerSitPositionGameTurn
//       );
//     }

//     // if(!containsNumber) {
//     //   return
//     // } else {
//     //    nextPlayerSitPositionGameTurn = this.calculateNextPlayerSitPositionGameTurn(
//     //     nextPlayerSitPositionGameTurn
//     //   );

//     //   if(nextPlayerSitPositionGameTurn) {
//     //     return
//     //   } else {
//     //      nextPlayerSitPositionGameTurn = this.calculateNextPlayerSitPositionGameTurn(
//     //       nextPlayerSitPositionGameTurn
//     //     );
//     //   }
//     // }

//     //sprawdzić czy sitnieje w playerach na serverze
//     //jeśli istnieje to zwrócić jego sitPosition
//     //jesli NIE istnieje obliczyć kolejny nextPlayerSitPositionGameTurn
//     //Spradzić czy istnieje w playerach......

//     return nextPlayerSitPositionGameTurn;
//   }

//   calculatePlayersGameTurn(playersGamePositions, players) {
//     const playerSitPositionGameTurn = this.getPlayerSitPositionGameTurn(
//       playersGamePositions,
//       players
//     );

//     return this.getPlayersIdObjectWithGameTurn(playerSitPositionGameTurn);
//   }

//   getPlayerSitPositionGameTurn(playersGamePositions, players) {
//     const bigBlindGamePosition = GAME_POSITIONS[2];
//     let playerSitPositionGameTurn = null;
//     for (const playerId in players) {
//       if (playersGamePositions[playerId].position === bigBlindGamePosition) {
//         const bigBlindSitPosition = players[playerId].clientData.sit;
//         playerSitPositionGameTurn =
//           this.calculateNextPlayerSitPositionGameTurn(bigBlindSitPosition);
//       }
//     }

//     return playerSitPositionGameTurn;
//   }

//   // getPlayersIdObjectWithGameTurn(playerSitPositionGameTurn) {
//   //   const players = PlayersManager.getPlayersObject();
//   //   const playersIdTurn = {};
//   //   for (const playerId in players) {
//   //     playersIdTurn[playerId] = {};
//   //     if (
//   //       players[playerId].playerData.clientData.sit ===
//   //       playerSitPositionGameTurn
//   //     ) {
//   //       playersIdTurn[playerId].turn = true;
//   //       const playerID = players[playerId].getId();
//   //       const playerSitPosition = players[playerId].getSitPosition();
//   //       GameTurn.setCurrentPlayerTurn(playerID, playerSitPosition);
//   //     } else {
//   //       playersIdTurn[playerId].turn = false;
//   //     }
//   //   }

//   //   return playersIdTurn;
//   // }

//   GetCurrentGameTurnPlayerSitPosition() {
//     //usuunac
//     return GameTurn.getCurrentTurnPlayerSitPosition();
//   }

//   calculateNextPlayerSitPositionGameTurn(value) {
//     let sit = value + 1;
//     if (this.isMoreThanMaxPlayers(sit)) sit = 1;

//     return sit;
//   }

//   isMoreThanMaxPlayers(value) {
//     return value > MAX_PLAYERS;
//   }
// }

// module.exports = new PlayersTurnManager();
