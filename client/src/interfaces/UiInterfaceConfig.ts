import SpriteConfig from "../interfaces/SpriteConfig";
import TextConfig from "../interfaces/TextConfig";
import ButtonConfig from "../interfaces/ButtonConfig";


export default interface UiInterfaceConfig {
    bottomBar: SpriteConfig,
    moneyText: TextConfig,
    betsText:  TextConfig,
    foldButton: ButtonConfig,
    checkFoldButton:ButtonConfig,
    checkButton: ButtonConfig,
    callButton: ButtonConfig,
    raiseButton: ButtonConfig
   }