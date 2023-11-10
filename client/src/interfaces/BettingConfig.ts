import DefaultSpriteConfig from "../interfaces/DefaultSpriteConfig";
import TextConfig from "../interfaces/TextConfig";
import ButtonConfig from "../interfaces/ButtonConfig";

export default interface BettingConfig {
    x: number,
    y: number,
    background: DefaultSpriteConfig,
    button: ButtonConfig,
    betText: TextConfig,
    textFieldBackground: DefaultSpriteConfig,
    arrow: DefaultSpriteConfig,
   }

