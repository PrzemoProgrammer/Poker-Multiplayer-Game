// import * as PIXI from "pixi.js";
import { Sprite, Text } from "pixi.js";
import BaseEntity from "./BaseEntity";
import CreateComponent from "../CreateComponent";
import CreateText from "../CreateText";
import Bet from "../bet/Bet";
import PlayerConfig from "../../interfaces/PlayerConfig";
import Card from "../../interfaces/CardData";
import SpriteConfig from "../../interfaces/SpriteConfig";
import Cards from "../card/Cards";


export default class Player extends BaseEntity {
    avatarSprite: Sprite | null
    config: PlayerConfig
    nickname: Text
    money: Text
    id: string
    bet: Bet
    gamePosition: string
    cards: Cards
  constructor(config: PlayerConfig) {
    const {x,y} = config
    super(x,y)
    this.config = config
    this.id = this.config.id
    this.gamePosition = this.config.position
    
    this.avatarSprite = this.createSprite()
    this.nickname = this.createNickname()
    this.money = this.createMoney()
    this.bet = this.createBet()
    this.cards = this.createCards()
  }

  private createSprite(): Sprite | null {
    const spriteConfig = this.config.sprite
    const sprite = CreateComponent.create(spriteConfig)
    if (sprite !== null) this.addChild(sprite);
    return sprite
  }

  private createNickname(): CreateText {
    const nicknameConfig = this.config.nickname
    const nickname = new CreateText(nicknameConfig)
    this.addChild(nickname);

    return nickname
  }

  private createMoney(): CreateText {
    const moneyConfig = this.config.money
    const moneyText = new CreateText(moneyConfig)
    this.addChild(moneyText);

    return moneyText
  }

  private createBet(): Bet{
    const betConfig = this.config.bet
    const bet = new Bet(betConfig)
    this.addChild(bet);

    return bet
  }

  private createCards():Cards {
    const cards = new Cards()
    cards.addCards(this.config.cards)
    cards.setAnimStartPosition(this.config.cardsAnimPositions.animStartPosition)
    cards.setAnimEndPosition(this.config.cardsAnimPositions.animEndPosition )
    this.addChild(cards);

    return cards
  }

  public updateMoneyText(updatedText: number){
    this.money.text = updatedText;
  }

  public updateGamePosition(updatedPosition: string){
    this.gamePosition = updatedPosition
  }

   public startDealCardsAnim(index: number, scale: number){
    this.cards.startDealAnim(index, scale)
  }

  public updateBets(updatedBets: number){
    this.bet.text.updateMessage(updatedBets)
  }

  public setBetVisible(value: boolean){
    this.bet.setVisible(value)
  }

  public getCards():Sprite[] {
    return this.cards.getCards()
  }

 public turnOverCards(cardsSymbols: Card[]){
    this.cards.turnOverCardsAnim(cardsSymbols)
  }



}
