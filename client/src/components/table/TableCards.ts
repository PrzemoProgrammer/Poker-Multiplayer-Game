import { Sprite, Container} from "pixi.js";
import TableCardsConfig from "../../interfaces/TableCardsConfig";
import DefaultSpriteConfig from "../../interfaces/DefaultSpriteConfig";
import CardData from "../../interfaces/CardData";
import Card from "../../components/card/Card";

export default class TableCards extends Container{
    config:TableCardsConfig
    initCardCount: number
    cardsSpace: number
    cards: Card[]
  constructor(config: TableCardsConfig) {
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

  private layOutCards(){
    const spacing = this.cardsSpace;
    const firstCardX = this.cards[0].x;
  
    for (let i = 1; i < this.cards.length; i++) {
        const card = this.getCard(i)
      const newCardX = firstCardX + (i * spacing);
      card.moveXAnim(newCardX)
    }
  }

  public newCardsTurnOverAnim(cardsSymbols: CardData[], turnedCardsLength: number){
    const newCardsLength = cardsSymbols.length
    const cardsLengthToTurn = turnedCardsLength + newCardsLength
    for (let i = turnedCardsLength; i < cardsLengthToTurn; i++) {
        const newCardSymbol = cardsSymbols[i - turnedCardsLength].name
        this.turnOverCardAnim(i , newCardSymbol)
    }
  }

  public async newCardsSlideFromTopAnim(cardsLength: number, slideCardsLength: number){
    const cardsLengthToSlide = slideCardsLength + cardsLength
     for (let i = slideCardsLength; i < cardsLengthToSlide; i++) {
       await this.slideCardFormTopAnim(i)
      }
  }

  async slideCardFormTopAnim(cardIndex: number){
    const card = this.getCard(cardIndex)
    await card.slideFromTopAnim()
  }

  turnOverCardAnim(cardIndex: number, cardSymbol: string){
    const card = this.getCard(cardIndex)
    card.turnOverAnim(cardSymbol)
  }

  public async dealCardsToTable(cardsSymbols: CardData[]){
    const cardsOnTableLength = this.cards.length
    const newUpdatedCardsLength = cardsSymbols.length
    
    const tableLaidCardsLength = this.getTableLaidCardsLength()

      await this.newCardsSlideFromTopAnim(newUpdatedCardsLength, tableLaidCardsLength)
       this.newCardsTurnOverAnim(cardsSymbols, tableLaidCardsLength)
       if(tableLaidCardsLength === 0) await this.layOutCards()
  }

  private createCard(config: DefaultSpriteConfig): Card | null  {
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