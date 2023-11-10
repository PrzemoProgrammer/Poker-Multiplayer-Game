// import * as PIXI from "pixi.js";
import { Sprite, Text } from "pixi.js";
import CreateSprite from "../../components/CreateSprite";
import BaseEntity from "./BaseEntity";
import CreateComponent from "../CreateComponent";
import CreateText from "../CreateText";
import Bet from "../bet/Bet";
import PlayerConfig from "../../interfaces/PlayerConfig";
import Card from "../../interfaces/CardData";
import SpriteConfig from "../../interfaces/SpriteConfig";
import PlayerCards from "./cards/PlayerCards";
import Timer from "../Timer";

export default class Player extends BaseEntity {
    avatarSprite: Sprite | null
    config: PlayerConfig
    nickname: Text
    money: Text
    dealerSign: CreateSprite | null
    checkSign: CreateSprite | null
    id: string
    bet: Bet
    gamePosition: string
    cards: PlayerCards
    timer: Timer
  constructor(config: PlayerConfig) {
    const {x,y} = config
    super(x,y)
    this.config = config
    this.id = this.config.id
    this.gamePosition = this.config.position
    
    this.avatarSprite = this.createAvatar()
    this.nickname = this.createNickname()
    this.money = this.createMoney()
    this.dealerSign = this.createDealerSign()
    this.checkSign = this.createCheckSign()
    this.bet = this.createBet()
    this.cards = this.createCards()
    this.timer = this.createTimer()
  }

  private createAvatar(): Sprite | null {
    const spriteConfig = this.config.avatar
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

  private createCards():PlayerCards {
    const cards = new PlayerCards()
    cards.addCards(this.config.cards)
    cards.setAnimStartPosition(this.config.cardsAnimPositions.animStartPosition)
    cards.setAnimEndPosition(this.config.cardsAnimPositions.animEndPosition )
    this.addChild(cards);

    return cards
  }

  private createTimer() {
    const config = this.config.timer
    const timer = new Timer(config)
    timer.setVisible(false)
    this.addChild(timer);

    return timer
  }

  private createDealerSign(): CreateSprite | null  {
    const config = this.config.dealerSign
    const dealerSign = CreateComponent.create(config);
    if (dealerSign !== null) this.addChild(dealerSign);

    return dealerSign
  }

  private createCheckSign(): CreateSprite | null  {
    const config = this.config.checkSign
    const checkSign = CreateComponent.create(config);
    if (checkSign !== null)  this.addChild(checkSign);

    return checkSign
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

  public startTimer(serverTime: number, respondTime: number){
    this.timer.startCountdown(serverTime, respondTime)
  }

  public resetBet(){
    this.bet.setVisible(false)
    this.bet.updateText(0)
  }

  public setDealerSignVisible(value: boolean){
    this.dealerSign?.setVisible(value)
  }

  public turnOffTimer(){
    this.timer.resetTimer()
  }

  public setCheckSignVisible(value: boolean){
    this.checkSign?.setVisible(value)
  }
  
}