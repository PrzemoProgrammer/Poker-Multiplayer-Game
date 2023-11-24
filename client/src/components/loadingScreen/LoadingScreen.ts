import {Container} from "pixi.js";
import loadingScreenConfig from "../../config/loadingScreenConfig";
import ILoadingScreenConfig from "./interface/ILoadingScreenConfig";
import CreateComponent from "../../actions/CreateComponent";
import CreateSprite from "../../components/sprite/Sprite";

export default class LoadingScreen {
    scene: Container;
    woman: CreateSprite 
    background: CreateSprite
    text: CreateSprite;
    config: ILoadingScreenConfig
    constructor(scene: Container) {
        // this.totalAssets = null;
        // this.loadedAssets = null;
        this.config = loadingScreenConfig;
        this.scene = scene;
        this.background = this.createBackground();
        this.woman = this.createWoman();
        this.text = this.createLoadingText();
        // this.createProgressBar();
    }

    public createBackground(): CreateSprite{
      const spriteConfig = this.config.background;
        const sprite = CreateComponent.createSprite(spriteConfig);
        if (sprite) this.scene.addChild(sprite);
        return sprite;
    }

    public createWoman(): CreateSprite {
      const spriteConfig = this.config.womanCharacter;
        const sprite = CreateComponent.createSprite(spriteConfig);
        if (sprite) this.scene.addChild(sprite);
        return sprite;
    }

    public createLoadingText(): CreateSprite {
      const spriteConfig = this.config.loadingText;
        const sprite = CreateComponent.createSprite(spriteConfig);
        if (sprite) this.scene.addChild(sprite);
        return sprite;
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
