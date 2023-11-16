import { Sprite } from "pixi.js";
import IPlayerConfig from "./interface/IPlayerConfig";
import Card from "../../../interfaces/ICardData";
import PlayerFactory from "./factory/PlayerFactory"

export default class Player {
  config: IPlayerConfig
  id: string
  gamePosition: string
  playerComponents: PlayerFactory
  constructor(config: IPlayerConfig) {
    this.playerComponents = new PlayerFactory(config)
    this.config = config
    this.id = this.config.id
    this.gamePosition = this.config.position
  }

  public get getPlayerComponents(){
    return this.playerComponents
  }

  public updateMoneyText(updatedText: number){
    this.playerComponents.money.text = updatedText;
  }

  public updateGamePosition(updatedPosition: string){
    this.playerComponents.gamePosition = updatedPosition
  }

   public startDealCardsAnim(index: number, scale: number){
    this.playerComponents.cards.startDealAnim(index, scale)
  }

  public async startScaleUpCardsAnim(){
   await  this.playerComponents.cards.startScaleUpCardsAnim()
  }

  public updateBets(updatedBets: number){
    this.playerComponents.bet.text.updateMessage(updatedBets)
  }

  public setBetVisible(value: boolean){
    this.playerComponents.bet.setVisible(value)
  }

  public getCards():Sprite[] {
    return  this.playerComponents.cards.getCards()
  }

 public turnOverCards(cardsSymbols: Card[]){
  this.playerComponents.cards.turnOverCardsAnim(cardsSymbols)
  }

  public startTimer(serverTime: number, respondTime: number){
    this.playerComponents.timer.startCountdown(serverTime, respondTime)
  }

  public resetBet(){
    this.playerComponents.bet.setVisible(false)
    this.playerComponents.bet.updateText(0)
  }

  public setDealerSignVisible(value: boolean){
    this.playerComponents.dealerSign?.setVisible(value)
  }

  public turnOffTimer(){
    this.playerComponents.timer.resetTimer()
  }

  public setCheckSignVisible(value: boolean){
    this.playerComponents.checkSign?.setVisible(value)
  }

  public destroy(){
    this.playerComponents.destroy()
  }
  
}