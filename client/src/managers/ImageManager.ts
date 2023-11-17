import ImageStorage from "../storage/ImageStorage";

class ImageManager {

   public static addImage(key:string, source: string) {
    ImageStorage.addImage(key, source);
  }

  public static getImage(key: string): string | undefined {
   return ImageStorage.getImage(key);
  }

}

export default ImageManager