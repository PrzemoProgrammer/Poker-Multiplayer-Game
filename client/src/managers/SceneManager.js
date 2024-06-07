import AppManager from "../managers/AppManager";
import SceneStorage from "../storage/SceneStorage";

export default class SceneManager {
  static addScene(scene) {
    scene.forEach((scene) => {
      SceneStorage.addScene(scene);
      AppManager.addChild(scene);
    });
  }

  static autoStartFirstScene() {
    const scenesMap = SceneStorage.scenes;
    const scenesKeys = Array.from(scenesMap.keys());
    const firstScene = scenesKeys.length > 0 ? scenesKeys[0] : undefined;
    if (firstScene) this.startScene(firstScene);
  }

  static startScene(key, data) {
    const scene = this.getScene(key);
    AppManager.addChild(scene);
    scene.init(data);
  }

  static removeScene(key) {
    const sceneInstance = this.getScene(key);
    sceneInstance?.removeListeners();
    AppManager.removeChild(sceneInstance);
  }

  static getScene(key) {
    return SceneStorage.getScene(key);
  }

  static deleteScene(key) {
    this.removeScene(key);
    SceneStorage.deleteScene(key);
  }

  static setVisible(key, value) {
    const sceneInstance = this.getScene(key);
    sceneInstance.visible = value;
  }
}
