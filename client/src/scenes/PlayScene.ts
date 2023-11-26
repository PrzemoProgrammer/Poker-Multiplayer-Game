import staticSpritesConfig from "../../assets/images/staticSpritesConfig.json";
import CreateComponent from "../actions/CreateComponent";
import ISpriteConfig from "../components/sprite/interface/ISpriteConfig";
import sceneManager from "../managers/SceneManager";
import ColyseusClient from "../services/colyseus/ColyseusClient";
import BaseScene from "../abstraction/BaseScene";
import GameSignals from "../gameSignals/GameSignals";
import IServerPlayerData from "../interfaces/IServerPlayerData";;;
import IPlayersConfig from "../game/players/interface/IPlayersConfig";
import IPlayerTurnData from "../interfaces/IPlayerTurnData";
import IAllPlayerJoinedServerData from "../interfaces/IAllPlayerJoinedServerData";
import INextRoundData from "../interfaces/INextRoundData";
import GameManager from "../managers/GameManager";
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
        GameSignals.onAllPlayerJoined.add((initGameData: IAllPlayerJoinedServerData) =>
            this.onAllPlayerJoined(initGameData),
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

    onAllPlayerJoined(initGameData: IAllPlayerJoinedServerData) {
      GameManager.onAllPlayerJoined(initGameData);
    }

    changePlayerTurn(newPlayerTurn: IPlayerTurnData ){
      GameManager.updatePlayerTurn(newPlayerTurn)
    }

    createPlayerAndAddToGame(playerData: IServerPlayerData) {
      const player = GameManager.createPlayer(playerData)
      if (player !== null) this.addChild(player.getPlayerComponents);
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
      for (let spriteConfig in staticSpritesConfig) {
          const spriteData: ISpriteConfig = staticSpritesConfig[spriteConfig as keyof typeof staticSpritesConfig];
          const sprite = CreateComponent.create(spriteData);
          if (sprite !== null) this.addChild(sprite);
      }
  }
}

export default new PlayScene();