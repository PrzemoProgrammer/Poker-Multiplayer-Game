import * as PIXI from "pixi.js";
import ITextConfig from "./interface/ITextConfig";

export default class Text extends PIXI.Text {
    constructor(config: ITextConfig) {
        const { message, x, y, anchorX, anchorY, visible, textConfig } = config;
        super(message, textConfig); 

        this.anchor.set(anchorX, anchorY);
        this.position.set(x, y);
        this.visible = visible;

        this.updateMessage(message);
    }

    public updateMessage(updatedText: string | number) {
      if(typeof updatedText === "number") {
        this.text = this.roundNumbersToK(updatedText)
      }
    }

private roundNumbersToK(updateMessage: number): string {
  return updateMessage >= 1000 ? (Math.floor(updateMessage / 1000) + 'k') : '0';
}

get getTextInNumber(): number | undefined{
  const textWithoutK = this.text.replace('k', '');
  return  parseInt(textWithoutK) * 1000
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
