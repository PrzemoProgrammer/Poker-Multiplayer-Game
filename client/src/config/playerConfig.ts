export default {
    x: 0,
    y: 0,
    id: "123",
    sit: 1,
    position: "player",
    sprite: {
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
      }
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
    }
    // cards: {
    //   cards: [{name: 'card_hidden', suit: '', value: ''}, {name: 'card_hidden', suit: '', value: ''}],
    //   x: 0,
    //   y: 0
    // }
}