import { MiniSignal } from "mini-signals";

export default class GameSignals {
  static onPlayerJoinRoom = new MiniSignal();
  static onGetPlayers = new MiniSignal();
  static onAllPlayerJoined = new MiniSignal();
  static onChangePlayerTurn = new MiniSignal();
  static onInitNextRound = new MiniSignal();
  static onPlayerLeave = new MiniSignal();
  static onUpdatePlayerTurnAction = new MiniSignal();
  static onGameResult = new MiniSignal();
  static onRoomsState = new MiniSignal();
  static onGameState = new MiniSignal();
  static onResetGame = new MiniSignal();
  static onAnnouncement = new MiniSignal();
  static onBackButtonClick = new MiniSignal();
  static onPlayerAndGameProfileInformation = new MiniSignal();
  static onKick = new MiniSignal();
  static onChatMessage = new MiniSignal();

  static getPlayerAndGameProfileInformation = new MiniSignal();
  static playerTurnAction = new MiniSignal();
  static joinGame = new MiniSignal();
  static getRoomsState = new MiniSignal();
  static sendChatMessage = new MiniSignal();
}
