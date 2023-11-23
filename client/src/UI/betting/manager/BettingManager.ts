import BaseScene from "../../../abstraction/BaseScene";
import BettingAdapter from "../adapter/BettingAdapter";
import {SLIDE_ANIM_CONFIG, MODIFY_NUMBER_CONFIG, BETTING_AUDIO_CONFIG} from "../config/bettingConfig";
import AudioManager from "../../../managers/AudioManager";
import gsap from "gsap";

  
export default class BettingManager {
    private static bettingAdapter: BettingAdapter = new BettingAdapter();

    public static initBetting(scene: BaseScene){
        const bettingView = this.bettingAdapter.createBetting()
        this.setupEvents()
        scene.addChild(bettingView)
       }

    private static setupEvents(){
        this.initDragEvent(this.handleBetTextUpdate)
        this.setupToggleButtonOnClick()
    }

    public static initDragEvent(callback: () => void){
        this.bettingAdapter.getArrow?.initEvents(callback.bind(this))
    }

    public static handleBetTextUpdate(){
        const {maxValue, substrate, increaseZeros} = MODIFY_NUMBER_CONFIG
        const arrowY = this.bettingAdapter.getArrowYPosition
       const roundArrowY =  Math.round(arrowY!);
       const modifiedNumber = maxValue - (roundArrowY + substrate)*increaseZeros
       this.bettingAdapter.updateBetText(modifiedNumber)
    }

    public static setupToggleButtonOnClick(){
        const button = this.bettingAdapter.getToggleButton
        button?.onClick(()=> this.startBettingSlideAnim())
    }

    public static startBettingSlideAnim(){
        const {duration, ease, shiftY} = SLIDE_ANIM_CONFIG
        const bettingButtonClickAudio = BETTING_AUDIO_CONFIG.buttonClick
        const betting = this.bettingAdapter.getBettingView
        const bettingY = this.bettingAdapter.getBettingY
        const isOpen = this.bettingAdapter.isBettingOpen
        const direction =  isOpen? 1 : -1
        this.bettingAdapter.setIsBettingOpen = !isOpen
        AudioManager.playAudio(bettingButtonClickAudio)

        gsap.to(betting, {
         y: bettingY + shiftY * direction,
         duration: duration,
         ease: ease,
       });
    }

    public static get getBetValueNumber(): number | undefined{
        return this.bettingAdapter.getBetTextNumber
    }
  }