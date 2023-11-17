import * as PIXI from "pixi.js";
import loadingScreenConfig from "../../config/loadingScreenConfig";
import ImageManager from "../../managers/ImageManager";
import ILoadingScreenConfig from "./interface/ILoadingScreenConfig";

export default class LoadingScreen {
    scene: PIXI.Container;
    woman: PIXI.Container | undefined;
    background: PIXI.Sprite | undefined;
    text: PIXI.Sprite | undefined;
    config: ILoadingScreenConfig
    constructor(scene: PIXI.Container) {
        // this.totalAssets = null;
        // this.loadedAssets = null;
        this.config = loadingScreenConfig;
        this.scene = scene;
        this.background = this.createBackground();
        this.woman = this.createWoman();
        this.text = this.createLoadingText();
        // this.createProgressBar();
    }

    private createBackground() {
      const {key, x, y, anchorX, anchorY} = this.config.background
        const spritePath = ImageManager.getImage(key);
        if (!spritePath) return;
        let bg = PIXI.Sprite.from(spritePath);
        bg.anchor.set(anchorX, anchorY);
        bg.position.set(x, y);
        this.scene.addChild(bg);

        return bg;
    }

    private createWoman() {
      const {key, x, y, anchorX, anchorY} = this.config.womanCharacter
        const spritePath = ImageManager.getImage(key);
        if (!spritePath) return;
        let woman = PIXI.Sprite.from(spritePath);
        woman.anchor.set(anchorX, anchorY);
        woman.position.set(x, y);
        this.scene.addChild(woman);

        return woman;
    }

    createLoadingText() {
      const {key, x, y, anchorX, anchorY} = this.config.loadingText
        const spritePath = ImageManager.getImage(key);
        if (!spritePath) return;
        let text = PIXI.Sprite.from(spritePath);
        text.anchor.set(anchorX, anchorY);
        text.position.set(x, y);
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
