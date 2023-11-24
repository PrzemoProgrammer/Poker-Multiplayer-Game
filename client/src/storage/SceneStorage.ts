import BaseScene from "../abstraction/BaseScene";

export default class SceneStorage {
    private static  scenes: Map<string, BaseScene> = new Map();
  
    public static addScene(scene: BaseScene): void {
      const key = scene.sceneKey;
      this.scenes.set(key, scene);
    }
  
    public static getScene(key: string): BaseScene | undefined {
      return this.scenes.get(key);
    }

    public static get getScenes(): Map<string,{}>{
      return this.scenes
    }
  
    public static deleteScene(key: string): void {
      this.scenes.delete(key);
    }
  }