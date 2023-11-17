// import * as PIXI from "pixi.js";
import { Sprite, Text } from "pixi.js";
import CreateSprite from "../../../../components/sprite/Sprite";
import BaseEntity from "../../../../abstraction/BaseEntity";
import CreateComponent from "../../../../actions/CreateComponent";
import CreateText from "../../../../components/text/Text";
import Bet from "../../../bet/Bet";
import IPlayerConfig from "../interface/IPlayerConfig";
import PlayerCards from "./../cards/PlayerCards";
import Timer from "./../timer/Timer";

export default class PlayerFactory extends BaseEntity {
    avatarSprite: Sprite | null
    config: IPlayerConfig
    nickname: Text
    money: Text
    dealerSign: CreateSprite | null
    actionSign: CreateSprite | null
    id: string
    bet: Bet
    gamePosition: string
    cards: PlayerCards
    timer: Timer
  constructor(config: IPlayerConfig) {
    const {x,y} = config
    super(x,y)
    this.config = config
    this.id = this.config.id
    this.gamePosition = this.config.position
    
    this.avatarSprite = this.createAvatar()
    this.nickname = this.createNickname()
    this.money = this.createMoney()
    this.dealerSign = this.createDealerSign()
    this.actionSign = this.createActionSign()
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

  private createActionSign(): CreateSprite | null  {
    const config = this.config.actionSign
    const actionSign = CreateComponent.create(config);
    if (actionSign !== null)  this.addChild(actionSign);

    return actionSign
  }
}