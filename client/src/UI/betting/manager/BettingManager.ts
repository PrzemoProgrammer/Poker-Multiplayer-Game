import BaseScene from "../../../abstraction/BaseScene";
import BettingFactoryAdapter from "../adapter/BettingFactoryAdapter";
import {SLIDE_ANIM_CONFIG, MODIFY_NUMBER_CONFIG, AUDIO} from "../config/bettingConfig";
import AudioManager from "../../../managers/AudioManager";
import gsap from "gsap";

class BettingManager {
    bettingAdapter: BettingFactoryAdapter 
    constructor() {
        this.bettingAdapter = new BettingFactoryAdapter()
    }

    public initBetting(scene: BaseScene){
        const bettingFactory = this.bettingAdapter.createBetting()
        this.setupEvents()
        scene.addChild(bettingFactory)
       }

    private setupEvents(){
        this.initDragEvent(this.handleBetTextUpdate)
        this.setupToggleButtonOnClick()
    }

    public initDragEvent(callback: () => void){
        this.bettingAdapter.getArrow?.initEvents(callback.bind(this))
    }

    public handleBetTextUpdate(){
        const {maxValue, substrate, increaseZeros} = MODIFY_NUMBER_CONFIG
        const arrowY = this.bettingAdapter.getArrowYPosition
       const roundArrowY =  Math.round(arrowY!);
       const modifiedNumber = maxValue - (roundArrowY + substrate)*increaseZeros
       this.bettingAdapter.updateBetText(modifiedNumber)
    }

    public setupToggleButtonOnClick(){
        const button = this.bettingAdapter.getToggleButton
        button?.onClick(()=> this.startBettingSlideAnim())
    }

    public startBettingSlideAnim(){
        const {duration, ease, shiftY} = SLIDE_ANIM_CONFIG
        AudioManager.playAudio(AUDIO.swipeButton)
        const betting = this.bettingAdapter.getBettingFactory
        const bettingY = this.bettingAdapter.getBettingY
        const isOpen = this.bettingAdapter.isBettingOpen
        const direction =  isOpen? 1 : -1
        this.bettingAdapter.setIsBettingOpen = !isOpen

        gsap.to(betting, {
         y: bettingY + shiftY * direction,
         duration: duration,
         ease: ease,
       });
    }

    public get getBetValueNumber(): number | undefined{
        return this.bettingAdapter.getBetTextNumber
    }
  }
  
  export default new BettingManager();