import { GAME_HEIGHT, GAME_WIDTH } from "../config/gameConfig";
import { Application} from "pixi.js";

export function resizeScreen(game:Application ): void{
  const scaleFactor = calculateScaleFactor();
  const newWidth = GAME_WIDTH * scaleFactor;
  const newHeight = GAME_HEIGHT * scaleFactor;

  game.renderer.resize(newWidth, newHeight);

  game.view.style.position = "absolute";
  game.view.style.left = `${(window.innerWidth - newWidth) / 2}px`;
  game.view.style.top = `${(window.innerHeight - newHeight) / 2}px`;

  game.stage.scale.set(scaleFactor);
}

function calculateScaleFactor(): number {
  const scaleFactor = Math.min(
    window.innerWidth / GAME_WIDTH,
    window.innerHeight / GAME_HEIGHT
  );
  return scaleFactor;
}
