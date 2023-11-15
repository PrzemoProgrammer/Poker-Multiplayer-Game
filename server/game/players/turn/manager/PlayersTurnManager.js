const PlayersManager = require("../../manager/PlayersManager");
const CurrentPlayerTurnStorage = require("../../../storage/CurrentPlayerTurnStorage");
const GamePlayersSitPositionsStorage = require("../../../storage/PlayersSitPositionsStorage");
const { GAME_POSITIONS, MAX_PLAYERS } = require("../../../config/gameConfig");

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

  setCurrentGameTurnPlayer(playerId, playerSitPosition) {
    CurrentPlayerTurnStorage.setPlayerData(playerId, playerSitPosition);
  }

  calculateNextPlayerSitPositionGameTurn(value) {
    let sit = value + 1;
    if (this.isMoreThanMaxPlayers(sit)) sit = 1;

    return sit;
  }

  isMoreThanMaxPlayers(value) {
    return value > MAX_PLAYERS;
  }

  isCurrentPlayerTurn(playerId) {
    return playerId === CurrentPlayerTurnStorage.getId;
  }
}

module.exports = new PlayersTurnManager();
