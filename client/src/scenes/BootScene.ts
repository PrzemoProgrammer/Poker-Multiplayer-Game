import * as PIXI from "pixi.js";
import sceneManager from "../managers/SceneManager";
import ImageManager from "../managers/ImageManager";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";
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
        let source = `assets/images/loadScreen/${sprite}.png`
  
        ImageManager.addImage(sprite, source);
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