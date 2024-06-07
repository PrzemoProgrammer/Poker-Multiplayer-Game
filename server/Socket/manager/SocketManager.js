const databaseManager = require("../../MongoDB/DatabaseManager");
const RoomsManager = require("../../Socket/rooms/manager/RoomsManager");
const JWT = require("../../JWT/JWTManager");
const eventEmitter = require("../../eventEmitter/eventEmitter");

class SocketManager {
  constructor(socketServer) {
    this.socketServer = socketServer;
    this.roomsManager = new RoomsManager(this.socketServer);
    this.socketServer.on("connection", (socket) => {
      console.log("new user", socket.id);
      this.setupSocketListeners(socket);
    });
    this.setupGameListeners();
  }

  setupSocketListeners(socket) {
    socket.on("playerJoinGame", async (data) => {
      const { authToken, buyInValue } = data;
      const socketID = socket.id;

      // const buyIn = Math.random() > 0.5 ? 10000 : 5000; //10000;

      const hashedPassword = JWT.decode(authToken);
      const userDatabaseData = await databaseManager
        .findPlayer({ passwordHash: hashedPassword })
        .select("-_id -passwordHash -__v")
        .lean();
      userDatabaseData.buyIn = buyInValue;
      console.log(buyInValue);

      this.roomsManager.handleAddPlayerToGame(
        socketID,
        userDatabaseData,
        hashedPassword
      );
    });

    socket.on("playerTurnAction", (data) => {
      const socketID = socket.id;
      const roomID = this.getSocketRoomID(socket);
      this.roomsManager.playerTurnAction(socketID, roomID, data);
    });

    socket.on("sendMessage", (data) => {
      const socketID = socket.id;
      const roomID = this.getSocketRoomID(socket);
      this.roomsManager.sendMessage(socketID, roomID, data);
    });

    socket.on("getPlayerAndGameProfileInformation", async (authToken) => {
      // const socketID = socket.id;
      // const roomID = this.getSocketRoomID(socket);
      const hashedPassword = JWT.decode(authToken);
      const userDatabaseData = await databaseManager
        .findPlayer({ passwordHash: hashedPassword })
        .select("-_id -passwordHash -__v")
        .lean();
      const playerInformation = {
        money: userDatabaseData.money,
        nickname: userDatabaseData.nick,
        profileImage: userDatabaseData.profileImage,
      };
      const gameInformation = this.roomsManager.getGameInformation();

      socket.emit("playerAndGameProfileInformation", {
        playerInformation,
        gameInformation,
      });
    });

    socket.on("leaveRoom", async () => {
      const socketID = socket.id;
      const roomID = this.getSocketRoomID(socket);
      if (!roomID) return;
      socket.broadcast.to(roomID).emit("playerLeaveGame", socketID);
      await this.roomsManager.handlePlayerLeaveFromGame(socketID, roomID);
      // socket.leave(roomID);
      socket.emit("playerLeaveGame", socketID);
      // socket.to(roomID).emit("playerLeaveGame", socketID);
    });

    socket.on("disconnecting", () => {
      const socketID = socket.id;
      const roomID = this.getSocketRoomID(socket);
      if (!roomID) return;
      this.roomsManager.handlePlayerLeaveFromGame(socketID, roomID);
      // socket.leave(roomID);
      socket.to(roomID).emit("playerLeaveGame", socketID);
    });
  }

  setupGameListeners() {
    eventEmitter.on("getPlayers", (playersData) => {
      const { socketID, allLobbyAndGamePlayers } = playersData;
      this.socketServer.to(socketID).emit("getPlayers", allLobbyAndGamePlayers);
    });

    eventEmitter.on("playerJoinRoom", (newPlayerData) => {
      const { roomID, joiningPlayer } = newPlayerData;
      this.socketServer.to(roomID).emit("playerJoinRoom", joiningPlayer);
    });

    eventEmitter.on("initPreflopRound", (preflopRoundData) => {
      const { playerID, mergedGameData } = preflopRoundData;
      this.socketServer.to(playerID).emit("initPreflopRound", mergedGameData);
    });

    eventEmitter.on("initNextRound", (roundData) => {
      const { roomID, mergedGameData } = roundData;
      this.socketServer.to(roomID).emit("initNextRound", mergedGameData);
    });

    eventEmitter.on("updateGameTurn", (mergedGameData) => {
      const { roomID, gameData } = mergedGameData;
      this.socketServer.to(roomID).emit("updateGameTurn", gameData);
    });

    eventEmitter.on("gameResult", (mergedGameData) => {
      const { roomID, gameData } = mergedGameData;
      this.socketServer.to(roomID).emit("gameResult", gameData);
    });

    eventEmitter.on("updatePlayerTurnAction", (mergedGameData) => {
      const { roomID, respondData } = mergedGameData;
      this.socketServer.to(roomID).emit("updatePlayerTurnAction", respondData);
    });

    eventEmitter.on("gameState", (data) => {
      const { socketID, gameState } = data;
      this.socketServer.to(socketID).emit("roomState", gameState);
    });

    eventEmitter.on("kick", (data) => {
      const { playerId, roomID } = data;
      // this.socketServer.to(playerId).leave(roomID);
      // socket.leave(roomID);
      // this.socketServer.to(playerId).disconnect(true);
      // this.socketServer.sockets.sockets[playerId].disconnect(true);
      this.socketServer.sockets.sockets.get(playerId).leave(roomID);
      this.socketServer.to(roomID).emit("playerLeaveGame", playerId);
      this.socketServer.to(playerId).emit("kick");
    });

    eventEmitter.on("resetGame", (roomID) => {
      this.socketServer.to(roomID).emit("resetGame", {});
    });

    eventEmitter.on("announcement", (data) => {
      const { socketID, message } = data;
      this.socketServer.to(socketID).emit("announcement", message);
    });
    eventEmitter.on("sendMessage", (data) => {
      const { roomID, messageData } = data;
      // socket.emit("onChatMessage", dup);
      // // socket.to(roomID).emit("onChatMessage", dup);
      // this.socketServer.to(socketID).emit("onChatMessage", messageData);
      this.socketServer.to(roomID).emit("onChatMessage", messageData);
    });
  }

  getSocketRoomID(socket) {
    return Array.from(socket.rooms)[1];
  }
}

module.exports = SocketManager;
