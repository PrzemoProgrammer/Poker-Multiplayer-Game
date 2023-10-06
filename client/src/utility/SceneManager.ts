import { Application, Container } from "pixi.js";
import GameStorage from "../utility/GameStorage";
import SceneStorage from "../utility/SceneStorage";
import SceneInstanceStorage from "../utility/SceneInstanceStorage";

class SceneManager {
    game: Application | object
    scenes: { [key: string]: Function };
    sceneInstances: { [key: string]: Container };

    constructor() {
      this.game = GameStorage.getGame()
      this.scenes = SceneStorage.getScenes()
      this.sceneInstances = {};
    }
  
    public addScene(scene: Function[]):void  {
      scene.forEach((scene) => {
        SceneStorage.addScene(scene)
      });
    }
  
    public autoStartFirstScene(): void {
      const firstSceneKey = SceneStorage.getFirstScene()
      this.startScene(firstSceneKey);
    }
  
    public startScene(key: string):void {
       const sceneInstance = SceneStorage.getSceneInstance(key)
       SceneInstanceStorage.addSceneInstance(key, sceneInstance)
      GameStorage.addChild(sceneInstance)
    }
  
   public removeScene(key: string):void  {
      const sceneInstance = SceneInstanceStorage.getSceneInstance(key)
      GameStorage.removeChild(sceneInstance)
    }
  
    deleteScene(key: string):void  {
      const sceneInstance = SceneInstanceStorage.getSceneInstance(key)
      GameStorage.removeChild(sceneInstance)
      SceneStorage.deleteScene(key)
      SceneInstanceStorage.deleteSceneInstance(key)
    }
  }
  

  export default new SceneManager();
  