// import { Application, Loader, Texture, AnimatedSprite, Container } from "pixi.js";
import PreloadScene from "./scenes/PreloadScene";
import BootScene from "./scenes/BootScene";
import PlayScene from "./scenes/PlayScene";
import LoginScene from "./scenes/LoginScene";
import SetupGameScene from "./scenes/SetupGameScene";
import { resizeScreen }  from "./screen/resizeScreen";
import sceneManager from "./utility/SceneManager";
import GameStorage from "./utility/GameStorage";
import "./style.css";

const game = GameStorage.getGame()

document.body.appendChild(game.view);
resizeScreen(game)
window.addEventListener("resize", () => resizeScreen(game));
sceneManager.addScene([BootScene, PreloadScene, LoginScene, PlayScene, SetupGameScene]);
sceneManager.autoStartFirstScene()
//@ts-ignorets
globalThis.__PIXI_APP__ = game;
// window.onload = async (): Promise<void> => {
//     await loadGameAssets();

//     document.body.appendChild(game.view);

//     // resizeCanvas();

//     const birdFromSprite = getBird();
//     birdFromSprite.anchor.set(0.5, 0.5);
//     birdFromSprite.position.set(GAME_WIDTH / 2, 530);

//     const spineExample = getSpine();
//     spineExample.position.y = 580;

//     game.stage.addChild(birdFromSprite);
//     game.stage.addChild(spineExample);
//     game.stage.interactive = true;
// };

// async function loadGameAssets(): Promise<void> {
//     return new Promise((res, rej) => {
//         const loader = Loader.shared;
//         loader.add("rabbit", "./assets/simpleSpriteSheet.json");
//         loader.add("pixie", "./assets/spine-assets/pixie.json");

//         loader.onComplete.once(() => {
//             res();
//         });

//         loader.onError.once(() => {
//             rej();
//         });

//         loader.load();
//     });
// }

// function resizeCanvas(): void {
//     const resize = () => {
//         game.renderer.resize(window.innerWidth, window.innerHeight);
//         game.stage.scale.x = window.innerWidth / GAME_WIDTH;
//         game.stage.scale.y = window.innerHeight / GAME_HEIGHT;
//     };

//     resize();

//     window.addEventListener("resize", resize);
// }

// function getBird(): AnimatedSprite {
//     const bird = new AnimatedSprite([
//         Texture.from("birdUp.png"),
//         Texture.from("birdMiddle.png"),
//         Texture.from("birdDown.png"),
//     ]);

//     bird.loop = true;
//     bird.animationSpeed = 0.1;
//     bird.play();
//     bird.scale.set(3);

//     return bird;
// }
