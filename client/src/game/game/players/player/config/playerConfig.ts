export const PLAYER_SIGN_TEXTURE_TYPES = ["check_sign", "call_sign", "raise_sign"]
export const AUDIO_CONFIG = {
  playerTurnStart: "player_turn_start",
  playerTurnEnd: "player_turn_end",
  playerLeave: "player_leave"
}  

export const PLAYER_CONFIG = {
    x: 0,
    y: 0,
    id: "1",
    sit: 1,
    inLobby: false,
    position: "player",
    background: {
      textureKey: "avatar_background",
      x: 0,
      y: 0,
      isStatic: false,
    },
    backgroundLight: {
      textureKey: "player_background_light",
      x: 0,
      y: 0,
      isStatic: false,
      visible: false
    },
    avatar: {
      textureKey: "default_avatar",
      x: -92,
      y: 18,
      isStatic: false,
  },
  avatarMask: {
    textureKey: "avatar_mask",
    x: -92,
    y: 18,
    isStatic: false,
},
  nickname: {
    message: "Guest",
    x: -60,
    y: 4,
    scaleX: 0.5, 
    scaleY: 0.5,
    angle: 0,
    anchorX: 0,
    anchorY: 0.5,
    visible: true,
    textConfig: {
      fontFamily: 'Arial',
      fontSize: 28,
      fill: 0xC5C6C7, 
    }
  },
moneyContainer:{
  x:-38,
  y:26,
  money: {
    message: 0,
    x: 0,
    y: 0,
    scaleX: 0.5, 
    scaleY: 0.5,
    angle: 0,
    anchorX: 0,
    anchorY: 0.5,
    visible: true,
    textConfig: {
      fontFamily: 'Arial',
      fontSize: 28,
      fill: 0xFFFFFF, 
    }
  },
  moneyIcon: {
    offsetX: 15,
    image: {
      textureKey: "player_chips_icon",
      x: 0,
      y: 0,
      isStatic: false,
    }
  },

},
    bet: {
      x: 100,
      y: 100,
      visible: false,
      image: {
        textureKey: "player_chips_icon",
        x: 0,
        y: 0,
        isStatic: false,
      },
      background: {
        textureKey: "bet",
        x: 0,
        y: 0,
        isStatic: false,
      },
      text: {
        message: 0,
        x: 0,
        y: 20,
        scaleX: 1, 
        scaleY: 1,
        angle: 0,
        anchorX: 0.5,
        anchorY: 0.5,
        visible: true,
        textConfig: {
          fontFamily: 'Arial',
          fontSize: 15,
          fill: 0xFFFFFF, 
        }
      }
    },
    dealerSign:  {
      textureKey: "dealer_sign",
      x: -82,
      y: -37,
      visible: false,
      isStatic: false,
    },
    actionSign:  {
      textureKey: "check_sign",
      x: -101,
      y: -81,
      scaleX: 0.5,
      scaleY: 0.5,
      visible: false,
      isStatic: false,
    },
    blindSign:  {
      textureKey: "big_blind_sign",
      x: 92,
      y: -35,
      scaleX: 0.5,
      scaleY: 0.5,
      visible: false,
      isStatic: false,
    },
    winImage:  {
      textureKey: "winner_sign",
      x: -10,
      y: 34, //34  //-159
      visible: false,
      isStatic: false,
    },
    cards: [
     {
      textureKey: "card_hidden",
      x: 0,
      y: 0,
      scaleX: 1, //0.5
      scaleY: 1, //0.5
      // angle: -10,
      visible: false,
      isStatic: false,
      }, 
     {
      textureKey: "card_hidden",
      x: 30,
      y: 0,
      scaleX: 1, //0.5
      scaleY: 1, //0.5
      // angle: 10,
      visible: false,
      isStatic: false,
      }, 
    ],
    cardsAnimPositions: {
      animStartPosition:  [
        {x:0, y:0},
        {x:0, y:0}
      ],
      animEndPosition:  [
        {x:100, y:0},
        {x:100, y:0}
      ],
    },
    timer: {
      countdownSeconds: 15,
      fps: 60,
      progressBar: {
        x:-21,
        y:55,
        background: {
          textureKey: "timer_bar_background",
          x: 13,
          y: 0,
          isStatic: false,
        },
        container: {
          textureKey: "timer_bar_container",
          x: 0,
          y: 0,
          isStatic: false,
        },
        bar: {
          textureKey: "timer_bar",
          x: 13,
          y: 0,
          isStatic: false,
        },
        mask: {
          x: -101,
          y: -10,
          width: 227,
          height: 19
        },
      }
    },
}