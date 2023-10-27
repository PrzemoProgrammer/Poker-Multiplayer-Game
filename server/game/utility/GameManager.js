const PlayersCardsManager = require("./PlayersCardsManager");
const PlayersManager = require("./PlayersManager");
const SitPositionManager = require("../../game/utility/SitPositionManager");
const PlayersBetManager = require("./PlayersBetManager");
const PlayersGamePositionManager = require("./PlayersGamePositionManager");
const PlayersMoneyManager = require("./PlayersMoneyManager");
const PlayersTurnManager = require("./PlayersTurnManager");

const {
  MAX_PLAYERS,
  DEFAULT_PLAYER_GAME_POSITION,
  DEFAULT_PLAYER_BET_COUNT,
} = require("../config/gameConfig");

class GameManager {
  startGame() {
    const players = PlayersManager.getPlayersData();
    const playersGamePositions =
      PlayersGamePositionManager.updateGamePositions(players);
    const playersBets = PlayersBetManager.updateBets(
      playersGamePositions,
      players
    );
    const playersMoney = PlayersMoneyManager.updatePlayersMoney(
      playersBets,
      players
    );
    const playersTurn = PlayersTurnManager.calculatePlayerGameTurn(
      playersGamePositions,
      players
    );
    const drawCardsForPlayers = PlayersCardsManager.updateCards(players);

    //! update money in database

    console.log(playersGamePositions);
    console.log(playersBets);
    console.log(playersMoney);
    console.log(playersTurn);
    console.log(drawCardsForPlayers);

    return {
      playersGamePositions,
      playersBets,
      drawCardsForPlayers,
      playersMoney,
      playersTurn,
    };
  }

  addPlayerToGame(key, userDatabaseData) {
    const sitPosition = SitPositionManager.getEmptyPosition();
    const defaultUserData = { ...userDatabaseData };
    defaultUserData.id = key;
    defaultUserData.sit = sitPosition;
    defaultUserData.position = DEFAULT_PLAYER_GAME_POSITION;
    defaultUserData.bet = DEFAULT_PLAYER_BET_COUNT;

    PlayersManager.addPlayer(key, defaultUserData);
  }

  getPlayerFromGame(key) {
    return PlayersManager.getPlayer(key);
  }

  getPlayersFromGame() {
    return PlayersManager.getPlayersClientData();
  }

  getPlayerCountFromGame() {
    return PlayersManager.getPlayerCount();
  }

  deletePlayerFromGame(clientID) {
    const deletedPlayer = PlayersManager.getPlayer(clientID);
    SitPositionManager.releasePosition(deletedPlayer.sit);
    PlayersManager.deletePlayer(clientID);
    CardsManager.deletePlayerCards(clientID);
  }

  areMaxPlayers() {
    return PlayersManager.getPlayerCount() == MAX_PLAYERS;
  }
}

module.exports = new GameManager();
