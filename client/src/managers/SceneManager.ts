import GameStorage from "../storage/GameStorage";
import SceneStorage from "../storage/SceneStorage";
import BaseScene from "../abstraction/BaseScene";

export default class SceneManager {
  
    public static addScene(scene: BaseScene[]):void  {
      scene.forEach((scene) => {
        SceneStorage.addScene(scene)
        GameStorage.addChild(scene)
      });
    }

    public static autoStartFirstScene(): void {
      const scenesMap = SceneStorage.getScenes
      const scenesKeys = Array.from(scenesMap.keys());
      const firstScene = scenesKeys.length > 0 ? scenesKeys[0] : undefined;
      if(firstScene)
      this.startScene(firstScene);
    }
  
    public static startScene(key: string):void {
      const scene = SceneStorage.getScene(key)
      scene?.init()
    }
  
   public static removeScene(key: string):void  {
     const sceneInstance = this.getScene(key)
      GameStorage.removeChild(sceneInstance)
    }

    public static getScene(key: string){
      return SceneStorage.getScene(key)
    }

    public static deleteScene(key: string):void  {
      this.removeScene(key)
      SceneStorage.deleteScene(key)
    }
  }
  