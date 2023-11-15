import * as Colyseus from 'colyseus.js';
import IServerPlayerData from "../../interfaces/IServerPlayerData";
import IPlayersConfig from "../../game/players/interface/IPlayersConfig";
import IServerGameUpdateOnStart from "../../interfaces/IServerGameUpdateOnStart";
import IPlayerTurnData from "../../interfaces/IPlayerTurnData";
import INextRoundData from "../../interfaces/INextRoundData";
import IPlayerTurnAction from "../../interfaces/IPlayerTurnAction";
import IGameResultData from "../../interfaces/IGameResultData";
import IUpdatePlayerTurnAction from "../../interfaces/IUpdatePlayerTurnAction";
import GameSignals from "../../gameSignals/GameSignals";
import  {WEBSOCKET_URL} from '../config';

class ColyseusClient {
  private client: Colyseus.Client;
  private room: Colyseus.Room | null = null;
  myId: string

  constructor() {
    this.client = new Colyseus.Client(WEBSOCKET_URL);
    this.myId = ""

    this.bindSignals()
  }

   async joinGameRoom(authToken: string | undefined) {
    let isConnected = false
   await this.client.joinOrCreate('game',{authToken}).then(room => {
        console.log('Joined room', room)
        this.room = room
        this.myId = room.sessionId
        isConnected = true
      }).catch(err => {
        isConnected= false
        console.error('Failed to join room:', err)
      })
    return isConnected
  }

  public isMyId(id: string): boolean{
    return  this.myId === id;
  }

  public get getMyId(): string {
    return  this.myId
  }

  private bindSignals(): void {
    GameSignals.playerTurnAction.add((actionData: IPlayerTurnAction) => this.playerTurnAction(actionData));
  }

  playerTurnAction(data: IPlayerTurnAction){
    this.sendMessage("playerTurnAction", data);
  }

  public sendMessage(type: string, data: any){
   this.room?.send(type, data)
  }

  public setupListeners() {

      this.room?.onStateChange((state) => {
        console.log('Room state changed:', state)
      });

      this.room?.onMessage('getPlayers', (data: IServerPlayerData) => {
        console.log(data)
        GameSignals.onGetPlayers.dispatch(data)     
      });

      this.room?.onMessage("playerJoined", (data: IPlayersConfig) => {
        console.log('Received playerJoined message:', data);
        GameSignals.onPlayerJoined.dispatch(data)  
      });

      this.room?.onMessage("initPreflopRound", (data: IServerGameUpdateOnStart) => {
        console.log(data)
        GameSignals.onStartGameData.dispatch(data)  
      });

      this.room?.onMessage('updateGameTurn', (data: IPlayerTurnData) => {
        GameSignals.onChangePlayerTurn.dispatch(data)          
      });

      this.room?.onMessage('initNextRound', (data: INextRoundData) => {
        GameSignals.onInitNextRound.dispatch(data)          
      });

      this.room?.onMessage('playerLeaveGame', (data: string) => {
        GameSignals.onPlayerLeave.dispatch(data)          
      });

      this.room?.onMessage('updatePlayerTurnAction', (data: IUpdatePlayerTurnAction) => {
        GameSignals.onUpdatePlayerTurnAction.dispatch(data)          
      });

      this.room?.onMessage('gameResult', (data: IGameResultData) => {
        GameSignals.onGameResult.dispatch(data)          
      });

      this.room?.onMessage("announcement", (data: string) => {
        console.log("Server announcement:", data);
      });

      // this.room.onMessage('update_data', (data) => {
      //   console.log('Received update_data message:', data)
      //   // GameSignals.updatePlayer.dispatch(data)
      // });

      this.room?.onLeave((data) => {
        console.log('Leave room:', data)
      });

    // this.client.onClose(() => {
    //   console.log('Connection closed.')
    // });
  }
}

export default new ColyseusClient();
