import sceneManager from "../managers/SceneManager";
import { REGISTRATION } from "../services/requests/requests";
import BaseScene from "../abstraction/BaseScene";
import registerScreenConfig from "../config/registerScreenConfig";
import IRegisterScreenConfig from "../interfaces/IRegisterScreenConfig";
import LoginScene from "./LoginScene";
import RegisterScreenView from "../view/RegisterScreenView";

 class RegisterScene extends BaseScene {
  config: IRegisterScreenConfig
  registerSceneView: RegisterScreenView | null
  username: string
  password: string
  nick: string
    constructor() {
      super("RegisterScene");
      this.config = registerScreenConfig
      this.registerSceneView = null
      this.username = ""
      this.password = "" 
      this.nick = "" 
    }

    public init(){
      this.registerSceneView =  new RegisterScreenView()
      this.addChild(this.registerSceneView)
      this.setupRegisterScreenButtons()
      this.setupTextInput()
    }

    private setupRegisterScreenButtons() {
      this.registerSceneView?.backButton?.onClick(()=>{
        this.handleBackScene()
      })
      this.registerSceneView?.registerButton?.onClick(()=>{
        this.fetchPlayerData()
      })
    }

    private setupTextInput() {
      this.registerSceneView?.usernamePlaceholder?.onTextChange(({ text }) => {
        this.username = text;
      });

      this.registerSceneView?.passwordPlaceholder?.onTextChange(({ text }) => {
        this.password = text;
      });

      this.registerSceneView?.nicknamePlaceholder?.onTextChange(({ text }) => {
        this.nick = text;
      });
    }

  private async fetchPlayerData(){
    const isRegisterSuccess = await this.handleRegistration()
    isRegisterSuccess.success ? window.alert("Register success") : window.alert("Register failure")
  }  

  private async handleRegistration(){
    const {username, password, nick} = this.getUserUsernameAndPassword()
    const isRegisterSuccess = await (await REGISTRATION({username, password, nick })).json();
    return isRegisterSuccess
  }

  private getUserUsernameAndPassword(){
    const username = this.username
    const password = this.password
    const nick = this.nick
    return {username, password, nick}
  }

  
  private destroyPlaceholders(){
    this.registerSceneView?.usernamePlaceholder?.destroy()
    this.registerSceneView?.passwordPlaceholder?.destroy()
    this.registerSceneView?.nicknamePlaceholder?.destroy()
  }

  private handleBackScene() {
    sceneManager.addScene([LoginScene]);
    sceneManager.startScene("LoginScene")
    sceneManager.deleteScene("RegisterScene");
    this.destroyPlaceholders()
    }
  }
  
  export default new RegisterScene()