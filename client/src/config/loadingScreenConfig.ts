import { GAME_HEIGHT, GAME_WIDTH } from "../config/config";

export default {
   background: {
      key: "loading_background",
      type: "sprite",
      x: GAME_WIDTH/2,
      y: GAME_WIDTH/2,
      scaleX: 1,
      scaleY: 1,
      angle: 0,
      anchorX: 0.5,
      anchorY: 0.5,
      visible: true,
  },
  womanCharacter: {
    key: "loading_woman",
    type: "sprite",
    x: GAME_WIDTH/2,
    y: GAME_WIDTH,
    scaleX: 1,
    scaleY: 1,
    angle: 0,
    anchorX: 0.5,
    anchorY: 1,
    visible: true,
  },
  loadingText: {
    key: "loading_text",
    type: "sprite",
    x: GAME_WIDTH/2,
    y: GAME_HEIGHT / 2 - 300,
    scaleX: 1,
    scaleY: 1,
    angle: 0,
    anchorX: 0.5,
    anchorY: 0.5,
    visible: true,
  }
}