import ScreenUtils from "../../utility/screen/ScreenUtils";
import ITextInputConfig from "./interface/ITextInputConfig";
import { Container} from "pixi.js";

export default class TextInput extends Container{
    input: HTMLInputElement
    config: ITextInputConfig
    handleInputChange:  () => void | null 
    handleInputFocus:  () => void | null 
    handleInputBlur:  () => void | null 

  constructor(config: ITextInputConfig) {
    super()
    this.config = config;
    this.x =  this.config.x
    this.y =  this.config.y
    this.handleInputChange = () => {}
    this.handleInputFocus = () => {}
    this.handleInputBlur = () => {}
    this.input = this.createInput()
    this.init()
  }

  private init(){
    this.setupInput();
    this.resize();
    this.addResizeListener();
    document.body.appendChild(this.input);
  }

  private createInput(): HTMLInputElement{
    return document.createElement("input");
  }

  private setupInput() {
    const {type, id, classList, style:{position,background, border }} = this.config
    this.input.type = type;
    this.input.id = id;
    this.input.style.position = position;
    this.input.style.background = background;
    this.input.style.border = border;
    this.input.classList.add(classList);
  }

  private addResizeListener() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  private removeResizeListener() {
    window.removeEventListener("resize", this.resize.bind(this));
  }

  private resize() {
    const scaleFactor = ScreenUtils.calculateScaleFactor();
    const {width, height, fontSize} = this.config.style
    this.input.style.left = `${this.x * scaleFactor}px`;
    this.input.style.top = `${this.y * scaleFactor}px`;
    this.input.style.width = `${width * scaleFactor}px`;
    this.input.style.height = `${height * scaleFactor}px`;
    this.input.style.fontSize = `${fontSize * scaleFactor}px`;
  }

  public onTextChange(callback: (data: { text: string }) => void) {
    this.handleInputChange = () => {
      const text = this.input.value;
      callback({ text });
    };

    this.input.addEventListener("input", this.handleInputChange);
  }

 public onFocus(callback: ()=>void) {
    this.handleInputFocus = () => {
      callback();
    };

    this.input.addEventListener("focus", this.handleInputFocus);
  }

  public onBlur(callback: ()=>void) {
    this.handleInputBlur = () => {
      callback();
    };

    this.input.addEventListener("blur", this.handleInputBlur);
  }

  public destroy() {
    this.input.removeEventListener("input", this.handleInputChange);
    this.input.removeEventListener("focus", this.handleInputFocus);
    this.input.removeEventListener("blur", this.handleInputBlur);
    this.removeResizeListener();
    this.input.parentNode!.removeChild(this.input);
  }
}
