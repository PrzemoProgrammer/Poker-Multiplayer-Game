import * as PIXI from "pixi.js";
import AssetsManager from "../utility/AssetsManager";
import DefaultSpriteConfig from "../interfaces/DefaultSpriteConfig";

export default class Sprite extends PIXI.Sprite {
    constructor(config: DefaultSpriteConfig) {
        const { key, x, y, anchorX, anchorY, visible, scaleX, scaleY, angle} = config;
        const spritePath = AssetsManager.getImage(key);

        if (spritePath) {
            super(PIXI.Texture.from(spritePath));
            this.anchor.set(anchorX, anchorY);
            this.position.set(x, y);
            this.scale.x = scaleX; 
            this.scale.y = scaleY;
            this.angle = angle
            this.visible = visible;
        } else {
            console.error(`Image with key "${key}" not found.`);
            super(PIXI.Texture.EMPTY);
        }
    }

    changeTexture(newTexture: string) {
        const updatedTexture = AssetsManager.getImage(newTexture)
        if (updatedTexture) {
            const texture = PIXI.Texture.from(updatedTexture);
            this.texture = texture;
        } else {
            console.error(`Image with key "${newTexture}" not found.`);
        }
    }
}
