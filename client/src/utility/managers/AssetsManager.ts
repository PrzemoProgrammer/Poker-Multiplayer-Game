// import { Howl, Howler } from "howler";
import * as PIXI from "pixi.js";
import ImageStorage from "../storage/ImageStorage";

class AssetsManager {
// loadingProgress: number;
// loadedImages: number;
// totalImages: number;
// animateFrames: object
// spriteSheetJSON: object
// audios: object

  constructor() {
    // this.images = {};
    // this.loadingProgress = 0;
    // this.loadedImages = 0;
    // this.totalImages = 0;
    // this.animateFrames = {};
    // this.spriteSheetJSON = {};
    // this.audios = {};
  }

  public addImage(key:string, source: string) {
    ImageStorage.addImage(key, source);
  }

  public getImage(key: string): string | undefined {
   return ImageStorage.getImage(key);
  }

  // public async loadAssets(): Promise<void> {
  //   return new Promise((resolve, reject) => {
  //     for (const key in this.images) {
  //       const image = new Image();
  //       image.src = this.images[key];

  //       image.onload = () => {
  //         this.loadedImages++;
  //         this.loadingProgress = (this.loadedImages / this.totalImages) * 100;

  //         if (this.loadedImages === this.totalImages) {
  //           resolve();
  //         }
  //       };

  //       image.onerror = () => {
  //         reject(`Nie udało się załadować obrazu: ${this.images[key]}`);
  //       };
  //     }
  //   });
  // }

  // public getLoadingProgress(): number {
  //   return this.loadingProgress;
  // }

//   addAudio(key, source) {
//     const sound = new Howl({
//       src: [source],
//     });

//     this.audios[key] = sound;
//   }

//   getSound(key) {
//     return this.audios[key];
//   }

//   addAnimateFrames(key, frames) {
//     this.animateFrames[key] = frames;
//   }

//   getAnimFrames(key) {
//     return this.animateFrames[key];
//   }

//   addSpriteSheetJSON(key, source) {
//     this.spriteSheetJSON[key] = source;
//   }

//   getSpriteSheetJSON(key) {
//     return this.spriteSheetJSON[key];
//   }
}

let assetsManager = new AssetsManager();

export default assetsManager;
