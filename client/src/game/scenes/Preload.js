import { Assets } from "pixi.js";
import SceneManager from "../../managers/SceneManager";
import AudioManager from "../../managers/AudioManager";
import ImageManager from "../../managers/ImageManager";
import GameManager from "../manager/GameManager";
import BaseScene from "../abstraction/BaseScene";
import loadAudioData from "../../../public/assets/audio/loadAudioData.json";
import loadImagesIndex from "../../../public/assets/images/loadImagesIndex";
import cardsLoadConfig from "../../../public/assets/images/game/cards/cardsLoadConfig.json";
import { ASSETS_CONFIG } from "../../config/assetsConfig";

class Preload extends BaseScene {
  constructor() {
    super("Preload");
  }

  async init() {
    await this.loadAllAudio();
    await this.loadImages();
    await this.loadAllImages();
    await this.loadCardImages();
    GameManager.afterLoadGameCallback();
    // this.handleStartNextScene();
  }

  async loadImages() {
    const images = [
      "room_icon",
      "game_background",
      "player_background_light",
      "background_first_layer",
      "player_chips_icon",
      "background_second_layer",
      "avatar_mask",
      "card_slot",
      //   "loading_gif",
      //   "back_button",
      //   "back_button_push",
    ];
    let totalImages = images.length;
    for (let i = 0; i < totalImages; i++) {
      let image = images[i];
      let source = await Assets.load(`assets/images/${image}.png`);
      ImageManager.addImage(image, source);
    }
  }

  loadAllImages() {
    loadImagesIndex.forEach((imagesData) => {
      Object.entries(imagesData).forEach(([loadImageData, imageData]) => {
        this.loadImage(imageData);
      });
    });
  }

  async loadCardImages() {
    const { path, number, color } = cardsLoadConfig.cards;
    const hiddenCard = cardsLoadConfig.hiddenCard.key;
    const cardNumber = number;
    const cardColor = color;

    for (let i = 0; i < cardColor.length; i++) {
      const color = cardColor[i];
      for (let j = 0; j < cardNumber.length; j++) {
        const cardName = color + cardNumber[j];
        const key = cardName;
        await this.loadImage({ path, key });
      }
    }
    const key = hiddenCard;
    await this.loadImage({ path, key });
  }

  async loadImage({ path, key }) {
    const { _path, extension } = ASSETS_CONFIG.images;
    let sourcePath = _path + path + "/" + key + extension;
    let source = await Assets.load(sourcePath);
    ImageManager.addImage(key, source);
  }

  async loadAllAudio() {
    await Object.entries(loadAudioData).forEach(async ([_key, audioData]) => {
      await this.loadAudio(audioData);
    });
  }

  async loadAudio({ path, key }) {
    const { _path, extension } = ASSETS_CONFIG.audio;
    let source = _path + path + "/" + key + extension;
    await AudioManager.addAudio(key, source);
  }

  handleStartNextScene() {
    // SceneManager.startScene("Room");
  }
}

export default new Preload();
