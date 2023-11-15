import IDefaultSpriteConfig from "../../../components/sprite/interface/IDefaultSpriteConfig";
import ITextConfig from "../../../components/text/interface/ITextConfig";
import IButtonConfig from "../../../components/button/interface/IButtonConfig";

export default interface IBettingConfig {
    x: number,
    y: number,
    background: IDefaultSpriteConfig,
    button: IButtonConfig,
    betText: ITextConfig,
    textFieldBackground: IDefaultSpriteConfig,
    arrow: IDefaultSpriteConfig,
   }

