const { Room } = require("colyseus");

class GameRoom extends Room {
  onCreate(options) {
    console.log("Game room created:", options);

    this.state = {
      players: {},
      // Dodaj inne pola stanu gry
    };
  }

  onJoin(client, options) {
    console.log(`${client.id} joined the game.`);
    this.state.players[client.sessionId] = {
      /* inicjalizacja gracza */
    };
  }

  onMessage(client, message) {
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
    delete this.state.players[client.sessionId];
  }

  onDispose() {
    console.log("Game room disposed.");
  }
}

module.exports = GameRoom;
