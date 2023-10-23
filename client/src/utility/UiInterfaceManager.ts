import DataStorage from "../interfaces/DataStorage";
import Player from "../players/Player";
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
            uiInterface.moneyText.text = text;
          }
    }

    public updateBetText(text: number){
        if (uiInterface.betsText) {
            uiInterface.betsText.text = text
          }
    }


  }
  
  export default new UiInterfaceManager();
  