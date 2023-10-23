class Players {
  constructor() {
    this.players = new Map();

    this.players.set("FqwM02TqT", {
      nick: "Jan3",
      money: 2000,
      id: "FqwM02TqT",
      sit: 5,
      position: "player",
      bet: 0,
    });
    this.players.set("SqwT22TqV", {
      nick: "ZByszek",
      money: 10000,
      id: "SqwT22TqV",
      sit: 4,
      position: "player",
      bet: 0,
    });
    this.players.set("GLw932TQF", {
      nick: "Adamoss",
      money: 20000,
      id: "GLw932TQF",
      sit: 3,
      position: "player",
      bet: 0,
    });
    this.players.set("PGw962TU2", {
      nick: "Przmsidshadsdasd",
      money: 100000,
      id: "PGw962TU2",
      sit: 2,
      position: "player",
      bet: 0,
    });
  }

  addPlayer(key, data) {
    this.players.set(key, data);
  }

  setPlayers(players) {
    this.players = players;
  }

  getPlayers() {
    return this.players;
  }

  getPlayer(key) {
    return this.players.get(key);
  }

  getPlayerCount() {
    return this.players.size;
  }

  deletePlayer(clientID) {
    this.players.delete(clientID);
  }

  //   updatePlayer(key, value) {
  //     const playerData = this.getPlayer(key)
  //   }
}

module.exports = new Players();

// class PlayersStorage {
//     constructor() {
//       this.players = new Map();

// this.players = {
//   FqwM02TqT: { nick: "Jan3", money: 0, id: "FqwM02TqT" },
//   SqwT22TqV: { nick: "ZByszek", money: 100, id: "SqwT22TqV" },
//   GLw932TQF: { nick: "Adamoss", money: 350, id: "GLw932TQF" },
// };
//     }

//     addPlayer(key, data) {
//       this.players.set(key, data);
//       // this.players[key] = data;
//     }

//     setPlayers(players) {
//       this.players = players;
//     }

//     getPlayers() {
//       console.log(this.players);
//       return this.players;
//     }

//     getPlayer(key) {
//       return this.players.get(key);
//       // return this.players[key];
//     }

//     deletePlayer(clientID) {
//       this.players.delete(clientID);
//       // delete this.players[clientID];
//     }
//   }

//   module.exports = new PlayersStorage();
