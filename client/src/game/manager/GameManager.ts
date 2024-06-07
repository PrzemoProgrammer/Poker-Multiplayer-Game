import SocketClient from "../../services/webSocket/SocketClient";
import IAllPlayerJoinedServerData from "../../interfaces/IAllPlayerJoinedServerData";
import IPlayerTurnData from "../../interfaces/IPlayerTurnData";
import IServerPlayerData from "../../interfaces/IServerPlayerData";
import INextRoundData from "../../interfaces/INextRoundData";
import IUpdatePlayerTurnAction from "../../interfaces/IUpdatePlayerTurnAction";
import GameSignals from "../../gameSignals/GameSignals";
// import IPlayersConfig from "../players/interface/IPlayersConfig";
import IGameResultData from "../../interfaces/IGameResultData";
import SceneManager from "../../managers/SceneManager";
import PagesManager from '../../pages/manager/PagesManager.js'; 
import UIManager from '../../UI/manager/UIManager.js'; 

export default class GameManager {
  protected static game: any = null

  static startGame(playersData: any) {
  const game = SceneManager.getScene("Game")
  const background = SceneManager.getScene("Background")
  // SceneManager.startScene("Game")

  if(!game?.isActive) {
    SceneManager.startScene("Game", playersData)
    this.game = SceneManager.getScene("Game")
    this.bindSignals();
    background.startGameBackground()
    return
  }
    SceneManager.setVisible("Game", true)
    this.game.refreshGameData(playersData)
    background.startGameBackground()
  }

  static afterLoadGameCallback(){
    PagesManager.handleLoadingGameVisible(false)
    PagesManager.handleLoginPageVisible(true)
    this.startBackground()
  }

  static startBackground(){
    SceneManager.startScene("Background");
  }

  static resetAndHide(){
    const game = SceneManager.getScene("Game")
    const background = SceneManager.getScene("Background")
    game.resetGame()
    SceneManager.setVisible("Game", false)
    background.startLobbyBackground()
  }

  static addPlayerToGame(playerData: IServerPlayerData) {
    console.log(playerData)
      if (SocketClient.isMyId(playerData.id)) return;
      this.game.createPlayerAndAddToGame(playerData)
  }

  static onAllPlayerJoined(initGameData: IAllPlayerJoinedServerData) {
    this.game.onAllPlayerJoined(initGameData);
    UIManager.updateBottomBarButtons(initGameData.game.playerTurnData)
    const playerMoneyData = {money: initGameData.players.playersMoney[SocketClient.getMyId]}
    UIManager.update(playerMoneyData)
  }

  static changePlayerTurn(newPlayerTurn: IPlayerTurnData ){
    this.game.updatePlayerTurn(newPlayerTurn)
    if (SocketClient.isMyId(newPlayerTurn.playerIdGameTurn)) 
      UIManager.updateBottomBarButtons(newPlayerTurn)
  }

  static async initNextRound(nextRoundData: INextRoundData){
    this.game.initNextRound(nextRoundData)    
  }

  static deletePlayerFromGame(playerId: string){
    if (SocketClient.isMyId(playerId)) {
      this.resetAndHide()
      UIManager.handleVisible(false)
      PagesManager.handleLobbyPageVisible(true)
      PagesManager.handleLoadingPageVisible(false)
      PagesManager.setPointerEventActive(true)
      return;
    }
    this.game.deletePlayer(playerId)
  }

  static  updatePlayerTurnAction(playerSignData: IUpdatePlayerTurnAction ){
    this.game.updatePlayerTurnAction(playerSignData)
    // UIManager.update(playerSignData)
  }

  static initGameResult(gameResultData: IGameResultData){
    this.game.initGameResult(gameResultData)
  }

  static initGameState(roomStateData){
    this.game.initGameState(roomStateData)
  }

  static kickPlayer(){
    this.resetAndHide()
    UIManager.handleVisible(false)
    PagesManager.handleLobbyPageVisible(true)
  }

  static resetGame(data: any){
    this.game.resetGame()
  }

  static handleSounds(value: string){
    this.game.handleSounds(value)
  }

  static bindSignals(): void {
    // GameSignals.onGetPlayers.add((playerData: IPlayersConfig) => this.addPlayersToGame(playerData));
    GameSignals.onPlayerJoinRoom.add((playerData: IServerPlayerData) => this.addPlayerToGame(playerData));
    GameSignals.onAllPlayerJoined.add((initGameData: IAllPlayerJoinedServerData) =>
        this.onAllPlayerJoined(initGameData),
    );
    GameSignals.onChangePlayerTurn.add((newPlayerTurn: IPlayerTurnData )=> this.changePlayerTurn(newPlayerTurn))
    GameSignals.onGameState.add((roomStateData: any )=> this.initGameState(roomStateData))
    GameSignals.onInitNextRound.add((initNextRoundData: INextRoundData )=> this.initNextRound(initNextRoundData)) 
    GameSignals.onPlayerLeave.add((playerId: string )=> this.deletePlayerFromGame(playerId))
    GameSignals.onUpdatePlayerTurnAction.add((playerSignData: IUpdatePlayerTurnAction )=> this.updatePlayerTurnAction(playerSignData))
    GameSignals.onGameResult.add((gameResultData: IGameResultData )=> this.initGameResult(gameResultData))
    GameSignals.onResetGame.add((data: any )=> this.resetGame(data))
    GameSignals.onKick.add(( )=> this.kickPlayer())
}

  static removeListeners(){
    GameSignals.onPlayerJoinRoom.detachAll()
    GameSignals.onGameState.detachAll()
    GameSignals.onAllPlayerJoined.detachAll()
    GameSignals.onInitNextRound.detachAll()
    GameSignals.onPlayerLeave.detachAll()
    GameSignals.onGameResult.detachAll()
    GameSignals.onResetGame.detachAll()
    GameSignals.onKick.detachAll()
    GameSignals.onChangePlayerTurn.detachAll()
    GameSignals.onUpdatePlayerTurnAction.detachAll()
  }
}