import PokerBarFactory from "../factory/PokerBarFactory";
import PokerBarFactoryAdapter from "../adater/PokerBarFactoryAdapter";
import BaseScene from "../../../abstraction/BaseScene";
import {BUTTON_TYPES} from "../../../game/config/gameConfig";

class PokerBarManager {
    pokerBarAdapter: PokerBarFactoryAdapter 
    constructor() {
        this.pokerBarAdapter = new PokerBarFactoryAdapter()
    }

    public initPokerBar(scene: BaseScene){
        const pokerBarFactory = this.pokerBarAdapter.createPokerBar()
        scene.addChild(pokerBarFactory)
    }

    public updateMoneyText(text: number){
        this.pokerBarAdapter.updateMoneyText(text)
    }

    public updateBetText(text: number){
        this.pokerBarAdapter.updateBetText(text)
    }

    public setupButtonOnClick(type: string, callback: () => void){
       const [fold, check, call, raise, bet] = BUTTON_TYPES
        if(type === fold) this.pokerBarAdapter.getFoldButton?.onClick(callback)
        if(type === check) this.pokerBarAdapter.getCheckButton?.onClick(callback)
        if(type === call)this.pokerBarAdapter.getCallButton?.onClick(callback)
        if(type === raise) this.pokerBarAdapter.getRaiseButton?.onClick(callback)
        if(type === bet) this.pokerBarAdapter.getBetButton?.onClick(callback)
    }
  }
  
  export default new PokerBarManager();
  