import { Application, Container } from "pixi.js";

interface Scene { [key: string]: Function }


class SceneStorage {
    scenes: Scene;

    constructor() {
      this.scenes = {}
    }

    public getScenes(): Scene{
        return this.scenes
    }
  
    public addScene(scene: Function):void {
        const key = this.getSceneKey(scene)
        this.scenes[key] = scene;
    }

    public getSceneKey(scene: Function): string{
        return  { scene }.scene.name;
    }

    public getFirstScene(): string{
        const keys = Object.keys(this.scenes);
       return keys[0];
    }

    public getSceneInstance(key: string): Container{
        let SceneClass = this.scenes[key] as new () => Container;
        return new SceneClass();
    }

    public deleteScene(key: string): void{
        delete this.scenes[key];
    }
  }
  

  export default new SceneStorage();
  