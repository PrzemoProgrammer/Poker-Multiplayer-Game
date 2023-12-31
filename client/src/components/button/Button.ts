import * as PIXI from "pixi.js";
import CreateSprite from "../sprite/Sprite";
import ImageManager from "../../managers/ImageManager";
import IButtonConfig from "./interface/IButtonConfig";

export default class Button extends CreateSprite {
    scaleValue: number
    mainSprite: string
    spritePush: string | undefined
    originalScale: PIXI.ObservablePoint
    config: IButtonConfig
  constructor(config: IButtonConfig) {
    const {spriteConfig} = config
    super(spriteConfig)
    this.config = config
    this.mainSprite = this.texture.textureCacheIds[0]
    this.spritePush = ImageManager.getImage(this.config.spritePush);
    this.scaleValue = this.config.scaleValue
    this.interactive = true;
    this.buttonMode = true;
    this.originalScale = this.scale.clone();
}

  public onClick(cb: Function) {
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

  public set setInteractive(value: boolean) {
    this.interactive = value;
  }

  public resetButton() {
    this.scale.copyFrom(this.originalScale);
  }

  public hide() {
    this.visible = false;
  }

  public show() {
    this.visible = true;
  }
}
