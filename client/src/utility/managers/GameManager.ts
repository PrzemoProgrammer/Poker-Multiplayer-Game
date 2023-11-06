import { GAME_HEIGHT, GAME_WIDTH, MAX_PLAYER_CARDS } from "../../config/gameConfig";
import { Application, Container } from "pixi.js";
import BaseScene from "../../abstraction/BaseScene";
import ColyseusClient from "../../services/colyseus/ColyseusClient";
import UiInterfaceManager from "./UiInterfaceManager";
import DataStorage from "../../interfaces/DataStorage";
import PlayerBets from "../../interfaces/PlayerBets";
import PlayerGamePositions from "../../interfaces/PlayerGamePositions";
import PlayersMoney from "../../interfaces/PlayersMoney";
import PlayersManager from "./PlayersManager";
import ServerGameUpdateOnStart from "../../interfaces/ServerGameUpdateOnStart";
import PlayerTurnData from "../../interfaces/PlayerTurnData";
import ServerPlayerData from "../../interfaces/ServerPlayerData";
import { TURN_OVER_CARD_DELAY } from "../../config/cardAnimsConfig";
import SitPositionManager from "./SitPositionManager";
import Player from "../../components/players/Player";
import PLAYER_CONFIG from "../../config/playerConfig";
import NextRoundData from "../../interfaces/NextRoundData";
import TableManager from "../../utility/managers/TableManager";

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
            }, TURN_OVER_CARD_DELAY);
        });
        this.updatePlayerTurn(initGameData.game.playerTurnData)
    }

    public updatePlayerMoney(playerId: string, players: DataStorage, playersMoney: PlayersMoney){
        const updateMoneyText = playersMoney[playerId].money
        PlayersManager.updatePlayerMoneyText(playerId, players, updateMoneyText)
        if(ColyseusClient.isMyId(playerId)) UiInterfaceManager.updateMoneyText(updateMoneyText)
      }

      public updatePlayerBet(playerId: string, players: DataStorage, playersBets: PlayerBets){
        const updateBet = playersBets[playerId].bet
        if(playersBets[playerId] !== undefined) PlayersManager.updatePlayerBet(playerId, players, updateBet)
        if(ColyseusClient.isMyId(playerId)) UiInterfaceManager.updateBetText(updateBet)
      }

      public updatePlayerPosition(playerId: string, players: DataStorage, playersGamePositions: PlayerGamePositions){
        const updatedPosition = playersGamePositions[playerId].position
        PlayersManager.updatePlayerPosition(playerId, players, updatedPosition)
        PlayersManager.checkDisplayDealerSign(playerId, players, updatedPosition)
      }

      public updateInterfaceMoneyText(updatedText: number){
        UiInterfaceManager.updateMoneyText(updatedText)
      } 

      public updatePlayerTurn(playerTurnData: PlayerTurnData){
        const {playerIdGameTurn, serverTime, turnRespondTime} = playerTurnData
        const player = PlayersManager.getPlayer(playerIdGameTurn)
        if(player) player.startTimer(serverTime, turnRespondTime )
      }

      public createUiInterface(scene: BaseScene){
        UiInterfaceManager.createInterface(scene);
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
      }

      public deletePlayer(playerId: string){
        PlayersManager.deletePlayer(playerId)
      }

  }

  export default new GameManager();
  