import { Sprite } from "pixi.js";
import IPlayerConfig from "./interface/IPlayerConfig";
import Card from "../../../../interfaces/ICardData";
import PlayerView from "./view/PlayerView"
import { formatNumber } from "../../../../utility/formatNumber";
import gsap from "gsap";

export default class Player {
  config: IPlayerConfig
  id: string
  gamePosition: string
  isInLobby: boolean
  createPlayerTween: GSAPTween | null
  showWinImageTween: GSAPTween | null
  protected playerComponents: PlayerView
  constructor(config: IPlayerConfig) {
    this.playerComponents = new PlayerView(config)
    this.config = config
    this.id = this.config.id
    this.isInLobby = this.config.inLobby
    this.gamePosition = this.config.position
    this.createPlayerTween = null
    this.showWinImageTween = null
    this.startScaleTween()
  }

  public get getPlayerComponents(){
    return this.playerComponents
  }

  public updateMoneyText(updatedText: number){
    this.playerComponents.money.updateMoneyText(updatedText)
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
    this.playerComponents.bet.text.updateMessage(formatNumber(updatedBets))
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

  public destroy(){
    this.playerComponents.destroy()
  }

  public setPlayerBlindSignVisible(value: boolean){
    this.playerComponents.blindSign?.setVisible(value)
  }

  public setPlayerBlindSignTexture(textureKey: string){
    this.playerComponents.blindSign?.changeTexture(textureKey)
  }

  public setPlayerActionSignVisible(value: boolean){
    this.playerComponents.actionSign?.setVisible(value)
  }

  public setPlayerSignTexture(newTexture: string){
    this.playerComponents.actionSign?.changeTexture(newTexture)
  }

  public setActionSignAndTextureVisible(texture: string,visible: boolean){
    this.setPlayerSignTexture(texture)
    this.setPlayerActionSignVisible(visible)
  }

  public get getPosition() {
    const { x, y } = this.playerComponents;
    return { x, y };
  }

  public resetCards(){
    this.playerComponents.cards.reset()
  }

  public setAlpha(value: number){
    this.playerComponents.alpha = value
  }

  public setCardsVisible(value: boolean){
    this.playerComponents.cards.visible = value
  }

  public handleBackgroundLightVisible(value: boolean){
    this.playerComponents.backgroundLight!.visible = value
  }

  public resetTweens(){
    this.createPlayerTween = null
    this.showWinImageTween = null
  }

  public handleWinImageVisible(value){
    this.playerComponents.winImage.visible = value
  }

  public changeAvatarSprite(imageUrl){
    this.playerComponents.avatarSprite!.changeTextureURL(imageUrl)
  }

  public startScaleTween(){
    this.playerComponents.scale.x = 0
    this.playerComponents.scale.y = 0
    const scaleProps = {scale:0}
    this.createPlayerTween = gsap.to(scaleProps, {
      scale: 1, 
      duration: 0.5,
      ease: "back.out",
      onUpdate:()=>{
        this.playerComponents.scale.x = scaleProps.scale
        this.playerComponents.scale.y = scaleProps.scale
      },
      onComplete: ()=> {
        this.resetTweens()
      }
    });
  }

  public startShowWInImageAnim(){
    const winImage = this.playerComponents.winImage
    winImage.scale.x = 0.1
    winImage.scale.y = 0.1
    winImage.visible = true
    this.showWinImageTween = gsap.to(winImage.scale, {
      x: 1, 
      y: 1,
      duration: 0.5,
      ease: "back.out",
      onComplete: ()=> {
        this.resetTweens()
      }
    });
  }

}