import * as PIXI from "pixi.js";
import { Sprite, Container } from "pixi.js";
import BaseScene from "../abstraction/BaseScene";
import CreateComponent from "./CreateComponent";
import CreateText from "./CreateText";
import Button from "./Button";
import uiInterfaceConfig from "../config/uiInterfaceConfig";
import UiInterfaceConfig from "../interfaces/UiInterfaceConfig";

class UiInterface extends Container {
  scene: BaseScene | null;
  bottomBar: Sprite | null;
  moneyText: CreateText | null;
  betsText: CreateText | null;
  foldButton: Button | null;
  checkFoldButton: Button | null;
  checkButton: Button | null;
  callButton: Button | null;
  raiseButton: Button | null;
  config: UiInterfaceConfig;

  constructor() {
    super();
    this.config = uiInterfaceConfig;
    this.scene = null;
    this.bottomBar = null;
    this.moneyText = null;
    this.betsText = null;
    this.foldButton = null;
    this.checkFoldButton = null;
    this.checkButton = null;
    this.callButton = null;
    this.raiseButton = null;
  }

  public create(scene: BaseScene) {
    this.scene = scene;
    this.bottomBar = this.createBottomBar();
    this.moneyText = this.createMoneyText();
    this.betsText = this.createBetsText();
    this.foldButton = this.createFoldButton();
    this.checkFoldButton = this.createCheckFoldButton();
    this.checkButton = this.createCheckButton();
    this.callButton = this.createCallButton();
    this.raiseButton = this.createRaiseButton();
  }

  public createBottomBar(): Sprite | null {
    const spriteConfig = this.config.bottomBar;
    if (this.scene && spriteConfig) {
      const sprite = CreateComponent.create(spriteConfig);
      if (sprite) this.scene.addChild(sprite);
      return sprite;
    }
    return null;
  }

  public createMoneyText(): CreateText | null {
    const textConfig = this.config.moneyText;
    if (this.scene && textConfig) {
      const moneyText = new CreateText(textConfig);
      this.scene.addChild(moneyText);
      return moneyText;
    }
    return null;
  }

  public createBetsText(): CreateText | null {
    const textConfig = this.config.betsText;
    if (this.scene && textConfig) {
      const betText = new CreateText(textConfig);
      this.scene.addChild(betText);
      return betText;
    }
    return null;
  }

  public createFoldButton(): Button | null {
    const config = this.config.foldButton;
    if (this.scene && config) {
      const button = new Button(this.scene, config);
      button.onClick(() => {
        console.log("clicked");
      });
      return button;
    }
    return null;
  }

  public createCheckFoldButton(): Button | null {
    const config = this.config.checkFoldButton;
    if (this.scene && config) {
      const button = new Button(this.scene, config);
      button.onClick(() => {
        console.log("clicked");
      });
      return button;
    }
    return null;
  }

  public createCheckButton(): Button | null {
    const config = this.config.checkButton;
    if (this.scene && config) {
      const button = new Button(this.scene, config);
      button.onClick(() => {
        console.log("clicked");
      });
      return button;
    }
    return null;
  }

  public createCallButton(): Button | null {
    const config = this.config.callButton;
    if (this.scene && config) {
      const button = new Button(this.scene, config);
      button.onClick(() => {
        console.log("clicked");
      });
      return button;
    }
    return null;
  }

  public createRaiseButton(): Button | null {
    const config = this.config.raiseButton;
    if (this.scene && config) {
      const button = new Button(this.scene, config);
      button.onClick(() => {
        console.log("clicked");
      });
      return button;
    }
    return null;
  }
}

export default new UiInterface();
