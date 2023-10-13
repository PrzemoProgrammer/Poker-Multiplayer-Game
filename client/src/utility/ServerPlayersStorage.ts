import DataStorage from "../interfaces/DataStorage";
import Player from "../players/Player";

class ServerPlayersStorage {
    players: DataStorage

    constructor() {
        this.players = {};
    }

    public addPlayer(player: Player):void {
        const playerID = player.id
        this.players[playerID] = player
    }

    public getPlayers(): DataStorage{
        return this.players
    }

  }
  
  export default new ServerPlayersStorage();
  