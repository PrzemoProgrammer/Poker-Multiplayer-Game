import * as PIXI from "pixi.js";
import sceneManager from "../utility/SceneManager";
import {AUTHENTICATION, REGISTRATION } from "../services/requests/requests";
import Cookies from "js-cookie";

export default class LoginScene extends PIXI.Container {
  login: string
  password: string
    constructor() {
      super();

      console.log("Login Scene")
      this.login = "123"
      this.password = "123"
      this.fetchPlayerData()
    }
  
  async fetchPlayerData(){
    //const isRegisterSuccess = this.handleRegistration()

    const { success, jwt } = await this.handleAuthentication()
    success ?  this.handleNextScene(jwt) : console.log("Invalid login or password !");
  
    // const loginData = await (await GAME_STATE({authToken })).json();
    // console.log(loginData);

  }

  async handleRegistration(){
    const {login, password} = this.getUserLoginAndPassword()
        const isRegisterSuccess = await (await REGISTRATION({login, password })).json();
       console.log(isRegisterSuccess)

       return isRegisterSuccess
  }

  async handleAuthentication(){
const {login, password} = this.getUserLoginAndPassword()
    const authToken = await (await AUTHENTICATION({login, password})).json();
    const { success, jwt } = authToken;
    console.log(authToken)

    return  { success, jwt }
  }

  getUserLoginAndPassword(){
    const login = this.login
    const password = this.password
    return {login, password}
  }

    handleNextScene(jwt: string) {
      Cookies.set("authToken", jwt, { expires: 1 });
        sceneManager.startScene("BootstrapScene")
        sceneManager.deleteScene("MenuScene");
      }
  }
  