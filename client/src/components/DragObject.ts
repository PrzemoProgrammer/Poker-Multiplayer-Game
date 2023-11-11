import { InteractionEvent, Point, IPointData } from "pixi.js";
import CreateSprite from "./CreateSprite";
import DefaultSpriteConfig from "../interfaces/DefaultSpriteConfig";
import { ARROW_CONFIG } from "../UI/betting/config/bettingConfig";

export default class DragObject extends CreateSprite {
  minY: number;
  maxY: number;
  dragging: boolean;
  dragData: InteractionEvent["data"] | null;
  dragOffset: Point | null;

  constructor(config: DefaultSpriteConfig) {
    super(config);
    this.minY = ARROW_CONFIG.minY;
    this.maxY = ARROW_CONFIG.maxY;
    this.interactive = true;
    this.buttonMode = true;
    this.dragging = false;
    this.dragData = null;
    this.dragOffset = null;
  }

  public initEvents(callback: () => void) {
    this.on("pointerdown", this.onDragStart);
    this.on("pointerup", this.onDragEnd);
    this.on("pointerupoutside", this.onDragEnd);
    this.on("pointermove", (event: InteractionEvent) => this.onDragMove(event, callback));
  }

  public onDragStart(event: InteractionEvent) {
    this.dragData = event.data;
    this.dragOffset = this.convertToPoint(this.dragData.getLocalPosition(this));
    this.dragging = true;
  }

  private convertToPoint(data: IPointData): Point {
    return new Point(data.x, data.y);
  }

  public onDragEnd() {
    this.dragData = null;
    this.dragOffset = null;
    this.dragging = false;
  }

  public onDragMove(event: InteractionEvent, callback: () => void) {
    if (this.dragging) {
      if (callback) callback();
      const newPosition = this.dragData?.getLocalPosition(this.parent);
      const newY = newPosition!.y - this.dragOffset!.y;

      if (newY < this.minY || newY > this.maxY) return;
      this.y = newY;
    }
  }
}
