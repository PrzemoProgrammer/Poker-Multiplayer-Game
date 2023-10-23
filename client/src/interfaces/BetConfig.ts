import SpriteConfig from "../interfaces/SpriteConfig";
import TextConfig from "../interfaces/TextConfig";


export default interface BetConfig {
    x: number;
    y: number;
    image: SpriteConfig,
    background: SpriteConfig,
    text: TextConfig
  }
  