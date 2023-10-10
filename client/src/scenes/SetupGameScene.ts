import * as PIXI from "pixi.js";
import sceneManager from "../utility/SceneManager";
import AssetsManager from "../utility/AssetsManager";
import Cookies from "js-cookie";
import BaseScene from "../abstraction/BaseScene";
import ColyseusClient from "../services/colyseus/ColyseusClient";



export default class SetupGameScene extends BaseScene {
    game: BaseScene
  constructor() {
    super();

    // ColyseusClient.setupListeners();
    this.game =  sceneManager.getScene("PlayScene")
    ColyseusClient.setupListeners()
  }




}