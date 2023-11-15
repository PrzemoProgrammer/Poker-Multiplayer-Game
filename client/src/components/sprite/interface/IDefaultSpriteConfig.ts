import ISpriteConfigBase from "./ISpriteConfigBase";

export default interface IDefaultSpriteConfig extends ISpriteConfigBase {
    x: number;
    y: number;
    anchorX: number;
    anchorY: number;
    scaleX: number, 
    scaleY: number,
    angle: number,
    visible: boolean;
  }