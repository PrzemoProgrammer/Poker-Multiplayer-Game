import BaseScene from "../abstraction/BaseScene";

  class SceneStorage {
    scenes: Map<string, BaseScene>;
  
    constructor() {
      this.scenes = new Map();
    }
  
    public getScenes(): Map<string, BaseScene> {
      return this.scenes;
    }
  
    public addScene(scene: BaseScene): void {
      const key = scene.sceneKey;
      this.scenes.set(key, scene);
    }
  
    public getScene(key: string): BaseScene | undefined {
      return this.scenes.get(key);
    }
  
    public getFirstSceneKey(): string | undefined {
      const keys = Array.from(this.scenes.keys());
      return keys.length > 0 ? keys[0] : undefined;
    }
  
    public deleteScene(key: string): void {
      this.scenes.delete(key);
    }
  }
  
  export default new SceneStorage();