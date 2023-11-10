import * as Colyseus from 'colyseus.js';
import ServerPlayerData from "../../interfaces/ServerPlayerData";
import PlayersConfig from "../../interfaces/PlayersConfig";
import ServerGameUpdateOnStart from "../../interfaces/ServerGameUpdateOnStart";
import PlayerTurnData from "../../interfaces/PlayerTurnData";
import FlopRoundData from "../../interfaces/NextRoundData";
import PlayerTurnAction from "../../interfaces/PlayerTurnAction";
import GameSignals from "../../gameSignals/GameSignals";
import  {WEBSOCKET_URL} from '../config';


class ColyseusClient {
  private client: Colyseus.Client;
  private room: Colyseus.Room | null = null;
  myId: string

  constructor() {
    this.client = new Colyseus.Client('ws://localhost:2567');
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

  public getMyId(): string {
    return  this.myId
  }

  private bindSignals(): void {
    GameSignals.playerTurnAction.add((actionData: PlayerTurnAction) => this.playerTurnAction(actionData));
  }

  playerTurnAction(data: PlayerTurnAction){
    this.sendMessage("playerTurnAction", data);
  }

  public sendMessage(type: string, data: any){
   this.room?.send(type, data)
  }

  public setupListeners() {

      this.room?.onStateChange((state) => {
        console.log('Room state changed:', state)
      });

      this.room?.onMessage('getPlayers', (data: ServerPlayerData) => {
        console.log(data)
        GameSignals.onGetPlayers.dispatch(data)     
      });

      this.room?.onMessage("playerJoined", (data: PlayersConfig) => {
        console.log('Received playerJoined message:', data);
        GameSignals.onPlayerJoined.dispatch(data)  
      });

      this.room?.onMessage("initPreflopRound", (data: ServerGameUpdateOnStart) => {
        console.log(data)
        GameSignals.onStartGameData.dispatch(data)  
      });

      this.room?.onMessage('updateGameTurn', (data: PlayerTurnData) => {
        GameSignals.onChangePlayerTurn.dispatch(data)          
      });

      this.room?.onMessage('initNextRound', (data: FlopRoundData) => {
        GameSignals.onInitNextRound.dispatch(data)          
      });

      this.room?.onMessage('playerLeaveGame', (data: string) => {
        GameSignals.onPlayerLeave.dispatch(data)          
      });

      this.room?.onMessage('updatePlayerTurnAction', (data: string) => {
        GameSignals.onUpdatePlayerTurnAction.dispatch(data)          
      });

      this.room?.onMessage("announcement", (data: string) => {
        console.log("Server announcement:", data);
        // GameSignals.onPlayerJoined.dispatch(data)  
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
