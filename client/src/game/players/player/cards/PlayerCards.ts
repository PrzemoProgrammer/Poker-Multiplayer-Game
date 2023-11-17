import { Sprite, Container} from "pixi.js";
import AudioManager from "../../../../managers/AudioManager";
import IDefaultSpriteConfig from "../../../../components/sprite/interface/IDefaultSpriteConfig";
import ICardData from "../../../../interfaces/ICardData";
import Card from "../../../card/Card";
import { SCALE_UP_ANIM_CONFIG } from "../../../card/config/cardAnimsConfig";
import gsap from "gsap";


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

  private createCard(config: IDefaultSpriteConfig): Card | null  {
    const cardConfig = config
    const sprite = new Card(cardConfig)
    if (sprite !== null) this.addChild(sprite);
    return sprite
  }

  private dealAnim(card: Card, x: number,y: number, scale: number){
    AudioManager.playAudio("deal_card")
    card.dealAnim(x,y,scale)
  }

  private resetCardsAnimPositions(index: number){
      this.cards[index].x = this.dealAnimStartPositions[index].x
      this.cards[index].y = this.dealAnimStartPositions[index].y
  }

  public addCard(cardConfig: IDefaultSpriteConfig){
    const card = this.createCard(cardConfig)
    if (card !== null)
    this.cards.push(card)
  }

  public addCards(cardsConfig: IDefaultSpriteConfig[]) {
    for(let i = 0; i < cardsConfig.length; i++) {
      const cardSpriteConfig = cardsConfig[i]
      this.addCard(cardSpriteConfig)
    }
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

 public turnOverCardsAnim(cardsSymbols: ICardData[]){
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

  public  async startScaleUpCardsAnim(){
    const {duration, ease, scale} = SCALE_UP_ANIM_CONFIG
    const scaleProps = {scale:this.scale.x}
    await gsap.to(scaleProps, {
      scale: scale,
      duration: duration,
      ease: ease,
      onUpdate:()=>{
        this.setScale(scaleProps.scale)
      }
    });
  }

  public setScale(value: number){
    this.scale.x = value
    this.scale.y = value
  }

}