// import * as PIXI from "pixi.js";
import { Sprite, Text } from "pixi.js";
import BaseEntity from "./BaseEntity";
import CreateComponent from "../components/CreateComponent";
import CreateText from "../components/CreateText";
import PlayerConfig from "../interfaces/PlayerConfig";

export default class Player extends BaseEntity {
    avatarSprite: Sprite | null
    config: PlayerConfig
    nickname: Text
    bets: Text
    id: string
  constructor(config: PlayerConfig) {
    const {x,y} = config
    super(x,y)
    this.config = config
    this.id = this.config.id
    this.avatarSprite = this.createSprite()
    this.nickname = this.createNickname()
    this.bets = this.createBets()
  }

  createSprite(): Sprite | null {
    const spriteConfig = this.config.sprite
    const sprite = CreateComponent.create(spriteConfig)
    if (sprite !== null) this.addChild(sprite);
    return sprite
  }

  createNickname() {
    const nicknameConfig = this.config.nickname
    const nickname = new CreateText(nicknameConfig)
    this.addChild(nickname);

    return nickname
  }

  createBets() {
    const betsConfig = this.config.bets
    const nickname = new CreateText(betsConfig)
    this.addChild(nickname);

    return nickname
  }
}
