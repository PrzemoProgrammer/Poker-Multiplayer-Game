  class ImageStorage {
    images: Map<string, string>;
  
    constructor() {
      this.images = new Map();
    }

    public addImage(key:string, source: string) {
      this.images.set(key, source);
    }
  
    public getImage(key: string): string | undefined {
      return this.images.get(key);
    }
  }
  
  export default new ImageStorage();