import * as PIXI from "pixi.js";
import { Sprite, Container } from "pixi.js";
import BaseScene from "../abstraction/BaseScene";
import CreateComponent from "./CreateComponent";
import CreateText from "./CreateText";
import Button from "./Button";
import uiInterfaceConfig from "../config/uiInterfaceConfig";
import UiInterfaceConfig from "../interfaces/UiInterfaceConfig";

export default class UiInterface extends Container {
  bottomBar: Sprite | null;
  moneyText: CreateText | null;
  betsText: CreateText | null;
  foldButton: Button | null;
  checkFoldButton: Button | null;
  checkButton: Button | null;
  callButton: Button | null;
  raiseButton: Button | null;
  config: UiInterfaceConfig;

  constructor(scene: BaseScene) {
    super();
    this.config = uiInterfaceConfig;
  
    this.bottomBar = this.createBottomBar();
    this.moneyText = this.createMoneyText();
    this.betsText = this.createBetsText();
    this.foldButton = this.createFoldButton();
    this.checkFoldButton = this.createCheckFoldButton();
    this.checkButton = this.createCheckButton();
    this.callButton = this.createCallButton();
    this.raiseButton = this.createRaiseButton();
    
    scene.addChild(this);
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
      button.onClick(() => {
        console.log("clicked");
      });
      return button;
  }

  public createCheckFoldButton(): Button | null {
    const config = this.config.checkFoldButton;
      const button = new Button(config);
      this.addChild(button);
      button.onClick(() => {
        console.log("clicked");
      });
      return button;
  }

  public createCheckButton(): Button | null {
    const config = this.config.checkButton;
      const button = new Button(config);
      this.addChild(button);
      button.onClick(() => {
        console.log("clicked");
      });
      return button;
  }

  public createCallButton(): Button | null {
    const config = this.config.callButton;
      const button = new Button(config);
      this.addChild(button);
      button.onClick(() => {
        console.log("clicked");
      });
      return button;
  }

  public createRaiseButton(): Button | null {
    const config = this.config.raiseButton;
      const button = new Button(config);
      this.addChild(button);
      button.onClick(() => {
        console.log("clicked");
      });
      return button;
    }
}








// import * as PIXI from "pixi.js";
// import { Sprite, Container } from "pixi.js";
// import BaseScene from "../abstraction/BaseScene";
// import CreateComponent from "./CreateComponent";
// import CreateText from "./CreateText";
// import Button from "./Button";
// import uiInterfaceConfig from "../config/uiInterfaceConfig";
// import UiInterfaceConfig from "../interfaces/UiInterfaceConfig";

// class UiInterface extends Container {
//   scene: BaseScene | null;
//   bottomBar: Sprite | null;
//   moneyText: CreateText | null;
//   betsText: CreateText | null;
//   foldButton: Button | null;
//   checkFoldButton: Button | null;
//   checkButton: Button | null;
//   callButton: Button | null;
//   raiseButton: Button | null;
//   config: UiInterfaceConfig;

//   constructor() {
//     super();
//     this.config = uiInterfaceConfig;
//     this.scene = null;
//     this.bottomBar = null;
//     this.moneyText = null;
//     this.betsText = null;
//     this.foldButton = null;
//     this.checkFoldButton = null;
//     this.checkButton = null;
//     this.callButton = null;
//     this.raiseButton = null;
//   }

//   public create(scene: BaseScene) {
//     this.scene = scene;
//     this.bottomBar = this.createBottomBar();
//     this.moneyText = this.createMoneyText();
//     this.betsText = this.createBetsText();
//     this.foldButton = this.createFoldButton();
//     this.checkFoldButton = this.createCheckFoldButton();
//     this.checkButton = this.createCheckButton();
//     this.callButton = this.createCallButton();
//     this.raiseButton = this.createRaiseButton();
//     this.scene.addChild(this);
//   }

//   public createBottomBar(): Sprite | null {
//     const spriteConfig = this.config.bottomBar;
//     if (this.scene && spriteConfig) {
//       const sprite = CreateComponent.create(spriteConfig);
//       if (sprite) this.addChild(sprite);
//       return sprite;
//     }
//     return null;
//   }

//   public createMoneyText(): CreateText | null {
//     const textConfig = this.config.moneyText;
//     if (this.scene && textConfig) {
//       const moneyText = new CreateText(textConfig);
//       this.addChild(moneyText);
//       return moneyText;
//     }
//     return null;
//   }

//   public createBetsText(): CreateText | null {
//     const textConfig = this.config.betsText;
//     if (this.scene && textConfig) {
//       const betText = new CreateText(textConfig);
//       this.addChild(betText);
//       return betText;
//     }
//     return null;
//   }

//   public createFoldButton(): Button | null {
//     const config = this.config.foldButton;
//     if (this.scene && config) {
//       const button = new Button(this.scene, config);
//       this.addChild(button);
//       button.onClick(() => {
//         console.log("clicked");
//       });
//       return button;
//     }
//     return null;
//   }

//   public createCheckFoldButton(): Button | null {
//     const config = this.config.checkFoldButton;
//     if (this.scene && config) {
//       const button = new Button(this.scene, config);
//       this.addChild(button);
//       button.onClick(() => {
//         console.log("clicked");
//       });
//       return button;
//     }
//     return null;
//   }

//   public createCheckButton(): Button | null {
//     const config = this.config.checkButton;
//     if (this.scene && config) {
//       const button = new Button(this.scene, config);
//       this.addChild(button);
//       button.onClick(() => {
//         console.log("clicked");
//       });
//       return button;
//     }
//     return null;
//   }

//   public createCallButton(): Button | null {
//     const config = this.config.callButton;
//     if (this.scene && config) {
//       const button = new Button(this.scene, config);
//       this.addChild(button);
//       button.onClick(() => {
//         console.log("clicked");
//       });
//       return button;
//     }
//     return null;
//   }

//   public createRaiseButton(): Button | null {
//     const config = this.config.raiseButton;
//     if (this.scene && config) {
//       const button = new Button(this.scene, config);
//       this.addChild(button);
//       button.onClick(() => {
//         console.log("clicked");
//       });
//       return button;
//     }
//     return null;
//   }
// }

// export default new UiInterface();
