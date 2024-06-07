import * as PIXI from "pixi.js";
import ImageManager from "../../managers/ImageManager";

export default class Sprite extends PIXI.Sprite {
  constructor(config) {
    const {
      textureKey,
      x = 0,
      y = 0,
      anchorX = 0.5,
      anchorY = 0.5,
      visible = true,
      scaleX = 1,
      scaleY = 1,
      angle = 0,
      tint = 0xffffff,
      isStatic = true,
      interactive = false,
      eventMode = "none",
    } = config;
    const spriteTexture = ImageManager.getImage(textureKey);
    // spriteTexture.mipmap = true
    super(spriteTexture);
    this.anchor.set(anchorX, anchorY);
    this.position.set(x, y);
    this.scale.x = scaleX;
    this.scale.y = scaleY;
    this.angle = angle;
    this.tint = tint;
    this.visible = visible;
    this.filters = null;
    this.eventMode = eventMode;
    this.interactiveChildren = interactive;
    this.cacheAsBitmap = isStatic;
  }

  changeTexture(newTexture) {
    const updatedTexture = ImageManager.getImage(newTexture);
    if (updatedTexture) {
      // const texture = PIXI.Texture.from(updatedTexture);
      this.texture = updatedTexture;
    } else {
      console.error(`Image with key "${newTexture}" not found.`);
    }
  }

  changeTextureURL(imageUrl) {
    const newTexture = PIXI.Texture.from(imageUrl);
    this.texture = newTexture;
    this.width = 39;
    this.height = 39;
  }

  setVisible(value) {
    this.visible = value;
  }
}
