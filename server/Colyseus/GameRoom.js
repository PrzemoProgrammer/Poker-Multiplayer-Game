const { Room } = require("colyseus");
const databaseManager = require("../MongoDB/DatabaseManager");
const PlayersManager = require("../utility/PlayersManager");
const JWT = require("../JWT/JWTManager");

class GameRoom extends Room {
  onCreate(options) {
    console.log("Game room created:", options);
  }

  async onJoin(client, options) {
    try {
      const clientID = client.sessionId;
      console.log(`User with session ID ${clientID} has joined the game.`);

      const { authToken } = options;
      const hashedPassword = JWT.decode(authToken);

      const userDatabaseData = await databaseManager
        .findPlayer({ passwordHash: hashedPassword })
        .select("-_id -passwordHash -__v")
        .lean();
      userDatabaseData.id = clientID;

      PlayersManager.addPlayer(clientID, userDatabaseData);
      const joinedPlayer = PlayersManager.getPlayer(clientID);
      const allPlayers = PlayersManager.getPlayers();

      this.broadcast("playerJoined", joinedPlayer, { except: clientID });

      client.send("getPlayers", allPlayers);
    } catch (error) {
      console.error(
        "An error occurred while processing the client join request:",
        error
      );
    }
  }

  onMessage(client, message) {
    console.log(`${client.id} sent a message:`, message);
  }

  onLeave(client, consented) {
    console.log(`${client.id} left the game.`);
    delete this.players[client.sessionId];
  }

  onDispose() {
    console.log("Game room disposed.");
  }
}

module.exports = GameRoom;
