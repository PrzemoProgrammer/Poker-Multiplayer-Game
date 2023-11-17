import * as PIXI from "pixi.js";
import { Sprite, Container, Graphics  } from "pixi.js";
import CreateComponent from "../../actions/CreateComponent";
import IProgressBarConfig from "./interface/IProgressBarConfig";

export default class ProgressBar extends Container {
  background:  Sprite | null
  container: Sprite | null
  bar: Sprite | null
  config: IProgressBarConfig
  barMask: Graphics | null
  maskWidth: number

  constructor(config: IProgressBarConfig) {
    super();
    this.config = config;
    this.x = this.config.x
    this.y = this.config.y
    this.maskWidth = this.config.mask.width
    this.background = this.createBackground()
    this.bar = this.createBar()
    this.barMask = this.createBarMask(this.maskWidth)
    this.container = this.createContainer()
    this.bar!.mask = this.barMask
  }

  private createBackground(): Sprite | null {
    const spriteConfig = this.config.background;
      const sprite = CreateComponent.create(spriteConfig);
      if (sprite) this.addChild(sprite);
      return sprite;
  }


  private createContainer(): Sprite | null {
    const spriteConfig = this.config.container;
      const sprite = CreateComponent.create(spriteConfig);
      if (sprite) this.addChild(sprite);
      return sprite;
  }


  private createBar(): Sprite | null {
    const spriteConfig = this.config.bar;
      const sprite = CreateComponent.create(spriteConfig);
      if (sprite) this.addChild(sprite);
      return sprite;
  }

  private createBarMask(width: number): Graphics | null {
    const {x, y, height} = this.config.mask
    const mask = new Graphics();
    mask.beginFill(0xFF0000); 
    mask.drawRect(x, y , width, height); 
    mask.endFill();
    this.addChild(mask);
    
    return mask;
  }

 public updateBar(maskWidth: number) {
  this.barMask!.clear();
  this.barMask = this.createBarMask(maskWidth)
  this.bar!.mask = this.barMask
  }

  public get getBarMaskWidth(): number{
    return this.barMask!.width
  }

  public resetMaskWidth(){
    this.updateBar(this.maskWidth)
  }
}

