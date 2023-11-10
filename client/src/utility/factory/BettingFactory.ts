import { Sprite, Container, InteractionEvent} from "pixi.js";
import CreateComponent from "../../components/CreateComponent";
import Button from "../../components/Button";
import DragObject from "../../components/DragObject";
import CreateText from "../../components/CreateText";
import {FACTORY_CONFIG} from "../../config/bettingConfig";
import BettingConfig from "../../interfaces/BettingConfig";

export default class BettingFactory extends Container {
  isOpen: boolean
background: Sprite | null
toggleButton: Button | null;
betText: CreateText | null;
textField: Sprite | null
arrow: DragObject | null
config: BettingConfig;

  constructor() {
    super();
    this.config = FACTORY_CONFIG;
    this.x = this.config.x
    this.y = this.config.y
    this.toggleButton = this.createButton()
    this.background = this.createBackground()
    this.textField = this.createTextFieldBackground()
    this.arrow = this.createArrow()
    this.betText = this.createText();
    this.isOpen = true
  }

  private createBackground(): Sprite | null {
    const spriteConfig = this.config.background;
      const sprite = CreateComponent.createSprite(spriteConfig);
      if (sprite) this.addChild(sprite);
      return sprite;
  }

  private createTextFieldBackground(): Sprite | null {
    const spriteConfig = this.config.textFieldBackground;
      const sprite = CreateComponent.createSprite(spriteConfig);
      if (sprite) this.addChild(sprite);
      return sprite;
  }

  private createButton(): Button | null {
    const config = this.config.button;
      const button = new Button(config);
      this.addChild(button);
      return button;
  }

  private createText(): CreateText | null {
    const config = this.config.betText;
      const text = new CreateText(config);
      this.addChild(text);
      return text;
  }

  private createArrow(): DragObject | null {
    const spriteConfig = this.config.arrow;
      const sprite = new DragObject(spriteConfig);
      if (sprite) this.addChild(sprite);
      return sprite;
  }
}

