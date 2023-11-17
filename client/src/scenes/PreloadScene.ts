import * as PIXI from "pixi.js";
import sceneManager from "../managers/SceneManager";
import AudioManager from "../managers/AudioManager";
import ImageManager from "../managers/ImageManager";
import Cookies from "js-cookie";
import BaseScene from "../abstraction/BaseScene";
import loadImagesIndex from "../../assets/images/loadImagesIndex";
import cardsLoadConfig from "../../assets/images/game/cards/cardsLoadConfig.json";
import loadAudioData from "../../assets/audio/loadAudioData.json";
import assetsConfig from "../config/assetsConfig";

class PreloadScene extends BaseScene {
  constructor() {
    super("PreloadScene");

  }

  async init(): Promise<void> {
    await this.loadAllImages()
    await this.loadCardImages()
    await this.loadAllAudio()
    this.handleStartNextScene();
  }

  private loadAllImages() {
    loadImagesIndex.forEach((imagesData) => {
      Object.entries(imagesData).forEach(([loadImageData, imageData]) => {
        this.loadImage(imageData);
      });
    });
  }

  private async loadCardImages(): Promise<void> {
    const {path, number, color} = cardsLoadConfig.cards
    const hiddenCard = cardsLoadConfig.hiddenCard.key
    const cardNumber: string[]  = number
    const cardColor: string [] = color

    for(let i = 0; i < cardColor.length; i++) {
      const color = cardColor[i]
      for (let j = 0; j < cardNumber.length; j++) {
        const cardName = color + cardNumber[j]
        const key = cardName
        this.loadImage({path, key})
      }
    }
    const key = hiddenCard
    this.loadImage({path, key})
  }

  private async loadAllAudio() {
    Object.entries(loadAudioData).forEach(([loadAudioData, audioData]) => {
      this.loadAudio(audioData);
    });
  }

  private loadAudio({path, key}: {path: string, key: string}) {
    const {_path, extension} = assetsConfig.audio
     let source = _path + path + "/" + key + extension
     AudioManager.addAudio(key, source);
   }

   private loadImage({path, key}: {path: string, key: string}) {
    const {_path, extension} = assetsConfig.images
     let source = _path + path + "/" + key + extension
     ImageManager.addImage(key, source);
   }

  private handleStartNextScene(){
    // Cookies.remove('authToken');
    // Cookies.get("authToken") ?  sceneManager.startScene("PlayScene") :  sceneManager.startScene("LoginScene"),
    sceneManager.startScene("LoginScene")
    sceneManager.removeScene("BootScene")
}
}

export default new PreloadScene()
