import * as PIXI from "pixi.js";
import CreateSprite from "../components/CreateSprite";
import SpriteConfig from "../interfaces/SpriteConfig";
import DefaultSpriteConfig from "../interfaces/DefaultSpriteConfig";

class CreateComponents{
    constructor() {

    }

public create(config: SpriteConfig): PIXI.Sprite | null {
    const defaultConfig = this.setDefaultConfig(config);
    const sprite = this.createSpriteByType(defaultConfig);
    return sprite;
}

private setDefaultConfig(config: SpriteConfig): DefaultSpriteConfig {
    const defaultConfig: DefaultSpriteConfig = {
        x: 0,
        y: 0,
        anchorX: 0.5,
        anchorY: 0.5,
        visible: true,
        ...config,
    };
    return defaultConfig;
}

private createSpriteByType(defaultConfig: DefaultSpriteConfig): PIXI.Sprite | null {
    const { type } = defaultConfig;
    let sprite: PIXI.Sprite | null = null;

    switch (type) {
        case "sprite":
            sprite = this.createSprite(defaultConfig);
            break;
        case "spritesheet":
            // Create spritesheet
            break;
        case "spine":
            // Create spine
            break;
        default:
            break;
    }

    return sprite;
}

private createSprite(config: DefaultSpriteConfig): PIXI.Sprite {
    return new CreateSprite(config);
}

  }

  export default new CreateComponents()

