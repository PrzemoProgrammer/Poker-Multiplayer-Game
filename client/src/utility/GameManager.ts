import { GAME_HEIGHT, GAME_WIDTH, MAX_PLAYER_CARDS } from "../config/gameConfig";
import { Application, Container } from "pixi.js";
import BaseScene from "../abstraction/BaseScene";
import ColyseusClient from "../services/colyseus/ColyseusClient";
import UiInterfaceManager from "../utility/UiInterfaceManager";
import { DEAL_ANIM_DELAY, DEAL_NEXT_CARD_ANIM_DELAY, CARD_SCALE,USER_CARD_SCALE} from "../config/cardAnimationConfig";
import DataStorage from "../interfaces/DataStorage";
import PlayerBets from "../interfaces/PlayerBets";
import PlayerGamePositions from "../interfaces/PlayerGamePositions";
import PlayersManager from "../utility/PlayersManager";

class GameManager {

    updatePlayerMoney(playerId: string, players: DataStorage, playersBets: PlayerBets){
        const updateMoneyText = playersBets[playerId].money
        PlayersManager.updatePlayerMoneyText(playerId, players, updateMoneyText)
        if(ColyseusClient.isMyId(playerId)) UiInterfaceManager.updateMoneyText(updateMoneyText)
      }

      updatePlayerBet(playerId: string, players: DataStorage, playersBets: PlayerBets){
        const updateBet = playersBets[playerId].bet
        if(playersBets[playerId] !== undefined) PlayersManager.updatePlayerBet(playerId, players, updateBet)
        if(ColyseusClient.isMyId(playerId)) UiInterfaceManager.updateBetText(updateBet)
      }

      updatePlayerPosition(playerId: string, players: DataStorage, playersGamePositions: PlayerGamePositions){
        const updatedPosition = playersGamePositions[playerId].position
        PlayersManager.updatePlayerPosition(playerId, players, updatedPosition)
      }

      updateInterfaceMoneyText(updatedText: number){
        UiInterfaceManager.updateMoneyText(updatedText)
      } 

  }

  export default new GameManager();
  