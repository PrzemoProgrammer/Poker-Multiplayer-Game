import * as PIXI from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from "../config/gameConfig";
import spritesConfig from "../../assets/spritesConfig.json";
import CreateComponent from "../components/CreateComponent";
import SpriteConfig from "../interfaces/SpriteConfig";
import PlayerStorage from "../utility/PlayerStorage";

export default class PlayScene extends PIXI.Container {

  constructor() {
    super();

    this.createComponents()
  }
  get gw() {
    return GAME_WIDTH;
  }
  get gh() {
    return GAME_HEIGHT;
  }


  updateGame() {
    // sceneManager.game.ticker.add((delta) => {
    //   if (this.isPaused) return;
    // });
  }

  createComponents(){
    for (let spriteConfig in spritesConfig) {
      const spriteData: SpriteConfig = spritesConfig[spriteConfig as keyof typeof spritesConfig];
      const sprite = CreateComponent.create(spriteData)
      if (sprite !== null) this.addChild(sprite);
    }
  }

 
}
