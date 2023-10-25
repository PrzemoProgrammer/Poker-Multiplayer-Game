import { Sprite, Container} from "pixi.js";
import { DEAL_ANIM_CONFIG } from "../config/cardAnimationConfig";
import CreateComponent from "../components/CreateComponent";
import CreateSprite from "../components/CreateSprite";
import SpriteConfig from "../interfaces/SpriteConfig";
import Card from "../interfaces/Card";
import AssetsManager from "../utility/AssetsManager";
import * as PIXI from "pixi.js";
import gsap from "gsap";

export default class Cards extends Container {
  cards: CreateSprite[]
  dealAnimEndPositions:{x: number;y: number}[];
  dealAnimStartPositions:{x: number;y: number}[];
  constructor() {
    super()

    this.dealAnimStartPositions = []
    this.dealAnimEndPositions = []
    this.cards = []
  }

  public addCard(cardConfig: SpriteConfig){
    const card = this.createCard(cardConfig)
    if (card !== null)
    this.cards.push(card)
  }

  public addCards(cardsConfig: SpriteConfig[]) {
    for(let i = 0; i < cardsConfig.length; i++) {
      const cardSpriteConfig = cardsConfig[i]
      this.addCard(cardSpriteConfig)
    }
  }

  private createCard(config: SpriteConfig): CreateSprite | null  {
    const cardConfig = config
    const sprite = CreateComponent.create(cardConfig)
    if (sprite !== null) this.addChild(sprite);
    return sprite
  }

  public scaleCards(value: number){
    this.cards.forEach(card => {  
      if (card !== null)
      this.scaleCard(card, value)}
    )
  }

  public scaleCard(card: Sprite , value: number){
    card.scale.x *= value,
    card.scale.y *= value
  }

  private dealAnim(card: Sprite, x: number,y: number, scale: number){
    const {duration, ease, scaleOnStart, angle} = DEAL_ANIM_CONFIG

    const scaleProps = {scale:card.scale.x*scaleOnStart, angle:card.angle,x:card.x,y:card.y}
     gsap.to(scaleProps, {
      scale: scale, 
      angle: card.angle + angle,
      x,
      y,
      duration: duration,
      ease: ease,
      onUpdate:()=>{
        card.angle = scaleProps.angle
        card.scale.x = scaleProps.scale
        card.scale.y = scaleProps.scale
        card.x = scaleProps.x
        card.y = scaleProps.y
      }
    });
  }

  private resetCardsAnimPositions(index: number){
      this.cards[index].x = this.dealAnimStartPositions[index].x
      this.cards[index].y = this.dealAnimStartPositions[index].y
  }

  public startDealAnim(index: number, scale: number){
      const x = this.dealAnimEndPositions[index].x
      const y = this.dealAnimEndPositions[index].y
      const card = this.cards[index]
      card.visible = true
      this.resetCardsAnimPositions(index)
      this.dealAnim(card, x, y, scale)
  }

  public getCards():Sprite[] {
    return this.cards
  }

 public turnOverCardsAnim(cardsSymbols: Card[]){
  for (let i = 0; i < this.cards.length; i++) {
    const card = this.cards[i]
    const cardSymbolImage = cardsSymbols[i].name
    this.turnOverCardAnim(card, cardSymbolImage)
  }
}

  private turnOverCardAnim(card: CreateSprite, newTexture: string){
    gsap.to(card, {
      width: 0,
      duration: 0.2,
      ease: "none",
      yoyo: true,
      repeat: 1,
      onRepeat: () => {
        card.changeTexture(newTexture)
      },
    });
  }

  public setAnimStartPosition(newPositions: {x: number;y: number}[]){
    this.dealAnimStartPositions = newPositions
  }

  public setAnimEndPosition(newPositions: {x: number;y: number}[]){
    this.dealAnimEndPositions = newPositions
  }

}