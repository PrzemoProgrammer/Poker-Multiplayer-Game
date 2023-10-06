import {  Container } from "pixi.js";

class SceneInstanceStorage {
    sceneInstances: { [key: string]: Container };

    constructor() {
      this.sceneInstances = {}
    }

    public addSceneInstance(key: string, sceneInstance: Container):void {
        this.sceneInstances[key] = sceneInstance;
    }

    getSceneInstance(key: string): Container{
        return  this.sceneInstances[key];
    }

    public deleteSceneInstance(key: string): void{
      delete this.sceneInstances[key];
  }

  }
  
  export default new SceneInstanceStorage();
  