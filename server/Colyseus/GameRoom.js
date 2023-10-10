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
    const userDatabaseData = await databaseManager
      .findPlayer({
        passwordHash: hashedPassword,
      })
      .lean()
      .select("-_id -passwordHash -__v");

    this.players[client.sessionId] = userDatabaseData;

    console.log(this.players);

    this.onMessageToAll(
      {
        clientId: client.id,
        userData: userDatabaseData,
      },
      "playerJoined"
    );
  }

  onMessage(client, message) {
    // this.broadcast("message", { text: "Hello, everyone!" });
    console.log(`${client.id} sent a message:`, message);

    // // Obsługa akcji gracza, np. ruchu
    // player.x = message.x;
    // player.y = message.y;
    // // Aktualizuj stan gry i przekazuj go do wszystkich graczy
  }

  onMessageToAll(message, url) {
    this.broadcast(url, message);
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
