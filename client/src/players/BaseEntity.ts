
import { Container} from "pixi.js";

export default class BaseEntity extends Container {
  constructor(x: number,y: number) {
    super()

    this.x = x
    this.y = y
  }


}
