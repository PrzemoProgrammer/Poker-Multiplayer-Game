import * as PIXI from "pixi.js";
import sceneManager from "../utility/managers/SceneManager";
import {PLAYER_STATE } from "../services/requests/requests";
import ColyseusClient from "../services/colyseus/ColyseusClient";
import Cookies from "js-cookie";
import BaseScene from "../abstraction/BaseScene";

class SetupGameScene extends BaseScene {
  authToken: string | undefined
    constructor() {
      super("SetupGameScene");

    }

    async init(){
      this.authToken = this.getAuthToken()
    //   await this.fetchPlayerData()
      await this.tryJoinToGameRoom()
      this.startSocketListeners()
    }

    // async fetchPlayerData(){
    //   const authToken = this.authToken
    //   const playerState = await (await PLAYER_STATE({authToken})).json();
    //   PlayerStorage.setData(playerState)
    // }

     private async tryJoinToGameRoom(){
      const isPlayerJoined = await ColyseusClient.joinGameRoom(Cookies.get("authToken"))
      return isPlayerJoined
    }

    private getAuthToken(): string | undefined{
      return Cookies.get("authToken")
    }

    private startSocketListeners(){
        ColyseusClient.setupListeners()
    }
  }
  export default new SetupGameScene()