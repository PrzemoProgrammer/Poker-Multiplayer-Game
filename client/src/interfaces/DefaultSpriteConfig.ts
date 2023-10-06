
import SpriteConfigBase from "../interfaces/SpriteConfigBase";

export default interface DefaultSpriteConfig extends SpriteConfigBase {
    x: number;
    y: number;
    anchorX: number;
    anchorY: number;
    visible: boolean;
  }