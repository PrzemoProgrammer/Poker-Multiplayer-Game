import { Howl } from "howler";
import AudioStorage from "../storage/AudioStorage";

export default class AudioManager {
  ///
  static addAudio(key, source) {
    return new Promise((resolve) => {
      const sound = new Howl({
        src: [source],
        html5: false,
        onload: () => resolve(1),
      });
      AudioStorage.addAudio(key, sound);
    });
  }

  static getAudio(key) {
    return AudioStorage.getAudio(key);
  }

  static playAudio(key) {
    const audio = this.getAudio(key);
    audio.play();
  }

  static stopAudio(key) {
    const audio = this.getAudio(key);
    audio.fade(1, 0, 1000);
    setTimeout(() => {
      audio.stop();
      audio.fade(0, 1, 0);
    }, 1000);
  }

  static offAudio(key) {
    const audio = this.getAudio(key);
    audio.fade(1, 0, 1000);
  }

  static onAudio(key) {
    const audio = this.getAudio(key);
    audio.fade(0, 1, 1000);
  }
}
