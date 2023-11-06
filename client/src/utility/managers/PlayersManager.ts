import PlayersStorage from "../storage/PlayersStorage";
import ServerPlayerData from "../../interfaces/ServerPlayerData";
import DataStorage from "../../interfaces/DataStorage";
import DrawCards from "../../interfaces/DrawCards";
import Player from "../../components/players/Player";
import ColyseusClient from "../../services/colyseus/ColyseusClient";
import { GAME_HEIGHT, GAME_WIDTH, MAX_PLAYER_CARDS } from "../../config/gameConfig";
import { DEAL_ANIM_DELAY, DEAL_NEXT_CARD_ANIM_DELAY, CARD_SCALE,USER_CARD_SCALE} from "../../config/cardAnimsConfig";

class PlayersManager {
    constructor() {
    }

    public addPlayer(player: Player):void  {
        PlayersStorage.addPlayer(player)
    }

    public getPlayers(): DataStorage {
       return PlayersStorage.getPlayers()
    }

    public getPlayersCount(): number{
        const players = this.getPlayers()
        return Object.keys(players).length;
    }  

    public getPlayer(id: string){
        return PlayersStorage.getPlayer(id)
    }

    public updatePlayerMoneyText(playerId: string, players: DataStorage, updateMoneyText: number){
        players[playerId].updateMoneyText(updateMoneyText)
    }

    public updatePlayerBet(playerId: string, players: DataStorage, updateBet: number){
            players[playerId].updateBets(updateBet)
            if(updateBet > 0) players[playerId].setBetVisible(true)
    }

    public updatePlayerPosition(playerId: string, players: DataStorage, updatedPosition: string){
        players[playerId].updateGamePosition(updatedPosition)
    }

    public checkDisplayDealerSign(playerId: string, players: DataStorage, updatedPosition: string){
        if(updatedPosition === "dealer")
        players[playerId].setDealerSignVisible(true)
    }

    async playDealCardsForPlayersAnim() {
        const players = this.getPlayers();
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
      
        for (let i = 0; i < MAX_PLAYER_CARDS; i++) {
          await delay(DEAL_NEXT_CARD_ANIM_DELAY);
      
          for (const playerId in players) {
            if (players.hasOwnProperty(playerId)) {
              await delay(DEAL_ANIM_DELAY);
              const scaleValue = ColyseusClient.isMyId(playerId) ? USER_CARD_SCALE : CARD_SCALE;
              players[playerId].startDealCardsAnim(i, scaleValue);
            }
          }
        }
      }

      turnOverPlayerCardsAnim(drawCards: DrawCards, onlyYou: boolean) {
        const players = this.getPlayers();
    
        for (const playerId in players) {
            if (ColyseusClient.isMyId(playerId)) {
                const symbols = drawCards[playerId]?.drawCards.cards || [];
                const isCurrentPlayer = ColyseusClient.isMyId(playerId);
    
                if (!onlyYou || (onlyYou && isCurrentPlayer)) {
                    players[playerId].turnOverCards(symbols);
                }
            }
        }
    }

    //   turnOverPlayerCardsAnim(drawCards: DrawCards, onlyYou: boolean){
    //     const players = this.getPlayers();
     
    //         for (const playerId in players) {
    //                 if(ColyseusClient.isMyId(playerId)) {
    //                     const symbols = drawCards[playerId].drawCards.cards

    //                     if(onlyYou) {
    //                         if(ColyseusClient.isMyId(playerId)) players[playerId].turnOverCards(symbols)
    //                     } else {
    //                         if(!ColyseusClient.isMyId(playerId))
    //                         players[playerId].turnOverCards(symbols)
    //                     }
    //                 }
    //         }
       

     public resetBets(){
        const players = this.getPlayers();
        for (const playerId in players) {
            const player = players[playerId]
            player.resetBet()
        }
      }

      public deletePlayer(playerId: string){
        const player = this.getPlayer(playerId)
        player.destroy()
        PlayersStorage.deletePlayer(playerId)
      }
  }
  

  export default new PlayersManager();
  