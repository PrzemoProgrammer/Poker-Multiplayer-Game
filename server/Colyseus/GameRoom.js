const { Room } = require("colyseus");
const databaseManager = require("../MongoDB/DatabaseManager");
const GameManager = require("../game/manager/GameManager");
const JWT = require("../JWT/JWTManager");

class GameRoom extends Room {
  onCreate(options) {
    console.log("Game room created:", options);
    this.setupListeners();
  }

  async onJoin(client, options) {
    if (GameManager.areMaxPlayers) {
      client.send("announcement", { message: "Room is full" });
      return;
    }

    try {
      const clientID = client.sessionId;
      console.log(`User with session ID ${clientID} has joined the game.`);

      const { authToken } = options;
      const hashedPassword = JWT.decode(authToken);

      const userDatabaseData = await databaseManager
        .findPlayer({ passwordHash: hashedPassword })
        .select("-_id -passwordHash -__v")
        .lean();

      GameManager.addPlayerToGame(clientID, userDatabaseData);
      const joinedPlayer = GameManager.getPlayerFromGame(clientID);
      const allPlayers = GameManager.getPlayersFromGame;

      client.send("getPlayers", allPlayers);
      this.broadcast("playerJoined", joinedPlayer, { except: clientID });

      if (GameManager.areMaxPlayers) {
        setTimeout(() => {
          this.startGame();
        }, 1000);
      }
    } catch (error) {
      console.error(
        "An error occurred while processing the client join request:",
        error
      );
    }
  }

  startGame() {
    const {
      playersGamePositions,
      playersBets,
      playersMoney,
      drawCardsForPlayers,
      playerIdGameTurn,
      serverTime,
      turnRespondTime,
    } = GameManager.startGame();

    for (const clientId in drawCardsForPlayers) {
      const clientCards = drawCardsForPlayers[clientId];
      const drawCards = {};
      drawCards[clientId] = {};
      drawCards[clientId] = clientCards.cards;

      const mergedGameData = {
        players: {
          playersGamePositions: playersGamePositions,
          playersBets: playersBets,
          playersMoney: playersMoney,
          drawCards: drawCards,
        },
        game: {
          playerTurnData: {
            playerIdGameTurn,
            serverTime,
            turnRespondTime,
          },
        },
      };

      this.sendMessageToClientID(clientId, "initPreflopRound", mergedGameData);
    }

    this.startGameTurnTimer();
  }

  updateGameRound() {
    console.log("actual is preflop round");
    if (GameManager.isPreflopRoundFinish) {
      this.initFlopRound();
    } else if (GameManager.isFlopRoundFinish) {
      this.initTurnRound();
    } else if (GameManager.isTurnRoundFinish) {
      this.initRiverRound();
    } else if (GameManager.isRiverRoundFinish) {
      this.initGameResult();
      return;
    }

    //! ////////////////////// RESET GAME ////////////////////////////////
    // if (GameManager.isGameWinner()) {
    //   this.broadcast("initLobby", mergedGameData);
    // }
    //! //////////////// CHANGE PLAYER TURN /////////////////////////////////
    this.updatePlayerTurn();
  }

  initFlopRound() {
    console.log("init game flop");
    const {
      newCardsOnTable,
      betsInPool,
      playerIdGameTurn,
      serverTime,
      turnRespondTime,
    } = GameManager.initNextRound(3);

    const mergedGameData = {
      game: {
        tableBets: betsInPool,
        tableCards: newCardsOnTable,
        playerTurnData: {
          playerIdGameTurn,
          serverTime,
          turnRespondTime,
        },
      },
    };
    this.broadcast("initNextRound", mergedGameData);
  }

  initTurnRound() {
    console.log("init game turn");
    const {
      newCardsOnTable,
      betsInPool,
      playerIdGameTurn,
      serverTime,
      turnRespondTime,
    } = GameManager.initNextRound(1);

    const mergedGameData = {
      game: {
        tableBets: betsInPool,
        tableCards: newCardsOnTable,
        playerTurnData: {
          playerIdGameTurn,
          serverTime,
          turnRespondTime,
        },
      },
    };
    this.broadcast("initNextRound", mergedGameData);
  }

  initRiverRound() {
    console.log("init game river");
    const {
      newCardsOnTable,
      betsInPool,
      playerIdGameTurn,
      serverTime,
      turnRespondTime,
    } = GameManager.initNextRound(1);

    const mergedGameData = {
      game: {
        tableBets: betsInPool,
        tableCards: newCardsOnTable,
        playerTurnData: {
          playerIdGameTurn,
          serverTime,
          turnRespondTime,
        },
      },
    };

    this.broadcast("initNextRound", mergedGameData);
  }

  initGameResult() {
    console.log("init game result");
    const { winnerPlayerId, playersCards, betsInPool, winnerPlayerMoney } =
      GameManager.getGameResult();

    const mergedGameData = {
      players: {
        playersCards: playersCards,
      },
      game: {
        winnerPlayerId: winnerPlayerId,
        winnerPlayerMoney: winnerPlayerMoney,
        tableBets: betsInPool,
      },
    };

    this.broadcast("gameResult", mergedGameData);
  }

  sendMessageToClientID(clientID, url, message) {
    const player = this.clients.find((client) => client.sessionId === clientID);
    if (player) {
      player.send(url, message);
    }
  }

  setupListeners() {
    this.onMessage("playerTurnAction", (client, data) => {
      const clientId = client.sessionId;
      if (!GameManager.isCurrentPlayerTurn(clientId)) return;
      const respondData = GameManager.playerTurnAction(clientId, data);
      this.startGameTurnTimer();
      this.updateGameRound();
      this.broadcast("updatePlayerTurnAction", respondData);
    });
  }

  startGameTurnTimer() {
    GameManager.startGameTurnTimer(() => {
      this.updateGameRound();
    });
  }

  updatePlayerTurn() {
    const playerTurnData = GameManager.changePlayerTurn();
    this.broadcast("updateGameTurn", playerTurnData);
  }

  onLeave(client, consented) {
    console.log(`${client.id} left the game.`);
    GameManager.deletePlayerFromGame(client.sessionId);
    this.broadcast("playerLeaveGame", client.id);
    //WYtypuj kolejną osobę do tury jeszce raz jeśli wychodzący miał teraz turę
  }

  onDispose() {
    console.log("Game room disposed.");
  }
}

module.exports = GameRoom;
