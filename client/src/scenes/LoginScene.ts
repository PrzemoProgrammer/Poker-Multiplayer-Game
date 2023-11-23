import sceneManager from "../managers/SceneManager";
import {AUTHENTICATION} from "../services/requests/requests";
import Cookies from "js-cookie";
import BaseScene from "../abstraction/BaseScene";
import loginScreenConfig from "../config/loginScreenConfig";
import ILoginScreenConfig from "../interfaces/ILoginScreenConfig";
import RegisterScene from "./RegisterScene";
import LoginSceneView from "../view/LoginSceneView";

 class LoginScene extends BaseScene {
  config: ILoginScreenConfig
  loginSceneView: LoginSceneView | null
  username: string
  password: string
  nick: string

    constructor() {
      super("LoginScene");
      this.config = loginScreenConfig
      this.loginSceneView = null
      this.username = ""
      this.password = "" 
      this.nick = "" 
    }

    public init(){
      this.loginSceneView = new LoginSceneView()
      this.addChild(this.loginSceneView)
      this.setupLoginScreenButtons()
      this.setupTextInput()
    }

    private setupLoginScreenButtons() {
      this.loginSceneView?.loginButton?.onClick(()=>{
        this.fetchPlayerData()
      })
      this.loginSceneView?.registerButton?.onClick(()=>{
        this.handleRegisterScene()
      })
    }

    private setupTextInput() {
      this.loginSceneView?.usernamePlaceholder?.onTextChange(({ text }) => {
        this.username = text;
      });

      this.loginSceneView?.passwordPlaceholder?.onTextChange(({ text }) => {
        this.password = text;
      });
    }

  private async fetchPlayerData(){
      const { success, jwt } = await this.handleAuthentication()
      success ?  this.handleNextScene(jwt) : window.alert("Invalid login or password !");
  }

  private async handleAuthentication(){
    const {username, password} = this.getUserUsernameAndPassword()
    const authToken = await (await AUTHENTICATION({username, password})).json();
    const { success, jwt } = authToken;
    return  { success, jwt }
  }

  private getUserUsernameAndPassword(){
    const username = this.username
    const password = this.password
    const nick = this.nick
    return {username, password, nick}
  }

  private destroyPlaceholders(){
    this.loginSceneView?.usernamePlaceholder?.destroy()
    this.loginSceneView?.passwordPlaceholder?.destroy()
  }

  private handleRegisterScene(){
    sceneManager.addScene([RegisterScene]);
    sceneManager.startScene("RegisterScene")
    sceneManager.deleteScene("LoginScene");
    this.destroyPlaceholders()
  }

    private handleNextScene(jwt: string) {
      Cookies.set("authToken", jwt, { expires: 1 });
      sceneManager.startScene("PlayScene")
      sceneManager.deleteScene("LoginScene");
      this.destroyPlaceholders()
      }
  }
  
  export default new LoginScene()