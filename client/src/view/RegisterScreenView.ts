import { Sprite, Container} from "pixi.js";
import CreateComponent from "../actions/CreateComponent";
import TextInput from "../components/textInput/TextInput";
import Button from "../components/button/Button";
import registerScreenConfig from "../config/registerScreenConfig";
import IRegisterScreenConfig from "../interfaces/IRegisterScreenConfig";
import CreateText from "../components/text/Text";

export default class RegisterSceneView extends Container {
  config: IRegisterScreenConfig
  usernamePlaceholder: TextInput | null
  passwordPlaceholder: TextInput | null
  nicknamePlaceholder: TextInput | null
  usernameText: CreateText | null;
  passwordText: CreateText | null;
  nicknameText: CreateText | null;
  registerButton: Button | null;
  backButton: Button | null;
  background: Sprite | null
    constructor() {
      super();
      this.config = registerScreenConfig
      this.background = this.createBackground()
      this.usernameText = this.createUsernameText()
      this.passwordText = this.createPasswordText()
      this.nicknameText = this.createNicknameText()
      this.usernamePlaceholder = this.createUsernamePlaceholder();
      this.passwordPlaceholder = this.createPasswordPlaceholder()
      this.nicknamePlaceholder  = this.createNicknamePlaceholder()
      this.registerButton = this.createRegisterButton()
      this.backButton = this.createBackButton()
    }

    private createBackground(): Sprite | null {
      const spriteConfig = this.config.background;
        const sprite = CreateComponent.createSprite(spriteConfig);
        if (sprite) this.addChild(sprite);
        return sprite;
    }

    private createUsernamePlaceholder(){
      const usernameTextInputConfig = this.config.usernameTextInputConfig
      const username = new TextInput(usernameTextInputConfig);
      return username;
    }

    private createPasswordPlaceholder(){
      const usernameTextInputConfig = this.config.passwordTextInputConfig
      const username = new TextInput(usernameTextInputConfig);
      return username;
    }
    
    public createUsernameText(): CreateText | null {
      const config = this.config.usernameText;
        const text = new CreateText(config);
        this.addChild(text);
        return text;
    }
    
    public createPasswordText(): CreateText | null {
      const config = this.config.passwordText;
        const text = new CreateText(config);
        this.addChild(text);
        return text;
    }

    public createNicknameText(): CreateText | null {
      const config = this.config.nicknameText;
        const text = new CreateText(config);
        this.addChild(text);
        return text;
    }
    
    private createNicknamePlaceholder(){
      const nicknameTextInputConfig = this.config.nicknameTextInputConfig
      const nicknameTextInput = new TextInput(nicknameTextInputConfig);
      return nicknameTextInput;
    }

    private createRegisterButton(): Button | null {
      const config = this.config.registerButtonConfig;
        const button = new Button(config);
        this.addChild(button);
        return button;
    }

    private createBackButton(): Button | null {
        const config = this.config.backButtonConfig;
          const button = new Button(config);
          this.addChild(button);
          return button;
    }
  }