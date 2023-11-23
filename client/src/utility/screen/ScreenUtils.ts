import { GAME_HEIGHT, GAME_WIDTH, VIEW_POSITION } from "../../config/config";
import { Application} from "pixi.js";

export default class ScreenUtils {

  static resizeScreen(game:Application ){
    const scaleFactor = this.calculateScaleFactor()
    const {offsetX, offsetY } = this.calculateOffsetXY()
    const {newWidth, newHeight} = this.calculateGameScreenSize()
    const style = game.view.style;
  
    game.renderer.resize(newWidth, newHeight);
    style.position = VIEW_POSITION;
    style.left = `${offsetX}px`;
    style.top = `${offsetY}px`;;
    game.stage.scale.set(scaleFactor);
  }

  static calculateOffsetXY() {
    const { newWidth, newHeight } = this.calculateGameScreenSize();
    return {
      offsetX: (window.innerWidth - newWidth) / 2,
      offsetY: (window.innerHeight - newHeight) / 2
    };
  }

  static calculateGameScreenSize() {
    const scaleFactor = this.calculateScaleFactor();
    return {
      newWidth: GAME_WIDTH * scaleFactor,
      newHeight: GAME_HEIGHT * scaleFactor
    };
  }

  static calculateScaleFactor(): number {
    return Math.min(
      window.innerWidth / GAME_WIDTH,
      window.innerHeight / GAME_HEIGHT
    );
  }
}
