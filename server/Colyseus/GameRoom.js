const { Room } = require("colyseus");
const databaseManager = require("../MongoDB/DatabaseManager");
const JWT = require("../JWT/JWTManager");

class GameRoom extends Room {
  onCreate(options) {
    console.log("Game room created:", options);
    this.players = {
      FqwM02TqT: { nick: "Jan3", money: 0, id: "FqwM02TqT" },
      SqwT22TqV: { nick: "ZByszek", money: 100, id: "SqwT22TqV" },
      GLw932TQF: { nick: "Adamoss", money: 350, id: "GLw932TQF" },
    };
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
      const joinedPlayer = (this.players[clientID] = userDatabaseData);

      this.broadcast("playerJoined", joinedPlayer, { except: clientID });

      client.send("getPlayers", this.players);
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
