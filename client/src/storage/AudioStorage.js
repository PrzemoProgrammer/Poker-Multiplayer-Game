export default class AudioStorage {
  static audio = new Map();

  static addAudio(key, source) {
    this.audio.set(key, source);
  }

  static getAudio(key) {
    return this.audio.get(key);
  }
}
