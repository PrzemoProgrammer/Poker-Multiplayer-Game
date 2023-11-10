import PokerBarFactory from "../factory/PokerBarFactory";
import BaseScene from "../../abstraction/BaseScene";
import {BUTTON_TYPES} from "../../config/gameConfig";

class PokerBarManager {
    pokerBar: PokerBarFactory | null
    constructor() {
        this.pokerBar = null
    }

    public createPokerBar(scene: BaseScene){
     this.pokerBar = new PokerBarFactory(scene);
    }

    public updateMoneyText(text: number){
     this.pokerBar?.moneyText?.updateMessage(text);
    }

    public updateBetText(text: number){
        this.pokerBar?.betsText?.updateMessage(text)
    }

    public setupButtonOnClick(type: string, callback: () => void){
       const [fold, check, call, raise, bet] = BUTTON_TYPES
        if(type === fold) this.pokerBar?.foldButton?.onClick(callback)
        if(type === check) this.pokerBar?.checkButton?.onClick(callback)
        if(type === call) this.pokerBar?.callButton?.onClick(callback)
        if(type === raise) this.pokerBar?.raiseButton?.onClick(callback)
        if(type === bet) this.pokerBar?.betButton?.onClick(callback)
    }
  }
  
  export default new PokerBarManager();
  