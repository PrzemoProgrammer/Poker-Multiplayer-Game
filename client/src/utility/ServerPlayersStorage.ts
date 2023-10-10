import ServerPlayerData from "../interfaces/ServerPlayerData";


class ServerPlayersStorage {
    players:  { [key: string]: Object }

    constructor() {
        this.players = {};
    }

    public addPlayer(player: ServerPlayerData):void {
        const {clientId, userData} = player
        this.players[clientId] = userData

        console.log(  this.players)
    }
  }
  
  export default new ServerPlayersStorage();
  