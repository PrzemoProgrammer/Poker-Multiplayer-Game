const { app, server, port, socketServer } = require("./index");
const { authentication, registration } = require("./controllers/index");
const databaseManager = require("./MongoDB/DatabaseManager");
const SocketManager = require("./Socket/manager/SocketManager");

server.listen(port, async () => {
  await databaseManager.connectDatabase();

  app.post("/registration", registration);
  app.post("/authentication", authentication);

  this.socketManager = new SocketManager(socketServer);

  console.log(`Listening on ${server.address().port}`);
});
