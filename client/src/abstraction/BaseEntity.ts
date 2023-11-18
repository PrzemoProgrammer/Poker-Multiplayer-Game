
import { Container} from "pixi.js";

export default abstract class BaseEntity extends Container {
  constructor(x: number,y: number) {
    super()

    this.x = x
    this.y = y
  }


}
