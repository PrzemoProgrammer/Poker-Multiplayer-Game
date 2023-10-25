import SpriteConfigBase from "../interfaces/SpriteConfigBase";

export default interface DefaultSpriteConfig extends SpriteConfigBase {
    x: number;
    y: number;
    anchorX: number;
    anchorY: number;
    scaleX: number, 
    scaleY: number,
    angle: number,
    visible: boolean;
  }