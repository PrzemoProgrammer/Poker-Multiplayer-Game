import * as PIXI from "pixi.js";
import sceneManager from "../managers/SceneManager";
import AssetsManager from "../managers/AssetsManager";
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
     AssetsManager.addAudio(key, source);
   }

   private loadImage({path, key}: {path: string, key: string}) {
    const {_path, extension} = assetsConfig.images
     let source = _path + path + "/" + key + extension
     AssetsManager.addImage(key, source);
   }

  private handleStartNextScene(){
    // Cookies.remove('authToken');
    // Cookies.get("authToken") ?  sceneManager.startScene("PlayScene") :  sceneManager.startScene("LoginScene"),
    sceneManager.startScene("LoginScene")
    sceneManager.removeScene("BootScene")
}
}

export default new PreloadScene()






















// import * as PIXI from "pixi.js";
// import sceneManager from "../managers/SceneManager";
// import AssetsManager from "../managers/AssetsManager";
// import Cookies from "js-cookie";
// import BaseScene from "../abstraction/BaseScene";

// class PreloadScene extends BaseScene {
//   constructor() {
//     super("PreloadScene");

//   }

//   async init(): Promise<void> {
//     await this.loadImages();
//     await this.loadInterfaceImages()
//     await this.loadCardImages()
//     await this.loadBetImages()
//     await this.loadTimerImages()
//     await this.loadSignImages()
//     await this.loadAudio()
//     await this.loadLoginScreenImages()
//     this.handleStartNextScene();
//   }

//   async loadImages(): Promise<void> {
//     const images = [
//       "background",
//       "table",
//       "croupier",
//       "default_avatar",
//       "betting_background",
//       "betting_hide_button",
//       "betting_show_button",
//       "betting_text_field",
//       "batting_arrow"
//     ];

//     let totalImages = images.length;

//     for (let i = 0; i < totalImages; i++) {
//       let image = images[i];
//       let source = `assets/images/${image}.png`

//       AssetsManager.addImage(image, source);
//     }
//   }



//   async loadInterfaceImages(): Promise<void> {
//     const images = [
//       "bottom_bar",
//       "call_button",
//       "call_button_push",
//       "check_button",
//       "check_button_push",
//       "check_fold_button",
//       "check_fold_button_push",
//       "fold_button",
//       "fold_button_push",
//       "raise_button",
//       "raise_button_push",
//       "bet_button",
//       "bet_button_push"
//     ];

//     let totalImages = images.length;

//     for (let i = 0; i < totalImages; i++) {
//       let sprite = images[i];
//       let source = `assets/images/interface/buttons/${sprite}.png`

//       AssetsManager.addImage(sprite, source);
//     }
//   }

//   async loadCardImages(): Promise<void> {
//     const cardNumber: string[]  = ["2", "3", "4", "5", "6", "7", "8", "9", "10","J", "Q", "K", "A"]
//     const cardColor: string [] = ['d', 'c', 'h', 's'];
//     const backCard: string = "card_hidden"

//     for(let i = 0; i < cardColor.length; i++) {
//       const color = cardColor[i]
//       for (let j = 0; j < cardNumber.length; j++) {
//         const cardName = color + cardNumber[j]
//         let source = `assets/images/cards/${cardName}.png`
//         AssetsManager.addImage(cardName, source);
//       }
//     }

//     const source = `assets/images/cards/${backCard}.png`
//     AssetsManager.addImage(backCard, source);
//   }


//   async loadBetImages(): Promise<void> {
//     const images = [
//       "bet",
//       "bet_background"
//     ];

//     let totalImages = images.length;

//     for (let i = 0; i < totalImages; i++) {
//       let sprite = images[i];
//       let source = `assets/images/chips/${sprite}.png`

//       AssetsManager.addImage(sprite, source);
//     }
//   }

//   async loadTimerImages(): Promise<void> {
//     const images = [
//       "timer_bar_background",
//       "timer_bar_container",
//       "timer_bar"
//     ];

//     let totalImages = images.length;

//     for (let i = 0; i < totalImages; i++) {
//       let sprite = images[i];
//       let source = `assets/images/interface/timer/${sprite}.png`

//       AssetsManager.addImage(sprite, source);
//     }
//   }


//   async loadSignImages(): Promise<void> {
//     const images = [
//       "check_sign",
//       "dealer_sign",
//     ];

//     let totalImages = images.length;

//     for (let i = 0; i < totalImages; i++) {
//       let sprite = images[i];
//       let source = `assets/images/interface/signs/${sprite}.png`

//       AssetsManager.addImage(sprite, source);
//     }
//   }

//   async loadLoginScreenImages(): Promise<void> {
//     const images = [
//       "login_screen_background",
//     ];

//     let totalImages = images.length;

//     for (let i = 0; i < totalImages; i++) {
//       let sprite = images[i];
//       let source = `assets/images/loginScreen/${sprite}.png`

//       AssetsManager.addImage(sprite, source);
//     }
//   }

//   async loadAudio() {
//     const audios = ["deal_card", "player_leave", "player_turn_end", "player_win" ,"turn_card", "slide_card", "swipe_button", "player_turn_start" ];
//     let totalAudios = audios.length;

//     for (let i = 0; i < totalAudios; i++) {
//       let audio = audios[i];
//       let source = `assets/audio/${audio}.mp3`;

//       AssetsManager.addAudio(audio, source);
//     }
//   }

//   handleStartNextScene(){
//     // Cookies.remove('authToken');
//     // Cookies.get("authToken") ?  sceneManager.startScene("PlayScene") :  sceneManager.startScene("LoginScene"),
//     sceneManager.startScene("LoginScene")
//     sceneManager.removeScene("BootScene")
// }
// }

// export default new PreloadScene()