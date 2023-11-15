import ISpriteConfig from "../../sprite/interface/ISpriteConfig";
// import IMaskConfig from "../../../interfaces/IMaskConfig";

export default interface IProgressBarConfig {
    x: number,
    y: number,
    background: ISpriteConfig,
    container: ISpriteConfig,
    bar: ISpriteConfig,
    mask: {
      width: number,
    }
  }
  