import ImageStorage from "../storage/ImageStorage";

export default class ImageManager {

   public static addImage(key:string, source: string) {
    ImageStorage.addImage(key, source);
  }

  public static getImage(key: string): string | undefined {
   return ImageStorage.getImage(key);
  }

}