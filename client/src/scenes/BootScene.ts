import * as PIXI from "pixi.js";
import sceneManager from "../utility/managers/SceneManager";
import AssetsManager from "../utility/managers/AssetsManager";
import LoadingScreen from "../components/LoadingScreen";
import BaseScene from "../abstraction/BaseScene";

class BootScene extends BaseScene {
    constructor() {
      super("BootScene");

    }

    async init(){
      await this.preload()
      this.startLoadingScreen()
      this.startNextScene()
    }
  
    preload() {
      const images = [
        "loading_text",
        "loading_woman",
        "loading_elements",
        "loading_background",
      ];

      let totalImages = images.length;

      for (let i = 0; i < totalImages; i++) {
        let sprite = images[i];
        let source = `assets/loadScreen/${sprite}.png`
  
        AssetsManager.addImage(sprite, source);
    }
  }
  
    startNextScene() {
      sceneManager.startScene("PreloadScene");
    }

    startLoadingScreen(){
      const loadingScreen = new LoadingScreen(this)
    }
  }

  export default new BootScene()