import * as PIXI from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from "../config/gameConfig";
import spritesConfig from "../../assets/spritesConfig.json";
import CreateComponent from "../components/CreateComponent";
import SpriteConfig from "../interfaces/SpriteConfig";
import sceneManager from "../utility/SceneManager";
import Player from "../players/Player";
import ColyseusClient from "../services/colyseus/ColyseusClient";
import BaseScene from "../abstraction/BaseScene";
import PlayerStorage from "../utility/PlayerStorage"
import GameSignals from "../gameSignals/GameSignals";
import ServerPlayerData from "../interfaces/ServerPlayerData";
import playersManager from "../utility/PlayersManager";
import PLAYER_CONFIG from "../config/playerConfig";
import PlayersConfig from "../interfaces/PlayersConfig";
import UiInterface from "../components/UiInterface";
import UiInterfaceManager from "../utility/UiInterfaceManager";


export default class PlayScene extends BaseScene {
  // uiInterface: PIXI.Container
  constructor() {
    super()

    this.createComponents()
    this.createUiInterface()

    this.bindSignals()
    this.startSetupGameScene()
  }

  get gw() {
    return GAME_WIDTH
  }
  get gh() {
    return GAME_HEIGHT
  }

  updateGame() {
    // sceneManager.game.ticker.add((delta) => {
    //   if (this.isPaused) return;
    // })
  }

  bindSignals(): void {
    GameSignals.onPlayerJoined.add((playerData: ServerPlayerData)=>this.addPlayerToGame(playerData))
    GameSignals.onGetPlayers.add((playerData: PlayersConfig)=>this.addPlayersToGame(playerData))
  }

  addPlayerToGame(playerData: ServerPlayerData) {
    if(ColyseusClient.isMyId(playerData.id)) return
    const player = this.createPlayer(playerData)
    playersManager.addPlayer(player)
  }

  addPlayersToGame(playersData: PlayersConfig) {
    for (const playerId in playersData) {
      const playerData = playersData[playerId]
      this.addPlayerToGame(playerData)
      if(ColyseusClient.isMyId(playerData.id)) UiInterfaceManager.updateMoneyText(playerData.money)
    }
  }

  createComponents(){
    for (let spriteConfig in spritesConfig) {
      const spriteData: SpriteConfig = spritesConfig[spriteConfig as keyof typeof spritesConfig]
      const sprite = CreateComponent.create(spriteData)
      if (sprite !== null) this.addChild(sprite);
    }
  }

createPlayer(playerData: ServerPlayerData): Player{
  const {id, money, nick} = playerData
  const {x, y} = playersManager.getEmptyPosition()
  const config = { ...PLAYER_CONFIG };
  config.x = x
  config.y = y
  config.id = id
  config.nickname.message = nick
  config.bets.message = money

  const player = new Player(config)
  if (player !== null) this.addChild(player);

    return player
  }

  startSetupGameScene(){
    sceneManager.startScene("SetupGameScene"); 
  }

  createUiInterface(){
    UiInterfaceManager.createInterface(this)
  }
 
}
