import IPlayersDataStorage from "./interface/IPlayersDataStorage";
import Player from "../player/Player";

class PlayersStorage {
    players: IPlayersDataStorage

    constructor() {
        this.players = {};
    }

    public addPlayer(player: Player) {
        const playerID = player.id
        this.players[playerID] = player
    }

    public get getPlayers(): IPlayersDataStorage{
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
  