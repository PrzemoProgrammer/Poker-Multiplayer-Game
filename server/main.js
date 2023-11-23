const { app, server, port, socketServer } = require("./index");
const { authentication, registration } = require("./controllers/index");
const databaseManager = require("./MongoDB/DatabaseManager");
const GameRoom = require("./Colyseus/GameRoom");
const { SOCKET_PORT } = require("./config");

server.listen(port, async () => {
  await databaseManager.connectDatabase();

  app.post("/registration", registration);
  app.post("/authentication", authentication);

  socketServer.define("game", GameRoom);
  socketServer.listen(SOCKET_PORT);

  console.log(`Listening on ${server.address().port}`);
});
