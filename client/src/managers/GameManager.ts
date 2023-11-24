import AudioManager from "../managers/AudioManager";
import BaseScene from "../abstraction/BaseScene";
import ColyseusClient from "../services/colyseus/ColyseusClient";
import PokerBarManager from "../UI/pokerBar/manager/PokerBarManager";
import BettingManager from "../UI/betting/manager/BettingManager";
import IPlayersDataStorage from "../game/players/storage/interface/IPlayersDataStorage";
import IPlayersBets from "../interfaces/IPlayersBets";
import IPlayerGamePositions from "../game/interface/IPlayerGamePositions";
import IPlayersMoney from "../interfaces/IPlayersMoney";
import PlayersManager from "../game/players/manager/PlayersManager";
import IAllPlayerJoinedServerData from "../interfaces/IAllPlayerJoinedServerData";
import IPlayerTurnData from "../interfaces/IPlayerTurnData";
import IServerPlayerData from "../interfaces/IServerPlayerData";
import { TURN_OVER_PLAYER_CARD_DELAY } from "../game/card/config/cardAnimsConfig";
import PlayerSitPositionManager from "../game/manager/PlayerSitPositionManager";
import Player from "../game/players/player/Player";
import {PLAYER_CONFIG, PLAYER_SIGN_TEXTURE_TYPES, AUDIO_CONFIG} from "../game/players/player/config/playerConfig";
import INextRoundData from "../interfaces/INextRoundData";
import IUpdatePlayerTurnAction from "../interfaces/IUpdatePlayerTurnAction";
import TableManager from "../game/table/manager/TableManager";
import GameSignals from "../gameSignals/GameSignals";
import {BUTTON_TYPES} from "../UI/pokerBar/config/pokerBarConfig";
import IPlayersConfig from "../game/players/interface/IPlayersConfig";
import IGameResultData from "../interfaces/IGameResultData";

export default class GameManager {
     public static async  onAllPlayerJoined(initGameData: IAllPlayerJoinedServerData){
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

      public static updatePlayerMoney(playerId: string, players: IPlayersDataStorage, playersMoney: IPlayersMoney){
        const updateMoneyText = playersMoney[playerId].money
        PlayersManager.updatePlayerMoneyText(playerId, players, updateMoneyText)
        if(ColyseusClient.isMyId(playerId)) PokerBarManager.updateMoneyText(updateMoneyText)
      }

      public static updatePlayerBet(playerId: string, players: IPlayersDataStorage, playersBets: IPlayersBets){
        const updateBet = playersBets[playerId].bet
        if(playersBets[playerId] !== undefined) PlayersManager.updatePlayerBet(playerId, players, updateBet)
        if(ColyseusClient.isMyId(playerId)) PokerBarManager.updateBetText(updateBet)
      }

      public static updatePlayerPosition(playerId: string, players: IPlayersDataStorage, playersGamePositions: IPlayerGamePositions){
        const updatedPosition = playersGamePositions[playerId].position
        PlayersManager.updatePlayerPosition(playerId, players, updatedPosition)
        PlayersManager.checkDisplayDealerSign(playerId, players, updatedPosition)
      }

      public static updateInterfaceMoneyText(updatedText: number){
        PokerBarManager.updateMoneyText(updatedText)
      } 

      private static setupUiInterfaceButtons(){
        const [fold, check, call, raise, bet] = BUTTON_TYPES
        const requestData = {action: "", data: 0}
        PokerBarManager.setupButtonOnClick(fold, ()=>{
          console.log("fold button clicked")
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
          console.log("raise button clicked")
        })    
        PokerBarManager.setupButtonOnClick(bet, ()=>{
          const selectedBetValue = BettingManager.getBetValueNumber
          requestData.action = bet
         if(selectedBetValue) requestData.data = selectedBetValue
          GameSignals.playerTurnAction.dispatch(requestData)
        })
      }

      public static updatePlayerTurn(gamePlayerTurnData: IPlayerTurnData){
        const {playerIdGameTurn, serverTime, turnRespondTime} = gamePlayerTurnData
        const startPlayerTurnAudio = AUDIO_CONFIG.playerTurnStart
        AudioManager.playAudio(startPlayerTurnAudio)
        PlayersManager.turnOffPlayersTimer()
        PlayersManager.setPlayerActionSignVisible(playerIdGameTurn, false)
        const player = PlayersManager.getPlayer(playerIdGameTurn)
        if(player) player.startTimer(serverTime, turnRespondTime )
      }

      public static createUiInterface(scene: BaseScene){
        BettingManager.initBetting(scene)
        PokerBarManager.initPokerBar(scene);
        this.setupUiInterfaceButtons()
      }

      public static createPlayer(playerData: IServerPlayerData){
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
        PlayersManager.addPlayer(player);
        
        return player;
      }

      public static async initNextRound(nextRoundData: INextRoundData){
        const{tableCards,tableBets} = nextRoundData.game
        await TableManager.layOutCards(tableCards)
        TableManager.updateTotalBetsTextAndMakeVisible(tableBets)
        PlayersManager.resetPlayersBets()
        PlayersManager.setPlayersSignsVisible(false)
      }

      public static deletePlayer(playerId: string){
        PlayersManager.deletePlayer(playerId)
      }

      public static updatePlayerTurnAction(playerTurnAction: IUpdatePlayerTurnAction){
        const [checkTexture, callTexture, raiseTexture] = PLAYER_SIGN_TEXTURE_TYPES
        const [foldType, checkType, callType, raiseType, betType] = BUTTON_TYPES
        const {playerId, type, bet, money} = playerTurnAction
        const player = PlayersManager.getPlayer(playerId)
        const playerTurnEndAudio = AUDIO_CONFIG.playerTurnEnd
        AudioManager.playAudio(playerTurnEndAudio)
        if(type === checkType) {
          const signTexture = checkTexture
          player.setActionSignAndTextureVisible(signTexture, true)
        }
        else if(type === betType) {  
          this.updatePlayerMoneyAndBetText(playerId, bet, money)
        }
        else if(type === callType) {  
          const signTexture = callTexture
          player.setActionSignAndTextureVisible(signTexture,true)
          this.updatePlayerMoneyAndBetText(playerId, bet, money)
        }
      }

      public static updatePlayerMoneyAndBetText(playerId: string, bet: number, money: number){
        const players = PlayersManager.getPlayers();
        PlayersManager.updatePlayerBet(playerId, players, bet)
        PlayersManager.updatePlayerMoneyText(playerId, players, money)
        if(ColyseusClient.isMyId(playerId)) this.updateUiMoneyAndBetText(bet, money)
      }

      public static updateUiMoneyAndBetText(bet: number, money: number){
        PokerBarManager.updateBetText(bet)
        PokerBarManager.updateMoneyText(money)
      }

      public static setupGamePositionsConfig(playersData: IPlayersConfig){
        const mayId = ColyseusClient.getMyId
        const myPlayerSitData = playersData[mayId].sit
        PlayerSitPositionManager.setupConfigPositions(myPlayerSitData);
      }

      public static async initGameResult(gameResultData: IGameResultData){
        const {players:{playersCards}, game:{winnerPlayerId, winnerPlayerMoney, tableBets}} = gameResultData
        const [, , , winnerTexture] = PLAYER_SIGN_TEXTURE_TYPES
        const player = PlayersManager.getPlayer(winnerPlayerId)
        const players = PlayersManager.getPlayers()
        const {x,y} = player.getPosition
        PlayersManager.turnOffPlayersTimer()
        PlayersManager.resetPlayersBets()
        TableManager.updateTotalBetsTextAndMakeVisible(tableBets)
        PlayersManager.setPlayersSignsVisible(false)
        await PlayersManager.startScaleUpCardsAnim(true)
        player.setActionSignAndTextureVisible(winnerTexture,true)
        PlayersManager.updatePlayerMoneyText(winnerPlayerId, players, winnerPlayerMoney)
        if(ColyseusClient.isMyId(winnerPlayerId)) this.updateUiMoneyAndBetText(0, winnerPlayerMoney)
        PlayersManager.turnOverPlayersCardsAnim(playersCards, false);
        TableManager.moveBetsToWinnerAnim(x,y)
      }
  }