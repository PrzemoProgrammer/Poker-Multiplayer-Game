export default class ImageStorage {
  private static images: Map<string, string> = new Map();

  public static addImage(key: string, source: string) {
    this.images.set(key, source);
  }

  public static getImage(key: string): string | undefined {
    return this.images.get(key);
  }
}