import * as PIXI from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from "../config/gameConfig";
import AssetsManager from "../utility/managers/AssetsManager";

 export default class LoadingScreen{
    scene: PIXI.Container
    woman: PIXI.Container | undefined
    background: PIXI.Sprite | undefined
    text: PIXI.Sprite | undefined

    constructor(scene: PIXI.Container) {
 
    // this.totalAssets = null;
    // this.loadedAssets = null;
    this.scene = scene
    this.background = this.createBackground();
    this.woman = this.createWoman()
    this.text = this.createLoadingText()
    // this.createProgressBar();
  }

  createBackground() {
    const spritePath = AssetsManager.getImage("loading_background");
    if(!spritePath) return
    let bg =  PIXI.Sprite.from(spritePath);
    bg.anchor.set(0.5, 0.5);
    bg.position.set(GAME_WIDTH / 2, GAME_HEIGHT / 2)
    this.scene.addChild(bg);

    return bg;
  }


    createWoman(){
        const spritePath = AssetsManager.getImage("loading_woman");
        if(!spritePath) return
        let woman =  PIXI.Sprite.from(spritePath);
        woman.anchor.set(0.5, 1);
        woman.position.set(GAME_WIDTH / 2, GAME_HEIGHT)
        this.scene.addChild(woman);
    
        return woman;
    }

    createLoadingText(){
        const spritePath = AssetsManager.getImage("loading_text");
        if(!spritePath) return
        let text =  PIXI.Sprite.from(spritePath);
        text.anchor.set(0.5, 0.5);
        text.position.set(GAME_WIDTH / 2, GAME_HEIGHT/2 - 300)
        this.scene.addChild(text);
    
        return text;
    }

//   createProgressBar() {
//     this.progressText = new PIXI.Text("Loading...", {
//       fill: 0xffffff,
//       fontSize: 24,
//       fontWeight: "bold",
//     });
//     this.progressText.anchor.set(0.5);
//     this.progressText.position.set(GAME_HEIGHT / 2, GAME_HEIGHT / 2);
//     this.scene.addChild(this.progressText);

//     this.progressBar = new PIXI.Graphics()
//       .lineStyle(2, 0xffffff)
//       .drawRect(0, 0, 200, 20);
//     this.progressBar.position.set(GAME_HEIGHT / 2 - 100, GAME_HEIGHT / 2 + 30);
//     this.scene.addChild(this.progressBar);
//   }

//   updateProgressBar() {
//     this.loadedAssets += 1;
//     let progress = this.loadedAssets / this.totalAssets;

//     this.progressBar.clear();
//     this.progressBar.beginFill(0xffffff);
//     this.progressBar.drawRect(0, 0, progress * 200, 20);
//     this.progressBar.endFill();
//   }

//   addAssetsCount(value) {
//     this.totalAssets = value;
//   }
}
// const loadingScreen = new LoadingScreen();
// export default loadingScreen