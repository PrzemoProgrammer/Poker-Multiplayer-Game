const PlayersCardsManager = require("./PlayersCardsManager");
const PlayersManager = require("./PlayersManager");
const SitPositionManager = require("../../game/utility/SitPositionManager");
const PlayersBetManager = require("./PlayersBetManager");
const PlayersGamePositionManager = require("./PlayersGamePositionManager");
const { MAX_PLAYERS } = require("../config/gameConfig");

class GameManager {
  startGame() {
    const players = PlayersManager.getPlayersData();
    const playersGamePositions =
      PlayersGamePositionManager.updateGamePositions(players);
    const playersBets = PlayersBetManager.updateBets(
      playersGamePositions,
      players
    );
    const drawCardsForPlayers = PlayersCardsManager.updateCards(players);

    //! update money in database

    console.log(playersGamePositions);
    console.log(playersBets);
    console.log(drawCardsForPlayers);

    return {
      playersGamePositions,
      playersBets,
      drawCardsForPlayers,
    };
  }

  addPlayerToGame(key, userDatabaseData) {
    const sitPosition = SitPositionManager.getEmptyPosition();
    const userData = { ...userDatabaseData };
    userData.id = key;
    userData.sit = sitPosition;
    userData.position = "player";
    userData.bet = 0;

    PlayersManager.addPlayer(key, userData);
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
