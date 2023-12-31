import * as PIXI from "pixi.js";
import CreateSprite from "../components/sprite/Sprite";
import ISpriteConfig from "../components/sprite/interface/ISpriteConfig";
import IDefaultSpriteConfig from "../components/sprite/interface/IDefaultSpriteConfig";

class CreateComponents{

public create(config: ISpriteConfig): CreateSprite| null {
    const defaultConfig = this.setDefaultConfig(config);
    const sprite = this.createSpriteByType(defaultConfig);
    return sprite;
}

private setDefaultConfig(config: ISpriteConfig): IDefaultSpriteConfig {
    const defaultConfig: IDefaultSpriteConfig = {
        x: 0,
        y: 0,
        anchorX: 0.5,
        anchorY: 0.5,
        scaleX: 1, 
        scaleY: 1,
        angle: 0,
        visible: true,
        ...config,
    };
    return defaultConfig;
}

private createSpriteByType(defaultConfig: IDefaultSpriteConfig): CreateSprite | null {
    const { type } = defaultConfig;
    let sprite: CreateSprite | null = null;

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

public createSprite(config: IDefaultSpriteConfig): CreateSprite {
    return new CreateSprite(config);
}

  }

  export default new CreateComponents()

