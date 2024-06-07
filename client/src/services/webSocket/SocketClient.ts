import Socket from "socket.io-client";
import { WEBSOCKET_URL } from "../config";
import GameSignals from "../../gameSignals/GameSignals";

 class SocketClient {
    client: any
    myId: string
  constructor() {
    this.client = null
    this.myId = ""
    this.bindSignals()
  }

  public async connectWithServer() {
    this.client = await Socket(`${WEBSOCKET_URL}`).on("connect", () => {
        this.myId = this.client.id
    });
  }

  public getUserState(authToken: string | undefined){
    this.client.emit("getUserState", authToken);
  } 

  public isMyId(id: string): boolean{
    return  this.myId === id;
  }

  public get getMyId(): string {
    return  this.myId
  }

  public setupServerListeners() {
    // this.client.on("connect", (data: any) => {
    //     console.log("WYWOŁANA FUNKCJA ON CONNECT")
    // //   console.log("connect. WYślij za pomocą signals do play sceny update pieniedzy")
    // // //   this.playerId = this.client.id;
    // //   this.client.emit("getGameState", this.token);
    // });

    // this.client.on("playerDisconnect", (data) => {
    //   PLAY_SCENE.SCENE.playerDisconnect(data);
    // });
    
    this.client.on("roomsState", (data: any) => {
        GameSignals.onRoomsState.dispatch(data) 
    });
    this.client.on("roomState", (data: any) => {
      GameSignals.onGameState.dispatch(data) 
    });
    this.client.on("playerAndGameProfileInformation", (data: any) => {
      GameSignals.onPlayerAndGameProfileInformation.dispatch(data) 
    });
    this.client.on("getPlayers", (data: any) => {
        GameSignals.onGetPlayers.dispatch(data) 
    });
    this.client.on("playerJoinRoom", (data: any) => {
        GameSignals.onPlayerJoinRoom.dispatch(data)  
    });
    this.client.on("initPreflopRound", (data: any) => {
        GameSignals.onAllPlayerJoined.dispatch(data)  
    });
    this.client.on("updateGameTurn", (data: any) => {
        GameSignals.onChangePlayerTurn.dispatch(data)  
    });
    this.client.on("initNextRound", (data: any) => {
        GameSignals.onInitNextRound.dispatch(data)  
    });
    this.client.on("playerLeaveGame", (data: any) => {
        GameSignals.onPlayerLeave.dispatch(data)  
    });
    this.client.on("updatePlayerTurnAction", (data: any) => {
        GameSignals.onUpdatePlayerTurnAction.dispatch(data)  
    });
    this.client.on("onChatMessage", (data: any) => {
      GameSignals.onChatMessage.dispatch(data)  
  });
    this.client.on("kick", () => {
      GameSignals.onKick.dispatch()  
    });
    this.client.on("gameResult", (data: any) => {
        GameSignals.onGameResult.dispatch(data)  
    });
    this.client.on("resetGame", (data: any) => {
        GameSignals.onResetGame.dispatch(data)  
    });
    this.client.on("announcement", (data: any) => {
      GameSignals.onAnnouncement.dispatch(data)  
    });
  }

  private playerTurnAction(data: any){
    this.client.emit("playerTurnAction", data);
  }

  private joinGame(roomID: any) {
    this.client.emit("playerJoinGame", roomID);
  }

  private playerLeaveRoom(){
    this.client.emit("leaveRoom");
  }

  // private getRoomsState(){
  //   this.client.emit("getRoomsState");
  // }

  private getPlayerAndGameProfileInformation(authToken){
    this.client.emit("getPlayerAndGameProfileInformation", authToken);
  }

  private sendChatMessage(message: string){
    this.client.emit("sendMessage", message);
  }

  private bindSignals(){
    GameSignals.playerTurnAction.add((userData: any) => this.playerTurnAction(userData));
    GameSignals.joinGame.add((roomID: any) => this.joinGame(roomID));
    GameSignals.onBackButtonClick.add(() => this.playerLeaveRoom());
    // GameSignals.getRoomsState.add(() => this.getRoomsState());
    GameSignals.getPlayerAndGameProfileInformation.add((authToken) => this.getPlayerAndGameProfileInformation(authToken));
    GameSignals.sendChatMessage.add((message) => this.sendChatMessage(message));

  }
}


export default new SocketClient()