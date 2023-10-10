import serverPlayersStorage from "./ServerPlayersStorage";
import ServerPlayerData from "../interfaces/ServerPlayerData";

class PlayersManager {
    constructor() {
    }

    public addPlayer(player: ServerPlayerData):void  {
        serverPlayersStorage.addPlayer(player)
    }
  
  }
  

  export default new PlayersManager();
  