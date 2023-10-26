import * as PIXI from "pixi.js";
import CreateSprite from "../CreateSprite";
import DefaultSpriteConfig from "../../interfaces/DefaultSpriteConfig";
import { DEAL_ANIM_CONFIG } from "../../config/cardAnimationConfig";
import gsap from "gsap";

export default class Card extends CreateSprite {
    constructor(config: DefaultSpriteConfig) {
        super(config)
      }

      public turnOverCardAnim(newTexture: string){
        gsap.to(this, {
          width: 0,
          duration: 0.2,
          ease: "none",
          yoyo: true,
          repeat: 1,
          onRepeat: () => {
            this.changeTexture(newTexture)
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

      public setScale(value: number){
        this.scale.x = value
        this.scale.y = value
      }

      public setVisible(value: boolean){
        this.visible = value
      }
}
