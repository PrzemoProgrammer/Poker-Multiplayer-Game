const Colyseus = require("colyseus.js");

const client = new Colyseus.Client("ws://localhost:3000");

client.join("game").then((room) => {
  console.log("Connected to game room:", room.roomId);

  // Tutaj możesz zaimplementować logikę gry po stronie klienta
  // oraz nasłuchiwać na zmiany stanu gry
  room.state.players.onAdd = (player, sessionId) => {
    console.log(`Player ${sessionId} joined the game.`);
  };

  room.state.players.onRemove = (player, sessionId) => {
    console.log(`Player ${sessionId} left the game.`);
  };
});

//! /////////////////////////////////////////////////////////////////////////////////////////

import * as PIXI from "pixi.js";
import CreateSprite from "../components/CreateSprite";
import ISpriteConfig from "../interfaces/ISpriteConfig";
import IDefaultSpriteConfig from "../interfaces/IDefaultSpriteConfig";

class CreateComponents{
    constructor() {

    }

    public create(config: ISpriteConfig): PIXI.Sprite | null{
        const defaultConfig: IDefaultSpriteConfig = {
            x: 0,
            y: 0,
            anchorX: 0.5,
            anchorY: 0.5,
            visible: true,
            ...config 
        };
        const {type} = defaultConfig
        let sprite: PIXI.Sprite | null = null
    
        switch (type) {
            case "sprite":
                sprite = new CreateSprite(defaultConfig);
                break;
            case "spritesheet":
                // Create spritesheet
                break;
            case "spine":
                // Create spine
                break;
            default:
                break;
        }

        return sprite
    }
  }

  export default new CreateComponents()



//! /////////////////////////////////////////////////////////////////////////////////////////


  import { Howl, Howler } from "howler";

class AssetsManager {
  constructor() {
    this.images = {};
    this.animateFrames = {};
    this.spriteSheetJSON = {};
    this.audios = {};
    this.totalAssets = 0;
    this.assetsLoaded = 0;
    this.onProgress = null;
    this.onComplete = null;
  }

  addImage(key, source) {
    this.images[key] = new Image();
    this.images[key].onload = this.assetLoaded.bind(this);
    this.images[key].src = source;
    this.totalAssets++;
  }

  addAudio(key, source) {
    const sound = new Howl({
      src: [source],
      onload: this.assetLoaded.bind(this),
    });

    this.audios[key] = sound;
    this.totalAssets++;
  }

  addAnimateFrames(key, frames) {
    this.animateFrames[key] = frames;
    this.assetLoaded();
  }

  addSpriteSheetJSON(key, source) {
    // Assuming JSON is already loaded
    this.spriteSheetJSON[key] = source;
    this.assetLoaded();
  }

  assetLoaded() {
    this.assetsLoaded++;

    if (this.onProgress) {
      const progress = (this.assetsLoaded / this.totalAssets) * 100;
      this.onProgress(progress);
    }

    if (this.assetsLoaded === this.totalAssets && this.onComplete) {
      this.onComplete();
    }
  }

  setProgressCallback(callback) {
    this.onProgress = callback;
  }

  setCompleteCallback(callback) {
    this.onComplete = callback;
  }

  load() {
    // You can call this method to start loading assets
  }
}

let assetsManager = new AssetsManager();

export default assetsManager;

//! /////////////////////////////////////
assetsManager.addImage("image1", "path/to/image1.png");
assetsManager.addAudio("audio1", "path/to/audio1.mp3");

assetsManager.setProgressCallback((progress) => {
  console.log(`Loading: ${progress.toFixed(2)}%`);
});

assetsManager.setCompleteCallback(() => {
  console.log("All assets loaded!");
  // Tutaj można uruchomić grę lub wykonać inne działania po zakończeniu ładowania.
});

assetsManager.load(); // Rozpoczyna ładowanie wszystkich zasobów.


//! //////////////////////////////////
Albo w preload Scenie podaj maxymalną ilość assetó AssetsManager jako ilość tych obrazków i dzweięków w sensie ak jest pętla for to te i<10 to te 10.


