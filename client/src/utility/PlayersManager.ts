import serverPlayersStorage from "./ServerPlayersStorage";
import ServerPlayerData from "../interfaces/ServerPlayerData";
import DataStorage from "../interfaces/DataStorage";
import Player from "../players/Player";
import { PLAYER_POSITIONS} from "../config/gameConfig";



class PlayersManager {
    constructor() {
    }

    public addPlayer(player: Player):void  {
        serverPlayersStorage.addPlayer(player)
    }

    // public addPlayers(players: Object){
        
    // }

    public getPlayers(): DataStorage {
       return serverPlayersStorage.getPlayers()
    }

    getPlayersCount(): number{
        const players = this.getPlayers()
        return Object.keys(players).length;
    }

    getEmptyPosition(){
        const playersCount = this.getPlayersCount()
        const playersPositions = PLAYER_POSITIONS
        const playersPositionsToArray = Object.values(playersPositions);

        return playersPositionsToArray[playersCount]
    }

  
  }
  

  export default new PlayersManager();
  