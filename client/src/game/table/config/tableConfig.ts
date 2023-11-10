export default {
    bet: {
        x: 970,
        y: 500,
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
      card: {
        count: 5,
        space: 100,
        config: {
            path: "",
            key: "card_hidden",
            type: "sprite",
            x: 770,
            y: -110,
            scaleX: 0.6, 
            scaleY: 0.6,
            angle: 0,
            anchorX: 0.5,
            anchorY: 0.5,
            visible: true
          }, 
      }
     
     
}