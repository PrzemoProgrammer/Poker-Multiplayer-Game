export default {
    x: 0,
    y: 0,
    id: "123",
    sit: 1,
    position: "player",
    cards: [{name: '', suit: '', value: ''}, {name: '', suit: '', value: ''}],
    sprite: {
        path: "",
        key: "default_avatar",
        type: "sprite",
        x: 0,
        y: 0,
        anchorX: 0.5,
        anchorY: 0.5,
        visible: true
  },
  nickname: {
    message: "Guest",
    x: 0,
    y: -100,
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
        anchorX: 0.5,
        anchorY: 0.5,
        visible: true
      },
      text: {
        message: 0,
        x: 0,
        y: 55,
        anchorX: 0.5,
        anchorY: 0.5,
        visible: true,
        textConfig: {
          fontFamily: 'Arial',
          fontSize: 36,
          fill: 0x000000, 
        }
      }
    }
}