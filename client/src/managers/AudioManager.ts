import { Howl} from "howler";
import AudioStorage from "../storage/AudioStorage";

class AudioManager {
    
  public static addAudio(key:string, source: string) {
    const sound = new Howl({
      src: [source],
    })
    AudioStorage.addAudio(key, sound);
  }

  public static getAudio(key: string): Howl | undefined {
   return AudioStorage.getAudio(key);
  }

  public static playAudio(key: string) {
    const audio = this.getAudio(key);
    audio?.play()
   }
}

export default AudioManager