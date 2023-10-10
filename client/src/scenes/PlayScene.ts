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

export default class PlayScene extends BaseScene {
  player1: Player
  player2: Player
  player3: Player
  player4: Player


  constructor() {
    super()

    this.createComponents()
    this.player1 = this.createPlayer1()
    this.player2 = this.createPlayer2()
    this.player3 = this.createPlayer3()
    this.player4 = this.createPlayer4()

    // this.startSetupGameScene()
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

  createComponents(){
    for (let spriteConfig in spritesConfig) {
      const spriteData: SpriteConfig = spritesConfig[spriteConfig as keyof typeof spritesConfig]
      const sprite = CreateComponent.create(spriteData)
      if (sprite !== null) this.addChild(sprite);
    }
  }

  createPlayer1(): Player{
    const config = {
      x: 550,
      y: 200,
      sprite: {
          path: "",
          key: "default_avatar",
          type: "sprite",
          x: 0,
          y: 0,
          anchorX: 0.5,
          anchorY: 0.5,
          visible: true
  }
}
    const player = new Player(config)
      if (player !== null) this.addChild(player);

    return player
  }

  createPlayer2(): Player{
    const config = {
      x: 1380,
      y: 200,
      sprite: {
          path: "",
          key: "default_avatar",
          type: "sprite",
          x: 0,
          y: 0,
          anchorX: 0.5,
          anchorY: 0.5,
          visible: true
  }
}
    const player = new Player(config)
      if (player !== null) this.addChild(player);

    return player
  }

  
  createPlayer3(): Player{
    const config = {
      x: 1530,
      y: 550,
      sprite: {
          path: "",
          key: "default_avatar",
          type: "sprite",
          x: 0,
          y: 0,
          anchorX: 0.5,
          anchorY: 0.5,
          visible: true
  }
}
    const player = new Player(config)
      if (player !== null) this.addChild(player);

    return player
  }

    
  createPlayer4(): Player{
    const config = {
      x: 390,
      y: 550,
      sprite: {
          path: "",
          key: "default_avatar",
          type: "sprite",
          x: 0,
          y: 0,
          anchorX: 0.5,
          anchorY: 0.5,
          visible: true
  }
}
    const player = new Player(config)
      if (player !== null) this.addChild(player);

    return player
  }

  addNewPlayerToGame(){

  }

  startSetupGameScene(){
    sceneManager.startScene("SetupGameScene"); 
  }
 
}
