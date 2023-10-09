const { Room } = require("colyseus");
const databaseManager = require("../MongoDB/DatabaseManager");
const JWT = require("../JWT/JWTManager");

class GameRoom extends Room {
  onCreate(options) {
    console.log("Game room created:", options);
    this.players = {};
  }

  async onJoin(client, options) {
    console.log(`${client.id} joined the game.`);
    const { authToken } = options;
    const hashedPassword = JWT.decode(authToken);
    const userDatabaseData = await databaseManager.findPlayer({
      passwordHash: hashedPassword,
    });
    delete userDatabaseData.passwordHash;
    this.players[client.sessionId] = userDatabaseData;

    console.log(this.players);
  }

  onMessage(client, message) {
    // this.broadcast("message", { text: "Hello, everyone!" });
    console.log(`${client.id} sent a message:`, message);

    // const player = this.state.players[client.sessionId];
    // // Obsługa akcji gracza, np. ruchu
    // player.x = message.x;
    // player.y = message.y;
    // // Aktualizuj stan gry i przekazuj go do wszystkich graczy
    // this.broadcastState()
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
