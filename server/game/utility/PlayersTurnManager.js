// const { SIT_POSITIONS } = require("../config/gameConfig");
const PlayersManager = require("./PlayersManager");
const { GAME_POSITIONS, MAX_PLAYERS } = require("../config/gameConfig");

class PlayersTurnManager {
  constructor() {
    this.currentPlayerTurn = null;
  }

  setCurrentPlayerTurn(currentPlayerTurn) {
    this.currentPlayerTurn = currentPlayerTurn;
  }

  calculatePlayerGameTurn(playersGamePositions, players) {
    const bigBlindGamePosition = GAME_POSITIONS[2];
    let playersIdGameTurn = null;
    for (const playerId in players) {
      if (playersGamePositions[playerId].position === bigBlindGamePosition) {
        const bigBlindSitPosition = players[playerId].clientData.sit;
        const playerTurnSitPosition =
          this.calculateGamePlayerTurn(bigBlindSitPosition);
        playersIdGameTurn = this.getPlayersIdWithSitPosition(
          playerTurnSitPosition
        );
      }
    }

    return playersIdGameTurn;
  }

  getPlayersIdWithSitPosition(sitPosition) {
    const players = PlayersManager.getPlayers();
    const playersIdTurn = {};
    //Zobić tak ze jezeli kolejny gracz nie istneije to bierze kolejnego
    for (const playerId in players) {
      playersIdTurn[playerId] = {};
      if (players[playerId].playerData.clientData.sit === sitPosition) {
        playersIdTurn[playerId].turn = true;
        const playerIdTurn = players[playerId].getId();
        this.setCurrentPlayerTurn(playerIdTurn);
      } else {
        playersIdTurn[playerId].turn = false;
      }
    }

    return playersIdTurn;
  }

  getCurrentPlayerTurn() {
    return this.currentPlayerTurn;
  }

  calculateGamePlayerTurn(value) {
    let sit = value + 1;
    if (this.isMoreThanMaxPlayers(sit)) sit = 1;

    return sit;
  }

  isMoreThanMaxPlayers(value) {
    return value > MAX_PLAYERS;
  }
}

module.exports = new PlayersTurnManager();
