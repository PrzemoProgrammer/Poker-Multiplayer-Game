import * as PIXI from "pixi.js";
// import ITextConfig from "./interface/ITextConfig";

export default class Text extends PIXI.Text {
  constructor(config) {
    const {
      message,
      x = 0,
      y = 0,
      anchorX = 0,
      anchorY = 0,
      visible = true,
      isStatic = false,
      scaleX = 1,
      scaleY = 1,
      textConfig: { fontFamily = "Arial", fontSize = 55, fill = 0x000000 } = {},
    } = config;

    super(message, { fontFamily, fontSize, fill });

    this.anchor.set(anchorX, anchorY);
    this.position.set(x, y);
    this.visible = visible;
    this.scale.x = scaleX;
    this.scale.y = scaleY;
    this.cacheAsBitmap = isStatic;

    this.updateMessage(message);
  }

  updateMessage(updatedText) {
    this.text = updatedText;
  }

  get getTextInNumber() {
    return parseInt(this.text);
  }
  // private roundNumbersToK(updateMessage: number){
  //   let roundedNumber = ""
  //   if (updateMessage >= 1000) {
  //     const modifiedMessage = (Math.floor(updateMessage / 1000)).toString() + "k";
  //     roundedNumber =  modifiedMessage;
  // }
  //   return roundedNumber
  // }
}
