import { Sprite, Container} from "pixi.js";
import AssetsManager from "../../../utility/managers/AssetsManager";
import DefaultSpriteConfig from "../../../interfaces/DefaultSpriteConfig";
import CardData from "../../../interfaces/CardData";
import Card from "../../card/Card";


export default class PlayerCards extends Container {
  cards: Card[]
  dealAnimEndPositions:{x: number;y: number}[];
  dealAnimStartPositions:{x: number;y: number}[];
  constructor() {
    super()

    this.dealAnimStartPositions = []
    this.dealAnimEndPositions = []
    this.cards = []
  }

  public addCard(cardConfig: DefaultSpriteConfig){
    const card = this.createCard(cardConfig)
    if (card !== null)
    this.cards.push(card)
  }

  public addCards(cardsConfig: DefaultSpriteConfig[]) {
    for(let i = 0; i < cardsConfig.length; i++) {
      const cardSpriteConfig = cardsConfig[i]
      this.addCard(cardSpriteConfig)
    }
  }

  private createCard(config: DefaultSpriteConfig): Card | null  {
    const cardConfig = config
    const sprite = new Card(cardConfig)
    if (sprite !== null) this.addChild(sprite);
    return sprite
  }

  private dealAnim(card: Card, x: number,y: number, scale: number){
    AssetsManager.playAudio("deal_card")
    card.dealAnim(x,y,scale)
  }

  private resetCardsAnimPositions(index: number){
      this.cards[index].x = this.dealAnimStartPositions[index].x
      this.cards[index].y = this.dealAnimStartPositions[index].y
  }

  public startDealAnim(index: number, scale: number){
      const x = this.dealAnimEndPositions[index].x
      const y = this.dealAnimEndPositions[index].y
      const card = this.cards[index]
      card.setVisible(true)
      this.resetCardsAnimPositions(index)
      this.dealAnim(card, x, y, scale)
  }

  public getCards():Sprite[] {
    return this.cards
  }

 public turnOverCardsAnim(cardsSymbols: CardData[]){
  for (let i = 0; i < this.cards.length; i++) {
    const card = this.cards[i]
    const cardSymbolImage = cardsSymbols[i].name
    card.turnOverAnim(cardSymbolImage)
  }
}

  public setAnimStartPosition(newPositions: {x: number;y: number}[]){
    this.dealAnimStartPositions = newPositions
  }

  public setAnimEndPosition(newPositions: {x: number;y: number}[]){
    this.dealAnimEndPositions = newPositions
  }

}