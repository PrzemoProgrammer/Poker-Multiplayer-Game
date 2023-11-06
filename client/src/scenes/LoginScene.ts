import * as PIXI from "pixi.js";
import sceneManager from "../utility/managers/SceneManager";
import {AUTHENTICATION, REGISTRATION } from "../services/requests/requests";
import Cookies from "js-cookie";
import BaseScene from "../abstraction/BaseScene";


 class LoginScene extends BaseScene {
  login: string
  password: string
  nick: string
    constructor() {
      super("LoginScene");
      this.login = "1234"
      this.password = "1234"
      this.nick = "ALfred"
    }

    init(){
      this.fetchPlayerData()
    }
  
  async fetchPlayerData(){
    // const isRegisterSuccess = await this.handleRegistration()

    const { success, jwt } = await this.handleAuthentication()
    success ?  this.handleNextScene(jwt) : console.log("Invalid login or password !");
  }

  async handleRegistration(){
    const {login, password, nick} = this.getUserLoginAndPassword()
    const isRegisterSuccess = await (await REGISTRATION({login, password, nick })).json();
    console.log(isRegisterSuccess)

       return isRegisterSuccess
  }

  async handleAuthentication(){
  const {login, password} = this.getUserLoginAndPassword()
    const authToken = await (await AUTHENTICATION({login, password})).json();
    const { success, jwt } = authToken;

    return  { success, jwt }
  }

  getUserLoginAndPassword(){
    const login = this.login
    const password = this.password
    const nick = this.nick
    return {login, password, nick}
  }

    handleNextScene(jwt: string) {
      Cookies.set("authToken", jwt, { expires: 1 });
        sceneManager.startScene("PlayScene")
        sceneManager.deleteScene("MenuScene");
      }
  }
  
  export default new LoginScene()