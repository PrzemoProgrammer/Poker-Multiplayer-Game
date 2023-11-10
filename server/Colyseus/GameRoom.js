const { Room } = require("colyseus");
const databaseManager = require("../MongoDB/DatabaseManager");
const GameManager = require("../game/utility/manager/GameManager");
const JWT = require("../JWT/JWTManager");

class GameRoom extends Room {
  onCreate(options) {
    console.log("Game room created:", options);
    this.setupListeners();
  }

  async onJoin(client, options) {
    if (GameManager.areMaxPlayers()) {
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
      const allPlayers = GameManager.getPlayersFromGame();

      this.broadcast("playerJoined", joinedPlayer, { except: clientID });
      client.send("getPlayers", allPlayers);

      if (GameManager.areMaxPlayers()) this.startGame();
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
      drawCards[clientId].drawCards = clientCards;

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
    //! ////////////////////// PREFLOP ////////////////////////////////

    //! ////////////////////// FLOP ////////////////////////////////
    // if (GameManager.isPreflopRoundFinish()) {
    // const {
    //   newCardsOnTable,
    //   betsInPool,
    //   playerIdGameTurn,
    //   serverTime,
    //   turnRespondTime,
    // } = GameManager.initNextRound(3);

    // const mergedGameData = {
    //   game: {
    //     tableBets: betsInPool,
    //     tableCards: newCardsOnTable,
    //     playerTurnData: {
    //       playerIdGameTurn,
    //       serverTime,
    //       turnRespondTime,
    //     },
    //   },
    // };
    // this.broadcast("initNextRound", mergedGameData);
    // }
    //! ////////////////////// TURN ////////////////////////////////
    // if (GameManager.isFlopRoundFinish()) {
    // setTimeout(() => {
    //   const {
    //     newCardsOnTable,
    //     betsInPool,
    //     playerIdGameTurn,
    //     serverTime,
    //     turnRespondTime,
    //   } = GameManager.initNextRound(1);

    //   const mergedGameData = {
    //     game: {
    //       tableBets: betsInPool,
    //       tableCards: newCardsOnTable,
    //       playerTurnData: {
    //         playerIdGameTurn,
    //         serverTime,
    //         turnRespondTime,
    //       },
    //     },
    //   };

    //   this.broadcast("initNextRound", mergedGameData);
    // }, 4000);

    // setTimeout(() => {
    //   const {
    //     newCardsOnTable,
    //     betsInPool,
    //     playerIdGameTurn,
    //     serverTime,
    //     turnRespondTime,
    //   } = GameManager.initNextRound(1);

    //   const mergedGameData = {
    //     game: {
    //       tableBets: betsInPool,
    //       tableCards: newCardsOnTable,
    //       playerTurnData: {
    //         playerIdGameTurn,
    //         serverTime,
    //         turnRespondTime,
    //       },
    //     },
    //   };

    //   this.broadcast("initNextRound", mergedGameData);
    // }, 8000);
    // }

    //! ////////////////////// RIVER ////////////////////////////////
    // if (GameManager.isTurnRoundFinish()) {
    //   const {
    //     newCardsOnTable,
    //     betsInPool,
    //     playerIdGameTurn,
    //     serverTime,
    //     turnRespondTime,
    //   } = GameManager.initNextRound(1);

    //   const mergedGameData = {
    //     game: {
    //       tableBets: betsInPool,
    //       tableCards: newCardsOnTable,
    //       playerTurnData: {
    //         playerIdGameTurn,
    //         serverTime,
    //         turnRespondTime,
    //       },
    //     },
    //   };

    //   this.broadcast("initNextRound", mergedGameData);
    // }

    //! ////////////////////// INIT WINNER ////////////////////////////////
    // if (GameManager.isRiverRoundFinish()) {
    //   this.broadcast("initWinner", mergedGameData);
    // }

    //! ////////////////////// RESET GAME ////////////////////////////////
    // if (GameManager.isGameWinner()) {
    //   this.broadcast("initLobby", mergedGameData);
    // }
    //! //////////////// CHANGE PLAYER TURN /////////////////////////////////
    this.updatePlayerTurn();
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
      // if (!GameManager.isCurrentPlayerTurn(clientId)) return;
      const respondData = GameManager.playerTurnAction(clientId, data);
      this.startGameTurnTimer();
      this.updatePlayerTurn();
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
