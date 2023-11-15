import IProgressBarConfig from "../../../../../components/progressBar/interface/IProgressBarConfig";

export default interface ITimerConfig {
  countdownSeconds: number
  fps:number,
  progressBar: IProgressBarConfig
  }