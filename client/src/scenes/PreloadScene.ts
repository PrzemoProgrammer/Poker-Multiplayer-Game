import * as PIXI from "pixi.js";
import sceneManager from "../utility/SceneManager";
import AssetsManager from "../utility/AssetsManager";
import Cookies from "js-cookie";

export default class PreloadScene extends PIXI.Container {
  constructor() {
    super();

    this.create();
  }

  async create(): Promise<void> {
    await this.loadImages();
    this.handleStartNextScene();
  }

  async loadImages(): Promise<void> {
    const images = [
      "background",
      "table",
      "croupier",
    ];

    let totalImages = images.length;

    for (let i = 0; i < totalImages; i++) {
      let sprite = images[i];
      let source = `assets/${sprite}.png`

      AssetsManager.addImage(sprite, source);
    }
  }


  handleStartNextScene(){
    Cookies.get("authToken") ?  sceneManager.startScene("BootstrapScene") :  sceneManager.startScene("LoginScene"),
    sceneManager.removeScene("BootScene")
}
}