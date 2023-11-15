import { Sprite, Container} from "pixi.js";
import ITableCardsConfig from "./interface/ITableCardsConfig";
import IDefaultSpriteConfig from "../../../components/sprite/interface/IDefaultSpriteConfig";
import ICardData from "../../../interfaces/ICardData";
import Card from "../../card/Card";
import AssetsManager from "../../../managers/AssetsManager";

export default class TableCards extends Container{
    config:ITableCardsConfig
    initCardCount: number
    cardsSpace: number
    cards: Card[]
  constructor(config: ITableCardsConfig) {
    super()

    this.config = config
    this.initCardCount = this.config.count
    this.cardsSpace = this.config.space
    this.cards = []

    this.initCards()
  }

  private initCards(){
    const cardCountOnStart = this.config.count
    for (let i = 0; i < cardCountOnStart; i++) {
        const cardConfig = this.config.config
        const card = this.createCard(cardConfig)
        if(card) this.cards.push(card)
    }
  }

  private async layOutCards(){
    const spacing = this.cardsSpace;
    const firstCardX = this.cards[0].x;
    const movePromises = []
    for (let i = 1; i < this.cards.length; i++) {
        const card = this.getCard(i)
      const newCardX = firstCardX + (i * spacing);
      const movePromise = card.moveXAnim(newCardX)
      movePromises.push(movePromise)
    }
    await Promise.all(movePromises)
  }

  public async newCardsTurnOverAnim(cardsSymbols: ICardData[], turnedCardsLength: number){
    const newCardsLength = cardsSymbols.length
    const cardsLengthToTurn = turnedCardsLength + newCardsLength
    for (let i = turnedCardsLength; i < cardsLengthToTurn; i++) {
        const newCardSymbol = cardsSymbols[i - turnedCardsLength].name
        await this.turnOverCardAnim(i , newCardSymbol)
    }
  }

  public async newCardsSlideFromTopAnim(cardsLength: number, slideCardsLength: number){
    const cardsLengthToSlide = slideCardsLength + cardsLength
     for (let i = slideCardsLength; i < cardsLengthToSlide; i++) {
       await this.slideCardFormTopAnim(i)
      }
  }

  async slideCardFormTopAnim(cardIndex: number){
    AssetsManager.playAudio("slide_card")
    const card = this.getCard(cardIndex)
    await card.slideFromTopAnim()
  }

  async turnOverCardAnim(cardIndex: number, cardSymbol: string){
    AssetsManager.playAudio("turn_card")
    const card = this.getCard(cardIndex)
    await card.turnOverAnim(cardSymbol)
  }

  public async dealCardsToTable(cardsSymbols: ICardData[]){
    const newUpdatedCardsLength = cardsSymbols.length
    const tableLaidCardsLength = this.getTableLaidCardsLength()
      await this.newCardsSlideFromTopAnim(newUpdatedCardsLength, tableLaidCardsLength)
      if(tableLaidCardsLength === 0) await this.layOutCards()
       await this.newCardsTurnOverAnim(cardsSymbols, tableLaidCardsLength)
  }

  private createCard(config: IDefaultSpriteConfig): Card | null  {
    const cardConfig = config
    const sprite = new Card(cardConfig)
    if (sprite !== null) this.addChild(sprite);
    return sprite
  }

  public getCard(index: number): Card{
    return this.cards[index]
  }
  
  public getTableLaidCardsLength(): number{
    return this.cards.filter(card => card.isPlacedOnTable() === true).length;
  }
}