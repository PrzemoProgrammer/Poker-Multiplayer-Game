import { Sprite, Container } from "pixi.js";
import CreateComponent from "../../../actions/CreateComponent";
import CreateText from "../../../components/text/Text";
import Button from "../../../components/button/Button";
import {POKER_BAR_CONFIG} from "../config/pokerBarConfig";
import IPokerBarConfig from "../interface/IPokerBarConfig";

export default class PokerBarFactory extends Container {
  bottomBar: Sprite | null;
  moneyText: CreateText | null;
  betsText: CreateText | null;
  foldButton: Button | null;
  betButton: Button | null;
  checkButton: Button | null;
  callButton: Button | null;
  raiseButton: Button | null;
  config: IPokerBarConfig;

  constructor() {
    super();
    this.config = POKER_BAR_CONFIG;
    this.bottomBar = this.createBottomBar();
    this.moneyText = this.createMoneyText();
    this.betsText = this.createBetsText();
    this.foldButton = this.createFoldButton();
    this.betButton = this.createBetButton();
    this.checkButton = this.createCheckButton();
    this.callButton = this.createCallButton();
    this.raiseButton = this.createRaiseButton();
  }

  public createBottomBar(): Sprite | null {
    const spriteConfig = this.config.bottomBar;
      const sprite = CreateComponent.create(spriteConfig);
      if (sprite) this.addChild(sprite);
      return sprite;
  }

  public createMoneyText(): CreateText | null {
    const textConfig = this.config.moneyText;
      const moneyText = new CreateText(textConfig);
      this.addChild(moneyText);
      return moneyText;
  }

  public createBetsText(): CreateText | null {
    const textConfig = this.config.betsText;
      const betText = new CreateText(textConfig);
      this.addChild(betText);
      return betText;
  }

  public createFoldButton(): Button | null {
    const config = this.config.foldButton;
      const button = new Button(config);
      this.addChild(button);
      return button;
  }

  public createBetButton(): Button | null {
    const config = this.config.betButton;
      const button = new Button(config);
      this.addChild(button);
      return button;
  }

  public createCheckButton(): Button | null {
    const config = this.config.checkButton;
      const button = new Button(config);
      this.addChild(button);
      return button;
  }

  public createCallButton(): Button | null {
    const config = this.config.callButton;
      const button = new Button(config);
      this.addChild(button);
      return button;
  }

  public createRaiseButton(): Button | null {
    const config = this.config.raiseButton;
      const button = new Button(config);
      this.addChild(button);
      return button;
    }
}