import SpriteConfig from "./SpriteConfig";
import MaskConfig from "./MaskConfig";

export default interface ProgressBarConfig {
    x: number,
    y: number,
    background: SpriteConfig,
    container: SpriteConfig,
    bar: SpriteConfig,
    mask: MaskConfig
  }
  