import { GAME_HEIGHT} from "../config/gameConfig";

export default {
 bottomBar: {
    path: "",
    key: "bottom_bar",
    type: "sprite",
    x: 0,
    y: GAME_HEIGHT,
    anchorX: 0,
    anchorY: 1,
    visible: true
},
moneyText:  {
    message: 0,
    x: 120,
    y: 980,
    anchorX: 0,
    anchorY: 0,
    visible: true,
    textConfig: {
      fontFamily: 'Arial',
      fontSize: 55,
      fill: 0xFFFFFF, 
    }
  },
betsText:  {
    message: 0,
    x: 450,
    y: 980,
    anchorX: 0,
    anchorY: 0,
    visible: true,
    textConfig: {
      fontFamily: 'Arial',
      fontSize: 55,
      fill: 0xFFFFFF, 
    }
  },
  foldButton:  {
    spritePush: "fold_button_push",
    scaleValue: 0.9,
    spriteConfig:{
      key: "fold_button",
      type: "sprite",
      x: 600,
      y: 1070,
      anchorX: 0,
      anchorY: 1,
      visible: true
    }
  },
  checkFoldButton: {
    spritePush: "check_fold_button_push",
    scaleValue: 0.9,
    spriteConfig:{
      key: "check_fold_button",
      type: "sprite",
      x: 850,
      y: 1070,
      anchorX: 0,
      anchorY: 1,
      visible: true
    }
  },
  checkButton: {
    spritePush: "check_button_push",
    scaleValue: 0.9,
    spriteConfig:{
      key: "check_button",
      type: "sprite",
      x: 1170,
      y: 1070,
      anchorX: 0,
      anchorY: 1,
      visible: true
    }
  },
  callButton: {
    spritePush: "call_button_push",
    scaleValue: 0.9,
    spriteConfig:{
      key: "call_button",
      type: "sprite",
      x: 1410,
      y: 1070,
      anchorX: 0,
      anchorY: 1,
      visible: true
    }
  },
  raiseButton: {
    spritePush: "raise_button_push",
    scaleValue: 0.9,
    spriteConfig:{
      key: "raise_button",
      type: "sprite",
      x: 1660,
      y: 1070,
      anchorX: 0,
      anchorY: 1,
      visible: true
    }
  }
   
}