import uiInterface from "../components/UiInterface";
import BaseScene from "../abstraction/BaseScene";


class UiInterfaceManager {
    constructor() {
    }

    public createInterface(scene: BaseScene){
        uiInterface.create(scene)
    }

    public updateMoneyText(text: number){
        if (uiInterface.moneyText) {
            uiInterface.moneyText.updateMessage(text);
          }
    }

    public updateBetText(text: number){
        if (uiInterface.betsText) {
            uiInterface.betsText.updateMessage(text)
          }
    }


  }
  
  export default new UiInterfaceManager();
  