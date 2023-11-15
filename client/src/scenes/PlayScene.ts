import * as PIXI from "pixi.js";
import spritesConfig from "../../assets/images/spritesConfig.json";
import CreateComponent from "../actions/CreateComponent";
import ISpriteConfig from "../components/sprite/interface/ISpriteConfig";
import sceneManager from "../managers/SceneManager";
import ColyseusClient from "../services/colyseus/ColyseusClient";
import BaseScene from "../abstraction/BaseScene";
import GameSignals from "../gameSignals/GameSignals";
import IServerPlayerData from "../interfaces/IServerPlayerData";;;
import IPlayersConfig from "../game/players/interface/IPlayersConfig";
import IPlayerTurnData from "../interfaces/IPlayerTurnData";
import IServerGameUpdateOnStart from "../interfaces/IServerGameUpdateOnStart";
import INextRoundData from "../interfaces/INextRoundData";
import GameManager from "../managers/GameManager";
import PlayersManager from "../game/players/manager/PlayersManager";
import TableManager from "../game/table/manager/TableManager";
import IUpdatePlayerTurnAction from "../interfaces/IUpdatePlayerTurnAction";
import IGameResultData from "../interfaces/IGameResultData";

class PlayScene extends BaseScene {
    constructor() {
        super("PlayScene");
    }

    init() {
        this.createStaticComponents();
        this.createTable()
        this.createUiInterface();
        this.bindSignals();
        this.startSetupGameScene();
    }

    bindSignals(): void {
        GameSignals.onPlayerJoined.add((playerData: IServerPlayerData) => this.addPlayerToGame(playerData));
        GameSignals.onGetPlayers.add((playerData: IPlayersConfig) => this.addPlayersToGame(playerData));
        GameSignals.onStartGameData.add((initGameData: IServerGameUpdateOnStart) =>
            this.updateGameOnStart(initGameData),
        );
        GameSignals.onChangePlayerTurn.add((newPlayerTurn: IPlayerTurnData )=> this.changePlayerTurn(newPlayerTurn))
        GameSignals.onInitNextRound.add((initNextRoundData: INextRoundData )=> this.initNextRound(initNextRoundData)) 
        GameSignals.onPlayerLeave.add((playerId: string )=> this.deletePlayerFromGame(playerId))
        GameSignals.onUpdatePlayerTurnAction.add((playerSignData: IUpdatePlayerTurnAction )=> this.updatePlayerTurnAction(playerSignData))
        GameSignals.onGameResult.add((gameResultData: IGameResultData )=> this.initGameResult(gameResultData))
    }

    addPlayerToGame(playerData: IServerPlayerData) {
        if (ColyseusClient.isMyId(playerData.id)) return;
        this.createPlayerAndAddToGame(playerData);
    }

    addPlayersToGame(playersData: IPlayersConfig) {
      GameManager.setupGamePositionsConfig(playersData)
        for (const playerId in playersData) {
            const playerData = playersData[playerId];
            this.createPlayerAndAddToGame(playerData);
            if (ColyseusClient.isMyId(playerData.id)) GameManager.updateInterfaceMoneyText(playerData.money)
        }
    }

    updateGameOnStart(initGameData: IServerGameUpdateOnStart) {
      console.log(initGameData)
      GameManager.updateGameOnStart(initGameData);
    }

    changePlayerTurn(newPlayerTurn: IPlayerTurnData ){
      GameManager.updatePlayerTurn(newPlayerTurn)
    }

    createPlayerAndAddToGame(playerData: IServerPlayerData) {
        const player = this.createPlayer(playerData)
        PlayersManager.addPlayer(player);
    }

    async initNextRound(nextRoundData: INextRoundData){
      GameManager.initNextRound(nextRoundData)
    }

    deletePlayerFromGame(playerId: string){
      GameManager.deletePlayer(playerId)
    }

    updatePlayerTurnAction(playerSignData: IUpdatePlayerTurnAction ){
      GameManager.updatePlayerTurnAction(playerSignData)
    }

    initGameResult(gameResultData: IGameResultData){
      GameManager.initGameResult(gameResultData)
    }

    createPlayer(playerData: IServerPlayerData){
      const player = GameManager.createPlayer(playerData)
      if (player !== null) this.addChild(player.getPlayerComponents);
      return player;
    }

    startSetupGameScene() {
      sceneManager.startScene("SetupGameScene");
    }

    createUiInterface() {
      GameManager.createUiInterface(this)
    }

    createTable(){
      TableManager.initTable(this)
    }

    createStaticComponents() {
      for (let spriteConfig in spritesConfig) {
          const spriteData: ISpriteConfig = spritesConfig[spriteConfig as keyof typeof spritesConfig];
          const sprite = CreateComponent.create(spriteData);
          if (sprite !== null) this.addChild(sprite);
      }
  }
}

export default new PlayScene();