import * as PIXI from "pixi.js";
import CreateSprite from "../components/CreateSprite";
import AssetsManager from "../utility/managers/AssetsManager";
import ButtonConfig from "../interfaces/ButtonConfig";

export default class Button extends CreateSprite {
    scaleValue: number
    mainSprite: string
    spritePush: string | undefined
    originalScale: PIXI.ObservablePoint
    config: ButtonConfig
  constructor(config: ButtonConfig) {
    const {spriteConfig} = config
    super(spriteConfig)
    this.config = config
    this.mainSprite = this.texture.textureCacheIds[0]
    this.spritePush = AssetsManager.getImage(this.config.spritePush);
    this.scaleValue = this.config.scaleValue
    this.interactive = true;
    this.buttonMode = true;
    this.originalScale = this.scale.clone();
}

  onClick(cb: Function) {
    this.on("pointerdown", () => {
        if(this.spritePush)
        this.texture = PIXI.Texture.from(this.spritePush)
    });
    this.on("pointerup", () => {
    this.texture = PIXI.Texture.from(this.mainSprite)
      cb();
    });
    this.on("pointerout", () => {
        this.texture = PIXI.Texture.from(this.mainSprite)
    });
  }
  
  resetButton() {
    this.scale.copyFrom(this.originalScale);
  }

  hide() {
    this.visible = false;
  }

  show() {
    this.visible = true;
  }
}
