import * as PIXI from "pixi.js";
import { Sprite} from "pixi.js";
import sceneManager from "../managers/SceneManager";
import {AUTHENTICATION, REGISTRATION } from "../services/requests/requests";
import CreateComponent from "../actions/CreateComponent";
import TextInput from "../components/textInput/TextInput";
import Button from "../components/button/Button";
import Cookies from "js-cookie";
import BaseScene from "../abstraction/BaseScene";
import loginScreenConfig from "../config/loginScreenConfig";
import ILoginScreenConfig from "../interfaces/ILoginScreenConfig";

 class LoginScene extends BaseScene {
  config: ILoginScreenConfig
  username: string
  password: string
  nick: string
  loginButton: Button | null;
  background:  Sprite | null
  usernamePlaceholder: TextInput | null
  passwordPlaceholder: TextInput | null
  // nicknamePlaceholder: TextInput | null

    constructor() {
      super("LoginScene");
      this.config = loginScreenConfig
      this.background = null
      this.usernamePlaceholder = null
      this.passwordPlaceholder = null
      // this.nicknamePlaceholder = null 
      this.loginButton = null
      this.username = ""//1234
      this.password = "" //1234
      this.nick = "" //Alfred
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
  
      username.onTextChange(({ text }) => {
        this.username = text;
      });
  
      return username;
    }

    private createPasswordPlaceholder(){
      const usernameTextInputConfig = this.config.passwordTextInputConfig
      const username = new TextInput(usernameTextInputConfig);
  
      username.onTextChange(({ text }) => {
        this.password = text;
      });
  
      return username;
    }

    // private createNicknamePlaceholder(){
    //   const nicknameTextInputConfig = this.config.nicknameTextInputConfig
    //   const nicknameTextInput = new TextInput(nicknameTextInputConfig);
  
    //   nicknameTextInput.onTextChange(({ text }) => {
    //     this.login = text;
    //   });
  
    //   return nicknameTextInput;
    // }

    private createLoginButton(): Button | null {
      const config = this.config.loginButtonConfig;
        const button = new Button(config);
        button.onClick(()=>{
          this.fetchPlayerData()
        })
        this.addChild(button);
        return button;
    }

    init(){
      this.background = this.createBackground()
      this.usernamePlaceholder = this.createUsernamePlaceholder();
      this.passwordPlaceholder = this.createPasswordPlaceholder()
      // this.nicknamePlaceholder  = this.createNicknamePlaceholder()
      this.loginButton = this.createLoginButton()
    }
 
  async fetchPlayerData(){
    // const isRegisterSuccess = await this.handleRegistration()
    const { success, jwt } = await this.handleAuthentication()
    success ?  this.handleNextScene(jwt) : console.log("Invalid login or password !");
  }

  async handleRegistration(){
    const {username, password, nick} = this.getUserUsernameAndPassword()
    const isRegisterSuccess = await (await REGISTRATION({username, password, nick })).json();

    return isRegisterSuccess
  }

  async handleAuthentication(){
    const {username, password} = this.getUserUsernameAndPassword()
    const authToken = await (await AUTHENTICATION({username, password})).json();
    const { success, jwt } = authToken;

    return  { success, jwt }
  }

  getUserUsernameAndPassword(){
    const username = this.username
    const password = this.password
    const nick = this.nick
    return {username, password, nick}
  }

    handleNextScene(jwt: string) {
      Cookies.set("authToken", jwt, { expires: 1 });
      this.usernamePlaceholder?.destroy()
      this.passwordPlaceholder?.destroy()
      this.loginButton?.destroy()
        sceneManager.startScene("PlayScene")
        sceneManager.deleteScene("MenuScene");
      }
  }
  
  export default new LoginScene()