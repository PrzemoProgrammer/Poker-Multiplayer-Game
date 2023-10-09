// import * as PIXI from "pixi.js";
import { Sprite } from "pixi.js";
import BaseEntity from "./BaseEntity";
import CreateComponent from "../components/CreateComponent";

interface PlayerConfig {
    x: number,
    y: number,
    sprite: {
        path: string,
        key: string,
        type: string,
        x: number,
        y: number,
        anchorX: number,
        anchorY: number,
        visible: boolean
    }
}

export default class Player extends BaseEntity {
    avatarSprite: Sprite | null
    config: PlayerConfig
  constructor(config: PlayerConfig) {
    const {x,y} = config
    super(x,y)
    this.config = config
    this.avatarSprite = this.createSprite()
  }

  createSprite(): Sprite | null {
    const spriteConfig = this.config.sprite
    const sprite = CreateComponent.create(spriteConfig)
    if (sprite !== null) this.addChild(sprite);
    return sprite
  }



}
