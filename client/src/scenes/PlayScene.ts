import * as PIXI from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from "../config/gameConfig";
import spritesConfig from "../../assets/spritesConfig.json";
import CreateComponent from "../components/CreateComponent";
import SpriteConfig from "../interfaces/SpriteConfig";
import sceneManager from "../utility/managers/SceneManager";
import ColyseusClient from "../services/colyseus/ColyseusClient";
import BaseScene from "../abstraction/BaseScene";
import GameSignals from "../gameSignals/GameSignals";
import ServerPlayerData from "../interfaces/ServerPlayerData";;;
import PlayersConfig from "../interfaces/PlayersConfig";
import PlayerTurnData from "../interfaces/PlayerTurnData";
import ServerGameUpdateOnStart from "../interfaces/ServerGameUpdateOnStart";
import NextRoundData from "../interfaces/NextRoundData";
import SitPositionManager from "../utility/managers/SitPositionManager";
import GameManager from "../utility/managers/GameManager";
import PlayersManager from "../utility/managers/PlayersManager";
import TableManager from "../utility/managers/TableManager";

class PlayScene extends BaseScene {
    constructor() {
        super("PlayScene");
    }

    get gw() {
        return GAME_WIDTH;
    }
    get gh() {
        return GAME_HEIGHT;
    }

    init() {
        this.createStaticComponents();
        this.createTable()
        this.createUiInterface();

        this.bindSignals();
        this.startSetupGameScene();
    }

    updateGame() {
        // sceneManager.game.ticker.add((delta) => {
        //   if (this.isPaused) return;
        // })
    }

    bindSignals(): void {
        GameSignals.onPlayerJoined.add((playerData: ServerPlayerData) => this.addPlayerToGame(playerData));
        GameSignals.onGetPlayers.add((playerData: PlayersConfig) => this.addPlayersToGame(playerData));
        GameSignals.onStartGameData.add((initGameData: ServerGameUpdateOnStart) =>
            this.updateGameOnStart(initGameData),
        );
        GameSignals.onChangePlayerTurn.add((newPlayerTurn: PlayerTurnData )=> this.changePlayerTurn(newPlayerTurn))
        GameSignals.onInitNextRound.add((initNextRoundData: NextRoundData )=> this.initNextRound(initNextRoundData)) 
        GameSignals.onPlayerLeave.add((playerId: string )=> this.deletePlayerFromGame(playerId))
    }

    addPlayerToGame(playerData: ServerPlayerData) {
        SitPositionManager.setupConfigPositions(playerData.sit);
        if (ColyseusClient.isMyId(playerData.id)) return;
        this.createPlayerAndAddToGame(playerData);
    }

    addPlayersToGame(playersData: PlayersConfig) {
        for (const playerId in playersData) {
            const playerData = playersData[playerId];
            this.createPlayerAndAddToGame(playerData);

            if (ColyseusClient.isMyId(playerData.id)) GameManager.updateInterfaceMoneyText(playerData.money);
        }
    }

    updateGameOnStart(initGameData: ServerGameUpdateOnStart) {
      GameManager.updateGameOnStart(initGameData);
    }

    changePlayerTurn(newPlayerTurn: PlayerTurnData ){
      GameManager.updatePlayerTurn(newPlayerTurn)
    }

    createPlayerAndAddToGame(playerData: ServerPlayerData) {
        const player = this.createPlayer(playerData);
        PlayersManager.addPlayer(player);
    }

    async initNextRound(nextRoundData: NextRoundData){
      GameManager.initNextRound(nextRoundData)
    }

    deletePlayerFromGame(playerId: string){
      GameManager.deletePlayer(playerId)
    }

    createStaticComponents() {
        for (let spriteConfig in spritesConfig) {
            const spriteData: SpriteConfig = spritesConfig[spriteConfig as keyof typeof spritesConfig];
            const sprite = CreateComponent.create(spriteData);
            if (sprite !== null) this.addChild(sprite);
        }
    }

    createPlayer(playerData: ServerPlayerData){
      const player = GameManager.createPlayer(playerData)
      if (player !== null) this.addChild(player);
      return player;
    }

    startSetupGameScene() {
      sceneManager.startScene("SetupGameScene");
    }

    createUiInterface() {
      GameManager.createUiInterface(this)
    }

    createTable(){
      TableManager.createTable(this)
    }
}

export default new PlayScene();
