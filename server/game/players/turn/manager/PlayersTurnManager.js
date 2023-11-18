const PlayersManager = require("../../manager/PlayersManager");
const CurrentPlayerTurnStorage = require("../../../storage/CurrentPlayerTurnStorage");
const GamePlayersSitPositionsStorage = require("../../../storage/PlayersSitPositionsStorage");
const { GAME_POSITIONS, MAX_PLAYERS } = require("../../../config/gameConfig");

module.exports = class PlayersTurnManager {
  static initPlayerIdGameTurn(playersGamePositions, players) {
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

  static calculateNextPlayerIdTurn() {
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

  static getNextPlayerSitPositionGameTurn() {
    //dokończyć
    const currentPlayerSitPositionGameTurn =
      CurrentPlayerTurnStorage.getSitPosition;

    let nextPlayerSitPositionGameTurn =
      this.calculateNextPlayerSitPositionGameTurn(
        currentPlayerSitPositionGameTurn
      );

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

  static calculatePlayerIdGameTurn(playersGamePositions, players) {
    const playerSitPositionGameTurn = this.getPlayerSitPositionGameTurn(
      playersGamePositions,
      players
    );

    return this.getPlayerIdGameTurn(playerSitPositionGameTurn);
  }

  static getPlayerSitPositionGameTurn(playersGamePositions, players) {
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

  static getPlayerIdGameTurn(playerSitPositionGameTurn) {
    const players = PlayersManager.getPlayersObject;
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

  static setCurrentGameTurnPlayer(playerId, playerSitPosition) {
    CurrentPlayerTurnStorage.setPlayerData(playerId, playerSitPosition);
  }

  static calculateNextPlayerSitPositionGameTurn(value) {
    let sit = value + 1;
    if (this.isMoreThanMaxPlayers(sit)) sit = 1;

    return sit;
  }

  static isMoreThanMaxPlayers(value) {
    return value > MAX_PLAYERS;
  }

  static isCurrentPlayerTurn(playerId) {
    return playerId === CurrentPlayerTurnStorage.getId;
  }
};
