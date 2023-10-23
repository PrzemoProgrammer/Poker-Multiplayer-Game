const CardsManager = require("../../game/utility/CardsManager");
const PlayersManager = require("./PlayersManager");
const SitPositionManager = require("../../game/utility/SitPositionManager");
const BetManager = require("../../game/utility/BetManager");
const GamePositionManager = require("../../game/utility/GamePositionManager");
const { MAX_PLAYERS, SIT_POSITIONS } = require("../../game/config");

class GameManager {
  constructor() {}

  startGame() {
    const players = PlayersManager.getPlayers();
    const playersGamePositions =
      GamePositionManager.getPlayersIDWithGamePositions(players);
    const playersBets = BetManager.calculateBetsOnStart(
      playersGamePositions,
      players
    );
    const betsInPot = BetManager.getBets();
    const drawCardsForPlayers = CardsManager.drawCardsForPlayers(players);

    console.log(playersGamePositions);
    console.log(playersBets);
    console.log(betsInPot);
    console.log(drawCardsForPlayers);

    return {
      playersGamePositions,
      playersBets,
      drawCardsForPlayers,
      betsInPot,
    };
    //! zupdatuj kwotę w bazie danych
  }

  addBetsToPol() {}

  drawGamePositions() {}
  //! /////////////////////////////////////////////////////////////////////////////////////
  addPlayerToGame(key, data) {
    PlayersManager.addPlayer(key, data);
  }

  getPlayerFromGame(key) {
    return PlayersManager.getPlayer(key);
  }

  getPlayersFromGame() {
    return PlayersManager.getPlayers();
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
