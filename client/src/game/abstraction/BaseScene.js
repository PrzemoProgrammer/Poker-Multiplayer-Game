import * as PIXI from "pixi.js";

export default class BaseScene extends PIXI.Container {
  constructor(sceneKey) {
    super();
    this.sceneKey = sceneKey;
    this.isActive = false;
  }

  init(data) {
    this.isActive = true;
  }
}
