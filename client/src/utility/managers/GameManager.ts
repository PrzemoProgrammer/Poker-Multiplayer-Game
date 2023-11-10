import AssetsManager from "../../utility/managers/AssetsManager";
import BaseScene from "../../abstraction/BaseScene";
import ColyseusClient from "../../services/colyseus/ColyseusClient";
import PokerBarManager from "./PokerBarManager";
import BettingManager from "./BettingManager";
import DataStorage from "../../interfaces/DataStorage";
import PlayerBets from "../../interfaces/PlayerBets";
import PlayerGamePositions from "../../interfaces/PlayerGamePositions";
import PlayersMoney from "../../interfaces/PlayersMoney";
import PlayersManager from "./PlayersManager";
import ServerGameUpdateOnStart from "../../interfaces/ServerGameUpdateOnStart";
import PlayerTurnData from "../../interfaces/PlayerTurnData";
import ServerPlayerData from "../../interfaces/ServerPlayerData";
import { TURN_OVER_PLAYER_CARD_DELAY } from "../../config/cardAnimsConfig";
import SitPositionManager from "./SitPositionManager";
import Player from "../../components/players/Player";
import PLAYER_CONFIG from "../../config/playerConfig";
import NextRoundData from "../../interfaces/NextRoundData";
import UpdatePlayerTurnAction from "../../interfaces/UpdatePlayerTurnAction";
import TableManager from "../../utility/managers/TableManager";
import GameSignals from "../../gameSignals/GameSignals";
import {BUTTON_TYPES} from "../../config/gameConfig";

class GameManager {
    public async updateGameOnStart(initGameData: ServerGameUpdateOnStart){
        const players = PlayersManager.getPlayers();
        const {drawCards, playersBets, playersMoney, playersGamePositions } = initGameData.players

        for (const playerId in players) {
        this.updatePlayerMoney(playerId, players, playersMoney)
        this.updatePlayerBet(playerId, players, playersBets)
        this.updatePlayerPosition(playerId, players, playersGamePositions)
        }

        await PlayersManager.playDealCardsForPlayersAnim();
        await new Promise<void>((resolve) => {
            setTimeout(() => {
                PlayersManager.turnOverPlayerCardsAnim(drawCards, true);
                resolve(); 
            }, TURN_OVER_PLAYER_CARD_DELAY);
        });
        this.updatePlayerTurn(initGameData.game.playerTurnData)
    }

      public updatePlayerMoney(playerId: string, players: DataStorage, playersMoney: PlayersMoney){
        const updateMoneyText = playersMoney[playerId].money
        PlayersManager.updatePlayerMoneyText(playerId, players, updateMoneyText)
        if(ColyseusClient.isMyId(playerId)) PokerBarManager.updateMoneyText(updateMoneyText)
      }

      public updatePlayerBet(playerId: string, players: DataStorage, playersBets: PlayerBets){
        const updateBet = playersBets[playerId].bet
        if(playersBets[playerId] !== undefined) PlayersManager.updatePlayerBet(playerId, players, updateBet)
        if(ColyseusClient.isMyId(playerId)) PokerBarManager.updateBetText(updateBet)
      }

      public updatePlayerPosition(playerId: string, players: DataStorage, playersGamePositions: PlayerGamePositions){
        const updatedPosition = playersGamePositions[playerId].position
        PlayersManager.updatePlayerPosition(playerId, players, updatedPosition)
        PlayersManager.checkDisplayDealerSign(playerId, players, updatedPosition)
      }

      public updateInterfaceMoneyText(updatedText: number){
        PokerBarManager.updateMoneyText(updatedText)
        this.setupUiInterfaceButtons()
      } 

      private setupUiInterfaceButtons(){
        const [fold, check, call, raise, bet] = BUTTON_TYPES
        const requestData = {action: "", data: 0}
        PokerBarManager.setupButtonOnClick(fold, ()=>{
          console.log(1)
        })
        PokerBarManager.setupButtonOnClick(check, ()=>{
          requestData.action = check
          GameSignals.playerTurnAction.dispatch(requestData)
        })
        PokerBarManager.setupButtonOnClick(call, ()=>{
          console.log(3)
        })    
        PokerBarManager.setupButtonOnClick(raise, ()=>{
          console.log(4)
        })    
        PokerBarManager.setupButtonOnClick(bet, ()=>{
          const selectedBetValue = BettingManager.getBetValueNumber()
          requestData.action = bet
         if(selectedBetValue) requestData.data = selectedBetValue
          console.log(selectedBetValue)
          GameSignals.playerTurnAction.dispatch(requestData)
        })
      }

      public updatePlayerTurn(playerTurnData: PlayerTurnData){
        const {playerIdGameTurn, serverTime, turnRespondTime} = playerTurnData
        PlayersManager.turnOffPlayersTimer()
        const player = PlayersManager.getPlayer(playerIdGameTurn)
        if(player) player.startTimer(serverTime, turnRespondTime )
      }

      public createUiInterface(scene: BaseScene){
        BettingManager.createBetting(scene)
        PokerBarManager.createPokerBar(scene);
      }

      public createPlayer(playerData: ServerPlayerData){
        const { id, money, nick, sit, bet, position } = playerData;
        const { sitPosition, betPosition, cardsPositions } = SitPositionManager.getConfigPositions(sit);
        const config = { ...PLAYER_CONFIG };
        config.x = sitPosition.x;
        config.y = sitPosition.y;
        config.bet.x = betPosition.x;
        config.bet.y = betPosition.y;
        config.id = id;
        config.sit = sit;
        config.bet.text.message = bet;
        config.position = position;
        config.nickname.message = nick;
        config.money.message = money;
        config.cardsAnimPositions.animStartPosition = cardsPositions.dealAnimStartPositions;
        config.cardsAnimPositions.animEndPosition = cardsPositions.dealAnimEndPositions;
        for (let i = 0; i < cardsPositions.dealAnimEndPositions.length; i++) {
            config.cards[i].x = cardsPositions.dealAnimEndPositions[i].x;
            config.cards[i].y = cardsPositions.dealAnimEndPositions[i].y;
        }

        const player = new Player(config);

        return player;
      }

      public async initNextRound(nextRoundData: NextRoundData){
        await TableManager.layOutCards(nextRoundData.game.tableCards)
        TableManager.updateTotalBetsText(nextRoundData.game.tableBets)
        PlayersManager.resetBets()
        PlayersManager.hidePlayersSigns()
      }

      public deletePlayer(playerId: string){
        PlayersManager.deletePlayer(playerId)
      }

      
      public updatePlayerTurnAction(playerTurnAction: UpdatePlayerTurnAction){
        const {playerId, type, bet, money} = playerTurnAction
        const player = PlayersManager.getPlayer(playerId)
        AssetsManager.playAudio("player_turn_end")
        if(type === "check") player.setCheckSignVisible(true)
        if(type === "bet") {  
          const players = PlayersManager.getPlayers();
         PlayersManager.updatePlayerBet(playerId, players, bet)
          if(ColyseusClient.isMyId(playerId)) PokerBarManager.updateBetText(bet)
          PlayersManager.updatePlayerMoneyText(playerId, players, money)
          if(ColyseusClient.isMyId(playerId)) PokerBarManager.updateMoneyText(money)
        }
      }


  }

  export default new GameManager();
  