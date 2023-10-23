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
import ServerGameUpdateOnStart from "../interfaces/ServerGameUpdateOnStart";
import UiInterface from "../components/UiInterface";
import UiInterfaceManager from "../utility/UiInterfaceManager";
import SitPositionManager from "../utility/SitPositionManager";


class PlayScene extends BaseScene {
  constructor() {
    super("PlayScene")

  }

  get gw() {
    return GAME_WIDTH
  }
  get gh() {
    return GAME_HEIGHT
  }

  init(){
    this.createComponents()
    this.createUiInterface()

    this.bindSignals()
    this.startSetupGameScene()
  }

  updateGame() {
    // sceneManager.game.ticker.add((delta) => {
    //   if (this.isPaused) return;
    // })
  }

  bindSignals(): void {
    GameSignals.onPlayerJoined.add((playerData: ServerPlayerData)=>this.addPlayerToGame(playerData))
    GameSignals.onGetPlayers.add((playerData: PlayersConfig)=>this.addPlayersToGame(playerData))
    GameSignals.onStartGameData.add((startGameData: ServerGameUpdateOnStart)=>this.updateGameOnStart(startGameData))
  }

  addPlayerToGame(playerData: ServerPlayerData) {
    SitPositionManager.setupPositions(playerData.sit)
    if(ColyseusClient.isMyId(playerData.id)) return
    this.createPlayerAndAddToGame(playerData)
  }

  addPlayersToGame(playersData: PlayersConfig) {
    for (const playerId in playersData) {
      const playerData = playersData[playerId]
      this.createPlayerAndAddToGame(playerData)
    if(ColyseusClient.isMyId(playerData.id)) UiInterfaceManager.updateMoneyText(playerData.money)
    }
  }

  updateGameOnStart(startGameData: ServerGameUpdateOnStart){
    const players = playersManager.getPlayers()
    const {betsInPot, drawCards, playersBets, playersGamePositions} = startGameData


    for (const playerId in players) {

      const updateMoneyText = playersBets[playerId].money
      players[playerId].updateMoneyText(updateMoneyText)
      if(ColyseusClient.isMyId(playerId)) UiInterfaceManager.updateMoneyText(updateMoneyText)


      const updateBet = playersBets[playerId].bet
      if(playersBets[playerId] !== undefined) {
        players[playerId].updateBets(updateBet)
      }
      if(ColyseusClient.isMyId(playerId)) UiInterfaceManager.updateBetText(updateBet)
      

      const updatedPosition = playersGamePositions[playerId].position
      players[playerId].updateGamePosition(updatedPosition)


      if(drawCards[playerId] !== undefined) {
        const playerDrawCards = drawCards[playerId].drawCards.cards
        players[playerId].updateCards(playerDrawCards)
      }

      console.log(players[playerId])
    }

    console.log(startGameData)
  }

createPlayerAndAddToGame(playerData: ServerPlayerData) {
  const player = this.createPlayer(playerData)
  playersManager.addPlayer(player)
}

  createComponents(){
    for (let spriteConfig in spritesConfig) {
      const spriteData: SpriteConfig = spritesConfig[spriteConfig as keyof typeof spritesConfig]
      const sprite = CreateComponent.create(spriteData)
      if (sprite !== null) this.addChild(sprite);
    }
  }

createPlayer(playerData: ServerPlayerData): Player{
  const {id, money, nick, sit, bet, position} = playerData
  const {x, y} = SitPositionManager.getPosition(sit)
  const config = { ...PLAYER_CONFIG };
  config.x = x
  config.y = y
  config.id = id
  config.sit = sit
  config.bet.text.message = bet
  config.position = position
  config.nickname.message = nick
  config.money.message = money

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

export default new PlayScene()