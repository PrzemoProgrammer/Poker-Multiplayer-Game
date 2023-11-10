import { Howl} from "howler";

class AudioStorage {
    audio: Map<string, Howl>;
  
    constructor() {
      this.audio = new Map();
    }

    public addAudio(key:string, source: Howl) {
      this.audio.set(key, source);
    }
  
    public getAudio(key: string): Howl | undefined {
      return this.audio.get(key);
    }
  }
  
  export default new AudioStorage();