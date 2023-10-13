import * as Colyseus from 'colyseus.js';
import ServerPlayerData from "../../interfaces/ServerPlayerData";
import PlayersConfig from "../../interfaces/PlayersConfig";
import GameSignals from "../../gameSignals/GameSignals";
import  {WEBSOCKET_URL} from '../config';


class ColyseusClient {
  private client: Colyseus.Client;
  private room: Colyseus.Room | null = null;
  myId: string

  constructor() {
    this.client = new Colyseus.Client('ws://localhost:2567');
    this.myId = ""

  }

   async joinGameRoom(authToken: string | undefined) {
    let isConnected = false
   await this.client.joinOrCreate('game',{authToken}).then(room => {
   // new MiniSignal<Array>().dispatch()
        console.log('Joined room', room)
        this.room = room
        this.myId = room.sessionId

        // Listen for messages from the server
        // room.onMessage('message', message => {
        //   console.log('Received message from server:', message)
        // });
      
        // Send a message to the server
        // room.send('message', { text: 'Hello, server!' });
        isConnected = true
        // this.setupListeners();
      }).catch(err => {
        isConnected= false
        console.error('Failed to join room:', err)
      })
    return isConnected
    // try {
    //   this.room = await this.client.join('game'); //this.room = await this.joinOrCreate.join('game')
    //   console.log('Joined game room successfully:', this.room);
    // } catch (error) {
    //   console.error('Failed to join game room:', error);
    // }
  }

  public isMyId(id: string): boolean{
    return  this.myId === id;
  }

  public setupListeners() {
    if (this.room) {
      this.room.onStateChange((state) => {
        console.log('Room state changed:', state)
      });

      this.room.onMessage('getPlayers', (data: ServerPlayerData) => {
        console.log(data)
        GameSignals.onGetPlayers.dispatch(data)
      });

      this.room.onMessage("playerJoined", (data: PlayersConfig) => {
        console.log('Received playerJoined message:', data);
        GameSignals.onPlayerJoined.dispatch(data)  
      });

      // this.room.onMessage('update_data', (data) => {
      //   console.log('Received update_data message:', data)
      //   // GameSignals.updatePlayer.dispatch(data)
      // });

      this.room.onLeave((data) => {
        console.log('Leave room:', data)
      });
    }

    // this.client.onClose(() => {
    //   console.log('Connection closed.')
    // });
  }
}

export default new ColyseusClient();
