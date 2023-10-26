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

  console.log(`Listening on ${server.address().port}`);
});
