import AssetsManager from "../managers/AssetsManager";
import BaseScene from "../abstraction/BaseScene";
import ColyseusClient from "../services/colyseus/ColyseusClient";
import PokerBarManager from "../UI/pokerBar/manager/PokerBarManager";
import BettingManager from "../UI/betting/manager/BettingManager";
import IPlayersDataStorage from "../game/players/storage/interface/IPlayersDataStorage";
import IPlayersBets from "../interfaces/IPlayersBets";
import IPlayerGamePositions from "../interfaces/IPlayerGamePositions";
import IPlayersMoney from "../interfaces/IPlayersMoney";
import PlayersManager from "../game/players/manager/PlayersManager";
import IServerGameUpdateOnStart from "../interfaces/IServerGameUpdateOnStart";
import IPlayerTurnData from "../interfaces/IPlayerTurnData";
import IServerPlayerData from "../interfaces/IServerPlayerData";
import { TURN_OVER_PLAYER_CARD_DELAY } from "../game/card/config/cardAnimsConfig";
import PlayerSitPositionManager from "../game/manager/PlayerSitPositionManager";
import Player from "../game/players/player/Player";
import PLAYER_CONFIG from "../game/players/player/config/playerConfig";
import INextRoundData from "../interfaces/INextRoundData";
import IUpdatePlayerTurnAction from "../interfaces/IUpdatePlayerTurnAction";
import TableManager from "../game/table/manager/TableManager";
import GameSignals from "../gameSignals/GameSignals";
import {BUTTON_TYPES} from "../UI/pokerBar/config/pokerBarConfig";
import IPlayersConfig from "../game/players/interface/IPlayersConfig";
import IGameResultData from "../interfaces/IGameResultData";

class GameManager {
     public async updateGameOnStart(initGameData: IServerGameUpdateOnStart){
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
                PlayersManager.turnOverPlayersCardsAnim(drawCards, true);
                resolve(); 
            }, TURN_OVER_PLAYER_CARD_DELAY);
        });
        this.updatePlayerTurn(initGameData.game.playerTurnData)
    }

      public updatePlayerMoney(playerId: string, players: IPlayersDataStorage, playersMoney: IPlayersMoney){
        const updateMoneyText = playersMoney[playerId].money
        PlayersManager.updatePlayerMoneyText(playerId, players, updateMoneyText)
        if(ColyseusClient.isMyId(playerId)) PokerBarManager.updateMoneyText(updateMoneyText)
      }

      public updatePlayerBet(playerId: string, players: IPlayersDataStorage, playersBets: IPlayersBets){
        const updateBet = playersBets[playerId].bet
        if(playersBets[playerId] !== undefined) PlayersManager.updatePlayerBet(playerId, players, updateBet)
        if(ColyseusClient.isMyId(playerId)) PokerBarManager.updateBetText(updateBet)
      }

      public updatePlayerPosition(playerId: string, players: IPlayersDataStorage, playersGamePositions: IPlayerGamePositions){
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
          requestData.action = call
          GameSignals.playerTurnAction.dispatch(requestData)
        })    
        PokerBarManager.setupButtonOnClick(raise, ()=>{
          console.log(4)
        })    
        PokerBarManager.setupButtonOnClick(bet, ()=>{
          const selectedBetValue = BettingManager.getBetValueNumber
          requestData.action = bet
         if(selectedBetValue) requestData.data = selectedBetValue
          GameSignals.playerTurnAction.dispatch(requestData)
        })
      }

      public updatePlayerTurn(gamePlayerTurnData: IPlayerTurnData){
        const {playerIdGameTurn, serverTime, turnRespondTime} = gamePlayerTurnData
        AssetsManager.playAudio("player_turn_start")
        PlayersManager.turnOffPlayersTimer()
        PlayersManager.setPlayerActionSignVisible(playerIdGameTurn, false)
        const player = PlayersManager.getPlayer(playerIdGameTurn)
        if(player) player.startTimer(serverTime, turnRespondTime )
      }

      public createUiInterface(scene: BaseScene){
        BettingManager.initBetting(scene)
        PokerBarManager.initPokerBar(scene);
      }

      public createPlayer(playerData: IServerPlayerData){
        const { id, money, nick, sit, bet, position } = playerData;
        const { sitPosition, betPosition, cardsPositions } = PlayerSitPositionManager.getPositionsConfig(sit);
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
        const player = new Player(config)

        return player;
      }

      public async initNextRound(nextRoundData: INextRoundData){
        const{tableCards,tableBets} = nextRoundData.game
        await TableManager.layOutCards(tableCards)
        TableManager.updateTotalBetsText(tableBets)
        PlayersManager.resetBets()
        PlayersManager.setPlayersSignsVisible(false)
      }

      public deletePlayer(playerId: string){
        PlayersManager.deletePlayer(playerId)
      }

      public updatePlayerTurnAction(playerTurnAction: IUpdatePlayerTurnAction){
        const [foldType, checkType, callType, raiseType, betType] = BUTTON_TYPES
        const {playerId, type, bet, money} = playerTurnAction
        const player = PlayersManager.getPlayer(playerId)
        AssetsManager.playAudio("player_turn_end")
        if(type === checkType) {
          const signTexture = "check_sign"
          player.setActionSignVisibleAndTexture(signTexture, true)
        }
        else if(type === betType) {  
          const players = PlayersManager.getPlayers();
         PlayersManager.updatePlayerBet(playerId, players, bet)
          if(ColyseusClient.isMyId(playerId)) PokerBarManager.updateBetText(bet)
          PlayersManager.updatePlayerMoneyText(playerId, players, money)
          if(ColyseusClient.isMyId(playerId)) PokerBarManager.updateMoneyText(money)
        }
        else if(type === callType) {  
          const players = PlayersManager.getPlayers();
          const signTexture = "call_sign"
          player.setActionSignVisibleAndTexture(signTexture,true)
         PlayersManager.updatePlayerBet(playerId, players, bet)
          if(ColyseusClient.isMyId(playerId)) PokerBarManager.updateBetText(bet)
          PlayersManager.updatePlayerMoneyText(playerId, players, money)
          if(ColyseusClient.isMyId(playerId)) PokerBarManager.updateMoneyText(money)
        }
      }

      public setupGamePositionsConfig(playersData: IPlayersConfig){
        const mayId = ColyseusClient.getMyId
        const myPlayerSitData = playersData[mayId].sit
        PlayerSitPositionManager.setupConfigPositions(myPlayerSitData);
      }

      public async initGameResult(gameResultData: IGameResultData){
        const {players:{playersCards}, game} = gameResultData
        PlayersManager.turnOffPlayersTimer()
        await PlayersManager.startScaleUpCardsAnim(true)
         PlayersManager.turnOverPlayersCardsAnim(playersCards, false);
      }
  }

  export default new GameManager();
  