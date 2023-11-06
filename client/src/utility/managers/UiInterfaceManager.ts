import UiInterface from "../../components/UiInterface";
import BaseScene from "../../abstraction/BaseScene";
import UiInterfaceFactory from "../factory/UiInterfaceFactory";

class UiInterfaceManager {
    uiInterface: UiInterface | null
    constructor() {
        this.uiInterface = null
    }

    public createInterface(scene: BaseScene){
     this.uiInterface = UiInterfaceFactory.createInterface(scene)
    }

    public updateMoneyText(text: number){
     this.uiInterface?.moneyText?.updateMessage(text);
    }

    public updateBetText(text: number){
        this.uiInterface?.betsText?.updateMessage(text)
 
    }

  }
  
  export default new UiInterfaceManager();
  