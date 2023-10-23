const { Room } = require("colyseus");
const databaseManager = require("../MongoDB/DatabaseManager");
const GameManager = require("../game/utility/GameManager");
const JWT = require("../JWT/JWTManager");
const SitPositionManager = require("../game/utility/SitPositionManager");

class GameRoom extends Room {
  onCreate(options) {
    console.log("Game room created:", options);
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
      const sitPosition = SitPositionManager.getEmptyPosition();

      const userDatabaseData = await databaseManager
        .findPlayer({ passwordHash: hashedPassword })
        .select("-_id -passwordHash -__v")
        .lean();
      userDatabaseData.id = clientID;
      userDatabaseData.sit = sitPosition;
      userDatabaseData.position = "player";
      userDatabaseData.bet = 0;

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
      drawCardsForPlayers,
      betsInPot,
    } = GameManager.startGame();

    for (const clientId in drawCardsForPlayers) {
      const clientCards = drawCardsForPlayers[clientId];
      const drawCards = {};
      drawCards[clientId] = {};
      drawCards[clientId].drawCards = clientCards;

      const mergedGameData = {
        playersGamePositions: playersGamePositions,
        playersBets: playersBets,
        betsInPot: betsInPot,
        drawCards: drawCards,
      };

      this.sendMessageToClientID(clientId, "gameStartData", mergedGameData);
    }
  }

  sendMessageToClientID(clientID, url, message) {
    const player = this.clients.find((client) => client.sessionId === clientID);
    if (player) {
      player.send(url, message);
    }
  }

  onMessage(client, message) {
    console.log(`${client.id} sent a message:`, message);
  }

  onLeave(client, consented) {
    console.log(`${client.id} left the game.`);
    GameManager.deletePlayerFromGame(client.sessionId);
  }

  onDispose() {
    console.log("Game room disposed.");
  }
}

module.exports = GameRoom;
