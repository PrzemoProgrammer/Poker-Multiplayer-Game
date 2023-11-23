import { Sprite, Container} from "pixi.js";
import CreateComponent from "../actions/CreateComponent";
import TextInput from "../components/textInput/TextInput";
import Button from "../components/button/Button";
import loginScreenConfig from "../config/loginScreenConfig";
import ILoginScreenConfig from "../interfaces/ILoginScreenConfig";
import CreateText from "../components/text/Text";

export default class LoginSceneView extends Container {
  config: ILoginScreenConfig
  usernamePlaceholder: TextInput | null
  passwordPlaceholder: TextInput | null
  usernameText: CreateText | null;
  passwordText: CreateText | null;
  loginButton: Button | null;
  registerButton: Button | null;
  background:  Sprite | null
    constructor() {
      super();
      this.config = loginScreenConfig
      this.background = this.createBackground()
      this.usernameText = this.createUsernameText()
      this.passwordText = this.createPasswordText()
      this.usernamePlaceholder = this.createUsernamePlaceholder();
      this.passwordPlaceholder = this.createPasswordPlaceholder()
      this.loginButton = this.createLoginButton()
      this.registerButton = this.createRegisterButton() 
    }

    private createBackground(): Sprite | null {
      const spriteConfig = this.config.background;
        const sprite = CreateComponent.createSprite(spriteConfig);
        if (sprite) this.addChild(sprite);
        return sprite;
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

    private createLoginButton(): Button | null {
      const config = this.config.loginButtonConfig;
        const button = new Button(config);
        this.addChild(button);
        return button;
    }

    private createRegisterButton(): Button | null {
      const config = this.config.registerButtonConfig;
        const button = new Button(config);
        this.addChild(button);
        return button;
    }
  }