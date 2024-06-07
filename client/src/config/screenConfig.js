import { checkIsPortraitOrientation } from "../utility/screen/checkIsPortraitOrientation";

export const GAME_SAFE_LANDSCAPE_WIDTH = 1920; //1080 //1920 //less 44%
export const GAME_SAFE_LANDSCAPE_HEIGHT = 1080; //720 //1080 //less 33%
export const GAME_SAFE_PORTRAIT_WIDTH = 1080;
export const GAME_SAFE_PORTRAIT_HEIGHT = 1920;
export const GAME_WIDTH = checkIsPortraitOrientation()
  ? GAME_SAFE_PORTRAIT_WIDTH
  : GAME_SAFE_LANDSCAPE_WIDTH;
export const GAME_HEIGHT = checkIsPortraitOrientation()
  ? GAME_SAFE_PORTRAIT_HEIGHT
  : GAME_SAFE_LANDSCAPE_HEIGHT;
export const SCREEN_TYPES = {
  landscape: "landscape",
  portrait: "portrait",
};
