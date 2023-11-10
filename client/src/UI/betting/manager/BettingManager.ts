import BaseScene from "../../../abstraction/BaseScene";
import BettingFactory from "../factory/BettingFactory";
import {SLIDE_ANIM_CONFIG, MODIFY_NUMBER_CONFIG} from "../config/bettingConfig";
import gsap from "gsap";

class BettingManager {
    betting: BettingFactory | null
    constructor() {
        this.betting = null
    }

    public createBetting(scene: BaseScene){
     this.betting = new BettingFactory()
     this.setupEvents()
     scene.addChild(this.betting)
    }

    private setupEvents(){
        this.initDragEvent(this.handleBetTextUpdate)
        this.setupToggleButtonOnClick()
    }

    public initDragEvent(callback: () => void){
        this.betting?.arrow?.initEvents(callback.bind(this))
    }

    public getArrowYPosition(): number | undefined  {
       return this.betting?.arrow?.y
    }

    public updateBetText(newText: number){
        this.betting?.betText?.updateMessage(newText)
    }

    public handleBetTextUpdate(){
        const {maxValue, substrate, increaseZeros} = MODIFY_NUMBER_CONFIG
        const arrowY = this.getArrowYPosition() 
       const roundArrowY =  Math.round(arrowY!);
       const modifiedNumber = maxValue - (roundArrowY + substrate)*increaseZeros
        this.updateBetText(modifiedNumber)
    }

    public setupToggleButtonOnClick(){
        const button = this.betting?.toggleButton
        button?.onClick(()=> this.startBettingSlideAnim())
    }

    public startBettingSlideAnim(){
        const {duration, ease, shiftY} = SLIDE_ANIM_CONFIG
        const direction = this.betting?.isOpen? 1 : -1
        this.betting!.isOpen = !this.betting?.isOpen

        gsap.to(this.betting, {
         y: this.betting!.y + shiftY * direction,
         duration: duration,
         ease: ease,
       });
    }

    public getBetValueNumber(): number | undefined{
        return this.betting?.betText?.getTextInNumber
    }
  }
  
  export default new BettingManager();




//   import BaseScene from "../../abstraction/BaseScene";
// import BettingFactory from "../factory/BettingFactory";
// import {SLIDE_ANIM_CONFIG, MODIFY_NUMBER_CONFIG} from "../../config/bettingConfig";
// import gsap from "gsap";

// class BettingManager {
//     betting: BettingFactory | null
//     constructor() {
//         this.betting = null
//     }

//     public createBetting(scene: BaseScene){
//      this.betting = new BettingFactory()
//      this.setupEvents()
//      scene.addChild(this.betting)
//     }

//     private setupEvents(){
//         this.initDragEvent(this.handleBetTextUpdate)
//         this.setupToggleButtonOnClick()
//     }

//     public initDragEvent(callback: () => void){
//         this.betting?.arrow?.initEvents(callback.bind(this))
//     }

//     public getArrowYPosition(): number | undefined  {
//        return this.betting?.arrow?.y
//     }

//     public updateBetText(newText: number){
//         this.betting?.betText?.updateMessage(newText)
//     }

//     public handleBetTextUpdate(){
//         const {maxValue, substrate, increaseZeros} = MODIFY_NUMBER_CONFIG
//         const arrowY = this.getArrowYPosition() 
//        const roundArrowY =  Math.round(arrowY!);
//        const modifiedNumber = maxValue - (roundArrowY + substrate)*increaseZeros
//         this.updateBetText(modifiedNumber)
//     }

//     public setupToggleButtonOnClick(){
//         const button = this.betting?.toggleButton
//         button?.onClick(()=> this.startBettingSlideAnim())
//     }

//     public startBettingSlideAnim(){
//         const {duration, ease, shiftY} = SLIDE_ANIM_CONFIG
//         const direction = this.betting?.isOpen? 1 : -1
//         this.betting!.isOpen = !this.betting?.isOpen

//         gsap.to(this.betting, {
//          y: this.betting!.y + shiftY * direction,
//          duration: duration,
//          ease: ease,
//        });
//     }

//     public getBetValueNumber(): number | undefined{
//         return this.betting?.betText?.getTextInNumber
//     }
//   }
  
//   export default new BettingManager();
