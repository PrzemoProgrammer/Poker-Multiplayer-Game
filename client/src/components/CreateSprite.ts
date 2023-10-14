import * as PIXI from "pixi.js";
import AssetsManager from "../utility/AssetsManager";
import DefaultSpriteConfig from "../interfaces/DefaultSpriteConfig";


// interface SpriteConfig {
//     key: string;
//     type: string;
//     x: number;
//     y: number;
//     anchorX: number;
//     anchorY: number;
//     visible: boolean;
//   }


export default class Sprite extends PIXI.Sprite {
    constructor(config: DefaultSpriteConfig) {
        const {key, x, y, anchorX, anchorY, visible} = config;
        const spritePath = AssetsManager.getImage(key);
      super(PIXI.Texture.from(spritePath));
      this.anchor.set(anchorX, anchorY);
      this.position.set(x, y);
      this.visible = visible;
    }
  }


