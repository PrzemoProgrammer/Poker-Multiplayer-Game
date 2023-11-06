const PlayersCardsManager = require("./PlayersCardsManager");
const PlayersManager = require("./PlayersManager");
const SitPositionManager = require("../../game/utility/SitPositionManager");
const PlayersBetManager = require("./PlayersBetManager");
const PlayersGamePositionManager = require("./PlayersGamePositionManager");
const PlayersMoneyManager = require("./PlayersMoneyManager");
const PlayersTurnManager = require("./PlayersTurnManager");
const CroupierCardsManager = require("./CroupierCardsManager");
const TableCardsManager = require("./TableCardsManager");
const GameTurnTimer = require("../gameTurn/GameTurnTimer");
const TableBetsManager = require("./TableBetsManager");
const RoundNameManager = require("./RoundNameManager");

const {
  MAX_PLAYERS,
  DEFAULT_PLAYER_GAME_POSITION,
  DEFAULT_PLAYER_BET_COUNT,
} = require("../config/gameConfig");

class GameManager {
  startGame() {
    const players = PlayersManager.getPlayersAllData();
    const playersGamePositions =
      PlayersGamePositionManager.initGamePositions(players);
    const playersBets = PlayersBetManager.initBets(
      playersGamePositions,
      players
    );
    const playersMoney = PlayersMoneyManager.updatePlayersMoney(
      playersBets,
      players
    );
    const playerIdGameTurn = PlayersTurnManager.initPlayerIdGameTurn(
      playersGamePositions,
      players
    );
    const drawCardsForPlayers = PlayersCardsManager.initCards(players);
    const { serverTime, turnRespondTime } = this.getGameTurnTimeData();
    TableBetsManager.addPlayersBets(playersBets);
    RoundNameManager.startPreflopRound();

    //! update money in database

    console.log(playersGamePositions);
    console.log(playersBets);
    console.log(playersMoney);
    console.log(playerIdGameTurn);
    console.log(drawCardsForPlayers);

    return {
      playersGamePositions,
      playersBets,
      drawCardsForPlayers,
      playersMoney,
      playerIdGameTurn,
      serverTime,
      turnRespondTime,
    };
  }

  addPlayerToGame(key, userDatabaseData) {
    const sitPosition = SitPositionManager.getEmptyPosition();
    const defaultUserData = { ...userDatabaseData };
    defaultUserData.id = key;
    defaultUserData.sit = sitPosition;
    defaultUserData.check = false;
    defaultUserData.position = DEFAULT_PLAYER_GAME_POSITION;
    defaultUserData.bet = DEFAULT_PLAYER_BET_COUNT;

    PlayersManager.addPlayer(key, defaultUserData);
  }

  startGameTurnTimer(callback) {
    // const playerGameTurnDuration = GameTurnTimer.getTurnRespondTime();
    // setTimeout(() => {
    GameTurnTimer.startTimer(() => {
      callback();
    });
    // }, playerGameTurnDuration * 1000);
  }

  changePlayerTurn() {
    const playerIdGameTurn = PlayersTurnManager.calculateNextPlayerIdTurn();
    const { serverTime, turnRespondTime } = this.getGameTurnTimeData();
    return { playerIdGameTurn, serverTime, turnRespondTime };
  }

  // didAllPlayersHadTurn() {
  //   return PlayersManager.didAllPlayersHadTurn();
  // }

  areAllPlayersDoneBetting() {
    const players = PlayersManager.getPlayersObject();
    const maxGameBet = PlayersManager.getBiggestBetFromPlayers();

    const areAllPlayersDoneBetting = Object.values(players).every(
      (player) =>
        player.playerData.clientData.bet === maxGameBet ||
        player.playerData.clientData.check === true ||
        (player.playerData.clientData.bet > 0 &&
          player.playerData.clientData.money === 0)
    );

    return areAllPlayersDoneBetting;
  }

  initNextRound(cardsCount) {
    const newCardsOnTable = CroupierCardsManager.getCardsFromDeck(cardsCount);
    TableCardsManager.addCards(newCardsOnTable);
    const betsInPool = TableBetsManager.getBets();
    const smallBlindPlayerData = PlayersManager.getSmallBLindPlayerData();
    const { playerIdGameTurn, sitPosition } = smallBlindPlayerData;
    PlayersTurnManager.setCurrentGameTurnPlayer(playerIdGameTurn, sitPosition);
    PlayersBetManager.resetPlayersBets();
    const { serverTime, turnRespondTime } = this.getGameTurnTimeData();
    RoundNameManager.startTurnRound();

    return {
      newCardsOnTable,
      betsInPool,
      playerIdGameTurn,
      serverTime,
      turnRespondTime,
    };
  }

  isPreflopRoundFinish() {
    return this.areAllPlayersDoneBetting() && RoundNameManager.isPreflopRound();
  }

  isFlopRoundFinish() {
    return this.areAllPlayersDoneBetting() && RoundNameManager.isFlopRound();
  }

  isTurnRoundFinish() {
    return this.areAllPlayersDoneBetting() && RoundNameManager.isTurnRound();
  }

  isRiverRoundFinish() {
    return this.areAllPlayersDoneBetting() && RoundNameManager.isRiverRound();
  }

  isGameWinner() {
    //get game winner
  }

  getGameTurnTimeData() {
    return GameTurnTimer.getTimeData();
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
    const player = PlayersManager.getPlayer(clientID);
    SitPositionManager.releasePosition(player.sit);
    PlayersManager.deletePlayer(clientID);
  }

  areMaxPlayers() {
    return PlayersManager.getPlayerCount() == MAX_PLAYERS;
  }
}

module.exports = new GameManager();
