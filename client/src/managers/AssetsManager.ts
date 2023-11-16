import { Howl} from "howler";
import ImageStorage from "../storage/ImageStorage";
import AudioStorage from "../storage/AudioStorage";

class AssetsManager {
  constructor() {
  }

  public addImage(key:string, source: string) {
    ImageStorage.addImage(key, source);
  }

  public getImage(key: string): string | undefined {
   return ImageStorage.getImage(key);
  }

  public addAudio(key:string, source: string) {
    const sound = new Howl({
      src: [source],
    })
    AudioStorage.addAudio(key, sound);
  }

  public getAudio(key: string): Howl | undefined {
   return AudioStorage.getAudio(key);
  }

  public playAudio(key: string) {
    const audio = this.getAudio(key);
    audio?.play()
   }
}

let assetsManager = new AssetsManager();

export default assetsManager;
