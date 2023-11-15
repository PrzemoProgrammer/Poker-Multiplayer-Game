const PlayersCardsManager = require("../players/cards/manager/PlayersCardsManager");
const PlayersManager = require("../players/manager/PlayersManager");
const PlayersSitPositionManager = require("../players/sitPosition/manager/PlayersSitPositionManager");
const PlayersBetManager = require("../players/bet/manager/PlayersBetManager");
const PlayersGamePositionManager = require("../players/gamePosition/manager/PlayersGamePositionManager");
const PlayersMoneyManager = require("../players/money/manager/PlayersMoneyManager");
const PlayersTurnManager = require("../players/turn/manager/PlayersTurnManager");
const CroupierCardsManager = require("../croupier/manager/CroupierCardsManager");
const TableCardsManager = require("../table/cards/manager/TableCardsManager");
const GameTurnTimer = require("../gameTurn/GameTurnTimer");
const TableBetsManager = require("../table/bets/manager/TableBetsManager");
const RoundNameManager = require("../round/manager/RoundNameManager");
const { BUTTON_TYPES } = require("../config/gameConfig");

const {
  MAX_PLAYERS,
  DEFAULT_PLAYER_GAME_POSITION,
  DEFAULT_PLAYER_BET_COUNT,
} = require("../config/gameConfig");

class GameManager {
  startGame() {
    const players = PlayersManager.getPlayersAllData;
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
    const { serverTime, turnRespondTime } = this.getGameTurnTimeData;
    TableBetsManager.addPlayersBets(playersBets);
    RoundNameManager.updateNextRound();

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
    const sitPosition = PlayersSitPositionManager.getEmptyPosition;
    const defaultUserData = { ...userDatabaseData };
    defaultUserData.id = key;
    defaultUserData.sit = sitPosition;
    defaultUserData.check = false;
    defaultUserData.position = DEFAULT_PLAYER_GAME_POSITION;
    defaultUserData.bet = DEFAULT_PLAYER_BET_COUNT;

    PlayersManager.addPlayer(key, defaultUserData);
  }

  startGameTurnTimer(callback) {
    GameTurnTimer.stopTimer();
    GameTurnTimer.startTimer(() => {
      callback();
    });
  }

  changePlayerTurn() {
    const playerIdGameTurn = PlayersTurnManager.calculateNextPlayerIdTurn();
    const { serverTime, turnRespondTime } = this.getGameTurnTimeData;
    return { playerIdGameTurn, serverTime, turnRespondTime };
  }

  get areAllPlayersDoneBetting() {
    const players = PlayersManager.getPlayersObject;
    const maxGameBet = PlayersManager.getBiggestBetFromPlayers;

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
    const betsInPool = TableBetsManager.getBets;
    const smallBlindPlayerData = PlayersManager.getSmallBLindPlayerData;
    const { playerIdGameTurn, sitPosition } = smallBlindPlayerData;
    PlayersTurnManager.setCurrentGameTurnPlayer(playerIdGameTurn, sitPosition);
    PlayersBetManager.resetPlayersBets();
    const { serverTime, turnRespondTime } = this.getGameTurnTimeData;
    RoundNameManager.updateNextRound();
    PlayersManager.resetPlayersSigns();

    return {
      newCardsOnTable,
      betsInPool,
      playerIdGameTurn,
      serverTime,
      turnRespondTime,
    };
  }

  playerTurnAction(clientId, clientData) {
    const { action, data } = clientData;
    const [fold, check, call, raise, bet] = BUTTON_TYPES;
    const respondData = { playerId: "", type: "", bet: null, money: null };

    if (action === check) {
      PlayersManager.setPlayerCheckStatus(clientId, true);
      respondData.playerId = clientId;
      respondData.type = check;
    }
    if (action === bet) {
      PlayersMoneyManager.updatePlayerMoney(clientId, data);
      const playerMoney = PlayersManager.getPlayerMoney(clientId);
      PlayersBetManager.updateBetOnServer(clientId, data);
      TableBetsManager.addBetToPot(data);
      const newBet = PlayersManager.getPlayerBet(clientId);
      respondData.playerId = clientId;
      respondData.type = bet;
      respondData.bet = newBet;
      respondData.money = playerMoney;
      //! update money in database
    }

    return respondData;
  }

  isCurrentPlayerTurn(clientId) {
    return PlayersTurnManager.isCurrentPlayerTurn(clientId);
  }

  get isPreflopRoundFinish() {
    return this.areAllPlayersDoneBetting && RoundNameManager.isPreflopRound;
  }

  get isFlopRoundFinish() {
    return this.areAllPlayersDoneBetting && RoundNameManager.isFlopRound;
  }

  get isTurnRoundFinish() {
    return this.areAllPlayersDoneBetting && RoundNameManager.isTurnRound;
  }

  get isRiverRoundFinish() {
    return this.areAllPlayersDoneBetting && RoundNameManager.isRiverRound;
  }

  getGameResult() {
    const playersCards = PlayersManager.getPlayersCards;
    const tableCards = TableCardsManager.getTableCards;
    const winnerPlayerId = "";
    const betsInPool = null;
    const winnerPlayerMoney = null;
    // console.log(playersCards);
    // console.log(tableCards);

    return { playersCards, winnerPlayerId, betsInPool, winnerPlayerMoney };
    //! reset game
  }

  isGameWinner() {
    //get game winner
  }

  get getGameTurnTimeData() {
    return GameTurnTimer.getTimeData();
  }

  getPlayerFromGame(key) {
    return PlayersManager.getPlayerClientData(key);
  }

  get getPlayersFromGame() {
    return PlayersManager.getPlayersClientData;
  }

  deletePlayerFromGame(clientID) {
    const player = PlayersManager.getPlayerClientData(clientID);
    PlayersSitPositionManager.releasePosition(player.sit);
    PlayersManager.deletePlayer(clientID);
  }

  get areMaxPlayers() {
    return PlayersManager.getPlayerCount == MAX_PLAYERS;
  }
}

module.exports = new GameManager();
