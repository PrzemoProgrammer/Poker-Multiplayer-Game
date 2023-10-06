const { app, server, port } = require("./index");
const {
  authentication,
  registration,
  playerState,
} = require("./controllers/index");
const databaseManager = require("./MongoDB/DatabaseManager");
const JWT = require("./JWT/JWTManager");
const { Server } = require("colyseus");
//? /////////////////////////////////////////////////////////////////////////
const GameRoom = require("./Colyseus/GameRoom");
const io = new Server({ server });
io.define("game", GameRoom);
//? //////////////////////////////////////////////////////////////////////

server.listen(port, async () => {
  await databaseManager.connectDatabase();

  app.post("/registration", registration);
  app.post("/authentication", authentication);
  app.post("/playerState", playerState);

  app.post("/game_state", async (req, res) => {
    let { authToken } = req.body;

    const hashedPassword = JWT.decode(authToken);

    // const room = await io.roomById("game");
    const userDatabaseData = await databaseManager.findPlayer({
      passwordHash: hashedPassword,
    });

    delete userDatabaseData.passwordHash;

    console.log(userDatabaseData);

    // room.broadcast("update_data", userDatabaseData);

    res.json(userDatabaseData);
  });

  console.log(`Listening on ${server.address().port}`);
});
