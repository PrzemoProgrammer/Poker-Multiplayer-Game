import { GAME_HEIGHT, GAME_WIDTH } from "../config/config";

export default {
   background: {
      key: "login_screen_background",
      type: "sprite",
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      angle: 0,
      anchorX: 0,
      anchorY: 0,
      visible: true,
  },
  usernameTextInputConfig:{
      x: GAME_WIDTH/2,
      y: GAME_HEIGHT/2,
      id: "login-input",
      type: "text",
      classList: "no-focus-border",
      style: {
         position: "absolute",
         background: "",
         border: "none",
         width: 300,
         height: 50,
         fontSize: 30,
      }
  },

  passwordTextInputConfig:{
   x: GAME_WIDTH/2,
   y: GAME_HEIGHT/2 + 100,
   type: "text",
   classList: "no-focus-border",
   id: "login-input",
   style: {
      position: "absolute",
      background: "",
      border: "none",
      width: 300,
      height: 50,
      fontSize: 30,
   }
  },
  nicknameTextInputConfig: {
   x: GAME_WIDTH/2,
   y: GAME_HEIGHT/2 + 200,
   type: "text",
   classList: "no-focus-border",
   id: "login-input",
   style: {
      position: "absolute",
      background: "",
      border: "none",
      width: 300,
      height: 50,
      fontSize: 30,
   }
},
  loginButtonConfig: {
      spritePush: "betting_hide_button",
      scaleValue: 1,
      spriteConfig: {
          key: "betting_show_button",
          type: "sprite",
          x: GAME_WIDTH/2,
          y: GAME_HEIGHT/2 + 200,
          scaleX: 1,
          scaleY: 1,
          angle: 0,
          anchorX: 0,
          anchorY: 1,
          visible: true,
      },
  },

}