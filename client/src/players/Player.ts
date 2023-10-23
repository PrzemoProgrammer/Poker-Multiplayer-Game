// import * as PIXI from "pixi.js";
import { Sprite, Text } from "pixi.js";
import BaseEntity from "./BaseEntity";
import CreateComponent from "../components/CreateComponent";
import CreateText from "../components/CreateText";
import Bet from "../bet/Bet";
import PlayerConfig from "../interfaces/PlayerConfig";
import Card from "../interfaces/Card";

export default class Player extends BaseEntity {
    avatarSprite: Sprite | null
    config: PlayerConfig
    nickname: Text
    money: Text
    id: string
    bet: Bet
    gamePosition: string
    cards: Card[]
  constructor(config: PlayerConfig) {
    const {x,y} = config
    super(x,y)
    this.config = config
    this.cards = this.config.cards
    this.id = this.config.id
    this.gamePosition = this.config.position
    
    this.avatarSprite = this.createSprite()
    this.nickname = this.createNickname()
    this.money = this.createMoney()
    this.bet = this.createBet()
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

  createMoney() {
    const moneyConfig = this.config.money
    const nickname = new CreateText(moneyConfig)
    this.addChild(nickname);

    return nickname
  }

  createBet(){
    const betConfig = this.config.bet
    const bet = new Bet(betConfig)
    this.addChild(bet);

    return bet
  }

  public updateMoneyText(updatedText: number){
    this.money.text = updatedText;
  }

  public updateGamePosition(updatedPosition: string){
    this.gamePosition = updatedPosition
  }

  public updateCards(updatedCards: Card[]): void{
    this.cards = updatedCards
  }

  public updateBets(updatedBets: number){
    this.bet.text.text = updatedBets
  }

}
