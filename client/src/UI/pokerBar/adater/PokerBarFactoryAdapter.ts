import PokerBarFactory from "../factory/PokerBarFactory";
import Button from "../../../components/Button";

class PokerBarAdapter {
    pokerBar: PokerBarFactory | null
    constructor() {
        this.pokerBar = null
    }

    public createPokerBar():PokerBarFactory {
     return this.pokerBar = new PokerBarFactory();
    }

    public updateMoneyText(text: number){
     this.pokerBar?.moneyText?.updateMessage(text);
    }

    public updateBetText(text: number){
        this.pokerBar?.betsText?.updateMessage(text)
    }

    public get getFoldButton(): Button | null {
        return this.pokerBar!.foldButton
    }

    public get getCheckButton(): Button | null {
        return this.pokerBar!.checkButton
    }

    public get getCallButton(): Button | null {
        return this.pokerBar!.callButton
    }

    public get getRaiseButton(): Button | null {
        return this.pokerBar!.raiseButton
    }

    public get getBetButton(): Button | null {
        return this.pokerBar!.betButton
    }
  }
  
  export default PokerBarAdapter;
  