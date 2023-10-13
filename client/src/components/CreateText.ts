import * as PIXI from "pixi.js";
import TextConfig from "../interfaces/TextConfig";

export default class Text extends PIXI.Text {
    constructor(config: TextConfig) {
        const {message, x, y, anchorX, anchorY, visible, textConfig} = config;
      super(message, textConfig);
      this.anchor.set(anchorX, anchorY);
      this.position.set(x, y);
      this.visible = visible;
    }
  }
