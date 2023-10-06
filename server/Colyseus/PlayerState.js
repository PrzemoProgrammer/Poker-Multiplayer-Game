const { Schema, type } = require("@colyseus/schema");

class PlayerState extends Schema {
  @type("string") name;
  @type("number") x;
  @type("number") y;
  // Dodaj inne pola gracza
}

class GameState extends Schema {
  @type({ map: PlayerState }) players = new MapSchema();
  // Dodaj inne pola stanu gry
}
