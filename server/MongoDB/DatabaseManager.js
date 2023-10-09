const mongoose = require("mongoose");
const { DB_URL } = require("./credentials");
mongoose.set("strictQuery", true);
const Player = require("./models/Player");

class DatabaseManager {
  constructor() {}

  async connectDatabase() {
    await mongoose
      .connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(async () => {
        console.log("DB init");
      });
  }

  async createUser(data) {
    const { nick, money, passwordHash } = data;
    const player = new Player({
      nick: nick,
      money: money,
      passwordHash: passwordHash,
    });

    await player
      .save()
      .then((savedDoc) => {
        console.log("Player saved in database");
      })
      .catch((error) => {
        console.log(error + " Player NOT saved in database");
      });

    return true;
  }

  updatePlayer(data) {
    return Player.updateOne(
      { id: data.id },
      {
        $set: {
          score: data.score,
        },
      }
    );
  }

  findPlayer(data) {
    return Player.findOne(data);
  }

  downloadPlayer(data) {
    return this.findPlayer(data).then((player) => {
      if (!player) {
        return "Player does not exist";
      }
      return player;
    });
  }

  downloadPlayers() {
    return Player.find({});
  }
}

mongoose.connection.on("connected", function () {
  console.log("Connected to mongo");
});

mongoose.connection.on("error", (error) => {
  console.log("Mongo connection ERROR", error);
});

const databaseManager = new DatabaseManager();
module.exports = databaseManager;
