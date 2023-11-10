import { Container} from "pixi.js";
import ProgressBar from "../../../../components/ProgressBar";
import TimerConfig from "../../../../interfaces/TimerConfig";

export default class Timer extends Container {
progressBar: ProgressBar
config: TimerConfig
countdownInterval: NodeJS.Timeout | null;
fps: number
  constructor(config: TimerConfig) {
    super()
    this.config = config;
    this.fps = this.config.fps
    this.countdownInterval = null;
    this.progressBar = this.createProgressBar()
  }

  private createProgressBar(): ProgressBar {
    const progressBarConfig = this.config.progressBar;
      const progressBar = new ProgressBar(progressBarConfig);
      if (progressBar) this.addChild(progressBar);
      return progressBar;
  }

  public startCountdown(serverTime: number, respondTime: number):void {
    const playerRespondTime = this.calculatePlayerTurnTime(serverTime, respondTime)
    this.setVisible(true)
    const progressBarMaskWidth = this.progressBar.getBarMaskWidth() 
    const decreaseAmount =  progressBarMaskWidth / ( playerRespondTime  * this.fps); 

    this.countdownInterval = setInterval(() => {
        const progressBarMaskWidth = this.progressBar.getBarMaskWidth()
      if (progressBarMaskWidth > 1) {
        let updateWidth = progressBarMaskWidth - decreaseAmount
        this.progressBar.updateBar(updateWidth)
      } else {
        this.resetTimer()
      }
    }, 1000 / this.fps); 
  }

    public stopCountdown(): void {
        if (this.countdownInterval) clearInterval(this.countdownInterval);
    }

    setVisible(value: boolean) {
        this.visible = value
    }

    public resetTimer(){
        this.setVisible(false)
        this.stopCountdown()
        this.progressBar.resetMaskWidth()
    }

    public get getActualTime(): number{
        return new Date().getTime()
    }

    public calculatePlayerTurnTime(serverTime: number, respondTime: number): number{
        return respondTime - Math.floor((this.getActualTime - serverTime) / 1000);
    }
}

