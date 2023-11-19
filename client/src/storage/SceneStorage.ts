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
  
    public static get getFirstSceneKey(): string | undefined {
      const keys = Array.from(this.scenes.keys());
      return keys.length > 0 ? keys[0] : undefined;
    }
  
    public static deleteScene(key: string): void {
      this.scenes.delete(key);
    }
  }