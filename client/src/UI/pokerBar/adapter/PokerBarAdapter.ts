import PokerBarView from "../view/PokerBarView";
import Button from "../../../components/button/Button";

export default class PokerBarAdapter {
    pokerBar: PokerBarView | null
    constructor() {
        this.pokerBar = null
    }

    public createPokerBar():PokerBarView {
     return this.pokerBar = new PokerBarView();
    }

    public set updateMoneyText(text: number){
     this.pokerBar?.moneyText?.updateMessage(text);
    }

    public set updateBetText(text: number){
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
