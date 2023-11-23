import PreloadScene from "./scenes/PreloadScene";
import BootScene from "./scenes/BootScene";
import PlayScene from "./scenes/PlayScene";
import LoginScene from "./scenes/LoginScene";
import RegisterScene from "./scenes/RegisterScene";
import SetupGameScene from "./scenes/SetupGameScene";
import ScreenUtils from "./utility/screen/ScreenUtils";
import sceneManager from "./managers/SceneManager";
import GameStorage from "./storage/GameStorage";
import "./style.css";

const game = GameStorage.getGame()
document.body.appendChild(game.view);
ScreenUtils.resizeScreen(game)
window.addEventListener("resize", () => ScreenUtils.resizeScreen(game));
sceneManager.addScene([BootScene, PreloadScene, LoginScene, RegisterScene, PlayScene, SetupGameScene]);
sceneManager.autoStartFirstScene()
//@ts-ignorets
globalThis.__PIXI_APP__ = game;