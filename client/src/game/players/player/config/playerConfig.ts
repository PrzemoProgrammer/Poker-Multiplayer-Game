export const PLAYER_SIGN_TEXTURE_TYPES = ["check_sign", "call_sign", "raise_sign", "winner_sign"]
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
    position: "player",
    avatar: {
        path: "",
        key: "default_avatar",
        type: "sprite",
        x: 0,
        y: 0,
        scaleX: 1, 
        scaleY: 1,
        angle: 0,
        anchorX: 0.5,
        anchorY: 0.5,
        visible: true
  },
  nickname: {
    message: "Guest",
    x: 0,
    y: -100,
    scaleX: 1, 
    scaleY: 1,
    angle: 0,
    anchorX: 0.5,
    anchorY: 0.5,
    visible: true,
    textConfig: {
      fontFamily: 'Arial',
      fontSize: 36,
      fill: 0xFFFFFF, 
    }
  },
    money: {
      message: 0,
      x: 0,
      y: 55,
      scaleX: 1, 
      scaleY: 1,
      angle: 0,
      anchorX: 0.5,
      anchorY: 0.5,
      visible: true,
      textConfig: {
        fontFamily: 'Arial',
        fontSize: 36,
        fill: 0x000000, 
      }
    },
    bet: {
      x: 100,
      y: 100,
      visible: false,
      image: {
        path: "",
        key: "bet",
        type: "sprite",
        x: 0,
        y: 0,
        scaleX: 1, 
        scaleY: 1,
        angle: 0,
        anchorX: 0.5,
        anchorY: 0.5,
        visible: true
      },
      background: {
        path: "",
        key: "bet_background",
        type: "sprite",
        x: 0,
        y: 0,
        scaleX: 1, 
        scaleY: 1,
        angle: 0,
        anchorX: 0.5,
        anchorY: 0.5,
        visible: true
      },
      text: {
        message: 0,
        x: 0,
        y: 40,
        scaleX: 1, 
        scaleY: 1,
        angle: 0,
        anchorX: 0.5,
        anchorY: 0.5,
        visible: true,
        textConfig: {
          fontFamily: 'Arial',
          fontSize: 36,
          fill: 0x000000, 
        }
      }
    },
    dealerSign:  {
      path: "",
      key: "dealer_sign",
      type: "sprite",
      x: -50,
      y: -50,
      scaleX: 1, 
      scaleY: 1,
      angle: 0,
      anchorX: 0.5,
      anchorY: 0.5,
      visible: false
    },
    actionSign:  {
      path: "",
      key: "check_sign",
      type: "sprite",
      x: -50,
      y: 22,
      scaleX: 1, 
      scaleY: 1,
      angle: 0,
      anchorX: 0.5,
      anchorY: 0.5,
      visible: false
    },
    cards: [
     {
        path: "",
        key: "card_hidden",
        type: "sprite",
        x: 0,
        y: 0,
        scaleX: 0.4, 
        scaleY: 0.4,
        angle: -10,
        anchorX: 0.5,
        anchorY: 0.5,
        visible: false
      }, 
     {
        path: "",
        key: "card_hidden",
        type: "sprite",
        x: 50,
        y: 0,
        scaleX: 0.4, 
        scaleY: 0.4,
        angle: 10,
        anchorX: 0.5,
        anchorY: 0.5,
        visible: false
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
        x:0,
        y:100,
        background: {
          path: "",
          key: "timer_bar_background",
          type: "sprite",
          x: 13,
          y: 0,
          scaleX: 1, 
          scaleY: 1,
          angle: 0,
          anchorX: 0.5,
          anchorY: 0.5,
          visible: true
        },
        container: {
          path: "",
          key: "timer_bar_container",
          type: "sprite",
          x: 0,
          y: 0,
          scaleX: 1, 
          scaleY: 1,
          angle: 0,
          anchorX: 0.5,
          anchorY: 0.5,
          visible: true
        },
        bar: {
          path: "",
          key: "timer_bar",
          type: "sprite",
          x: 13,
          y: 0,
          scaleX: 1, 
          scaleY: 1,
          angle: 0,
          anchorX: 0.5,
          anchorY: 0.5,
          visible: true
        },
        mask: {
          x: -90,
          y: -10,
          width: 196,
          height: 19
        },
      }
    },
}