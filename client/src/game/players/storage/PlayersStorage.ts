import IPlayersDataStorage from "./interface/IPlayersDataStorage";
import Player from "../player/Player";

class PlayersStorage {
    private static players: IPlayersDataStorage = {}

    public static addPlayer(player: Player) {
        const playerID = player.id
        this.players[playerID] = player
    }

    public static get getPlayers(): IPlayersDataStorage{
        return this.players
    }

    public static getPlayer(id: string): Player{
        return  this.players[id]
    }

    public static deletePlayer(playerId: string):void {
       delete this.players[playerId]
    }

  }
  
  export default  PlayersStorage
  









//   import IPlayersDataStorage from "./interface/IPlayersDataStorage";
// import Player from "../player/Player";

// class PlayersStorage {
//     private static players: IPlayersDataStorage = {}

//     public static addPlayer(player: Player) {
//         const playerID = player.id
//         this.players[playerID] = player
//     }

//     public static get getPlayers(): IPlayersDataStorage{
//         return this.players
//     }

//     public static getPlayer(id: string): Player{
//         return  this.players[id]
//     }

//     public static deletePlayer(playerId: string):void {
//        delete this.players[playerId]
//     }

//   }
  
//   export default  PlayersStorage
  