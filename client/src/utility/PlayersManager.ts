import serverPlayersStorage from "./ServerPlayersStorage";
import ServerPlayerData from "../interfaces/ServerPlayerData";
import DataStorage from "../interfaces/DataStorage";
import DrawCards from "../interfaces/DrawCards";
import Player from "../components/players/Player";
import ColyseusClient from "../services/colyseus/ColyseusClient";
import { GAME_HEIGHT, GAME_WIDTH, MAX_PLAYER_CARDS } from "../config/gameConfig";
import { DEAL_ANIM_DELAY, DEAL_NEXT_CARD_ANIM_DELAY, CARD_SCALE,USER_CARD_SCALE} from "../config/cardAnimationConfig";

class PlayersManager {
    constructor() {
    }

    public addPlayer(player: Player):void  {
        serverPlayersStorage.addPlayer(player)
    }

    public getPlayers(): DataStorage {
       return serverPlayersStorage.getPlayers()
    }

    public getPlayersCount(): number{
        const players = this.getPlayers()
        return Object.keys(players).length;
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

      turnOverPlayerCardsAnim(drawCards: DrawCards, onlyYou: boolean){
        const players = this.getPlayers();
 
        if(onlyYou) {
            for (const playerId in players) {
                    if(ColyseusClient.isMyId(playerId)) {
                        const symbols = drawCards[playerId].drawCards.cards
                        players[playerId].turnOverCards(symbols)
                    }
            }
        } else {
            for (const playerId in players) {
                const symbols = drawCards[playerId].drawCards.cards
                if(ColyseusClient.isMyId(playerId)) break
                players[playerId].turnOverCards(symbols)
            }
        }
   
      } 
  }
  

  export default new PlayersManager();
  