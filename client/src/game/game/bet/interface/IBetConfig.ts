import ISpriteConfig from "../../../components/sprite/interface/ISpriteConfig";
import ITextConfig from "../../../components/text/interface/ITextConfig";

export default interface IBetConfig {
    x: number;
    y: number;
    visible: boolean;
    image: ISpriteConfig,
    background: ISpriteConfig,
    text: ITextConfig
  }
  