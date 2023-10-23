const { app, server, port, socketServer } = require("./index");
const { authentication, registration } = require("./controllers/index");
const databaseManager = require("./MongoDB/DatabaseManager");
const GameRoom = require("./Colyseus/GameRoom");

server.listen(port, async () => {
  await databaseManager.connectDatabase();

  app.post("/registration", registration);
  app.post("/authentication", authentication);
  // app.post("/playerState", playerState);

  // app.post("/game_state", async (req, res) => {
  //   let { authToken } = req.body;

  //   const hashedPassword = JWT.decode(authToken);

  //   // const room = await io.roomById("game");
  //   const userDatabaseData = await databaseManager.findPlayer({
  //     passwordHash: hashedPassword,
  //   });

  //   delete userDatabaseData.passwordHash;

  //   // room.broadcast("update_data", userDatabaseData);

  //   res.json(userDatabaseData);
  // });

  socketServer.define("game", GameRoom);
  socketServer.listen(2567);

  // io.on("connection", (client) => {
  //   console.log(`Client ${client.id} connected`);

  //   // Join the client to the "game" room
  //   client.join("game");

  //   client.onMessage((data) => {
  //     // Handle messages received from this client
  //     console.log(`Received message from client ${client.id}: ${data}`);
  //   });

  //   client.onDisconnect(() => {
  //     console.log(`Client ${client.id} disconnected`);
  //   });
  // });

  console.log(`Listening on ${server.address().port}`);
});
