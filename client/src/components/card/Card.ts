import * as PIXI from "pixi.js";
import CreateSprite from "../CreateSprite";
import DefaultSpriteConfig from "../../interfaces/DefaultSpriteConfig";
import { DEAL_ANIM_CONFIG, LAY_OF_ANIM_CONFIG, SLIDE_FROM_TOP_ANIM_CONFIG, TURN_OVER_ANIM_CONFIG } from "../../config/cardAnimsConfig";
import gsap from "gsap";

export default class Card extends CreateSprite {
  isTurned: boolean
  isSlideDown: boolean
    constructor(config: DefaultSpriteConfig) {
        super(config)

        this.isTurned = false
        this.isSlideDown = false
      }

      public async turnOverAnim(newTexture: string){
        const {duration, ease, yoyo, repeat} = TURN_OVER_ANIM_CONFIG
        await gsap.to(this, {
          width: 0,
          duration: duration,
          ease: ease,
          yoyo: yoyo,
          repeat: repeat,
          onRepeat: () => {
            this.changeTexture(newTexture)
            this.isTurned = true
          },
        });
      }

      public dealAnim(x: number,y: number, scale: number){
        const {duration, ease, scaleOnStart, angle} = DEAL_ANIM_CONFIG
        const scaleProps = {scale:this.scale.x*scaleOnStart, angle:this.angle,x:this.x,y:this.y}
         gsap.to(scaleProps, {
          scale: scale, 
          angle: this.angle + angle,
          x,
          y,
          duration: duration,
          ease: ease,
          onUpdate:()=>{
            this.angle = scaleProps.angle
            this.setScale(scaleProps.scale)
            this.x = scaleProps.x
            this.y = scaleProps.y
          }
        });
      }

      public async slideFromTopAnim(){
        const {ease, duration, y}= SLIDE_FROM_TOP_ANIM_CONFIG
       await  gsap.to(this, {
          y: y,
          duration: duration,
          ease: ease,
          onComplete: () => {
            this.isSlideDown = true
          },
        });
      }
 
      public async moveXAnim(newX: number){
        const {ease, duration} = LAY_OF_ANIM_CONFIG
        await  gsap.to(this, {
           x: newX,
           duration: duration,
           ease: ease,
         });
       }

      setYPosition(newY: number){
        this.y = newY
      }

      public setScale(value: number){
        this.scale.x = value
        this.scale.y = value
      }

      public setVisible(value: boolean){
        this.visible = value
      }

      public isPlacedOnTable(): boolean{
        return this.isTurned && this.isSlideDown
      }
}
