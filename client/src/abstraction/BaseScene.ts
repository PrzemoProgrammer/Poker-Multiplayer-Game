import * as PIXI from "pixi.js";

export default class BaseScene extends PIXI.Container {
  sceneKey: string
  constructor(sceneKey: string) {
    super();

    this.sceneKey = sceneKey
    // this.bindSignals()
  }

  init(){
    
  }
//   bindSignals() {
//     this.signals = [

//     ]
//   }

//   dispose() {
//  this.signals.forEach(signal => signal.detach())
//   }
  // public init(): void{

  // }
}
