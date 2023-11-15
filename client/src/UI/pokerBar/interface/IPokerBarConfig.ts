import ISpriteConfig from "../../../components/sprite/interface/ISpriteConfig";
import ITextConfig from "../../../components/text/interface/ITextConfig";
import IButtonConfig from "../../../components/button/interface/IButtonConfig";


export default interface IPokerBarConfig {
    bottomBar: ISpriteConfig,
    moneyText: ITextConfig,
    betsText:  ITextConfig,
    foldButton: IButtonConfig,
    betButton:IButtonConfig,
    checkButton: IButtonConfig,
    callButton: IButtonConfig,
    raiseButton: IButtonConfig
   }