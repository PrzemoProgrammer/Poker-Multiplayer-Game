import PokerBarAdapter from "../adater/PokerBarAdapter";
import BaseScene from "../../../abstraction/BaseScene";
import {BUTTON_TYPES} from "../../../UI/pokerBar/config/pokerBarConfig";

class PokerBarManager {
    private static pokerBarAdapter: PokerBarAdapter = new PokerBarAdapter();
    
    public static initPokerBar(scene: BaseScene){
        const pokerBarFactory = this.pokerBarAdapter.createPokerBar()
        scene.addChild(pokerBarFactory)
    }

    public static updateMoneyText(text: number){
        this.pokerBarAdapter.updateMoneyText = text
    }

    public static updateBetText(text: number){
        this.pokerBarAdapter.updateBetText = text
    }

    public static setupButtonOnClick(type: string, callback: () => void){
       const [fold, check, call, raise, bet] = BUTTON_TYPES
        if(type === fold) this.pokerBarAdapter.getFoldButton?.onClick(callback)
        if(type === check) this.pokerBarAdapter.getCheckButton?.onClick(callback)
        if(type === call)this.pokerBarAdapter.getCallButton?.onClick(callback)
        if(type === raise) this.pokerBarAdapter.getRaiseButton?.onClick(callback)
        if(type === bet) this.pokerBarAdapter.getBetButton?.onClick(callback)
    }
  }
  
  export default  PokerBarManager
  