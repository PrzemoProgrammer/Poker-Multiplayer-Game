import GameStorage from "../storage/GameStorage";
import SceneStorage from "../storage/SceneStorage";
import BaseScene from "../../abstraction/BaseScene";

class SceneManager {
  
    public addScene(scene: BaseScene[]):void  {
      scene.forEach((scene) => {
        SceneStorage.addScene(scene)
        GameStorage.addChild(scene)
      });
    }
  
    public autoStartFirstScene(): void {
      const firstSceneKey = SceneStorage.getFirstSceneKey()
      if(firstSceneKey)
      this.startScene(firstSceneKey);
    }
  
    public startScene(key: string):void {
      const scene = SceneStorage.getScene(key)
      if(scene)
      scene.init()
    }
  
   public removeScene(key: string):void  {
     const sceneInstance = this.getScene(key)
      GameStorage.removeChild(sceneInstance)
    }

    public getScene(key: string){
      return SceneStorage.getScene(key)
    }

    deleteScene(key: string):void  {
      this.removeScene(key)
      SceneStorage.deleteScene(key)
    }
  }
  
  export default new SceneManager();