import * as PIXI from "pixi.js";
import sceneManager from "../utility/SceneManager";
import PlayerStorage from "../utility/PlayerStorage";
import {PLAYER_STATE } from "../services/requests/requests";
import Cookies from "js-cookie";

export default class BootstrapScene extends PIXI.Container {
    constructor() {
      super();

      this.create()
    }

    async create(){
      await this.fetchPlayerData()
      this.startNextScene()
    }

    async fetchPlayerData(){
      const authToken = Cookies.get("authToken")
      const playerState = await (await PLAYER_STATE({authToken})).json();
      console.log(playerState)
      PlayerStorage.setData(playerState)
    }
  

    startNextScene() {
      sceneManager.startScene("PlayScene");
    }

  }
  