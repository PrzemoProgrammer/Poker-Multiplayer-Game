import DataStorage from "../../../interfaces/DataStorage";
import Player from "../player/Player";

class PlayersStorage {
    players: DataStorage

    constructor() {
        this.players = {};
    }

    public addPlayer(player: Player) {
        const playerID = player.id
        this.players[playerID] = player
    }

    public get getPlayers(): DataStorage{
        return this.players
    }

    public getPlayer(id: string): Player{
        return  this.players[id]
    }

    public deletePlayer(playerId: string):void {
       delete this.players[playerId]
    }

  }
  
  export default new PlayersStorage();
  