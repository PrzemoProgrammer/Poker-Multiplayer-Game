import * as Colyseus from 'colyseus.js';
import {Container } from "pixi.js";
import sceneManager from "../../utility/SceneManager";
// import playersManager from "../../utility/PlayersManager";
import ServerPlayerData from "../../interfaces/ServerPlayerData";
import  {WEBSOCKET_URL} from '../config';

class ColyseusClient {
  private client: Colyseus.Client;
  private room: Colyseus.Room | null = null;
    playScene = Container

  constructor() {
    this.client = new Colyseus.Client('ws://localhost:2567');
  }

   async joinGameRoom(authToken: string | undefined) {
    let isConnected = false
   await this.client.joinOrCreate('game',{authToken}).then(room => {
        console.log('Joined room', room)
        this.room = room
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

  public setupListeners() {
    if (this.room) {
      this.room.onStateChange((state) => {
        console.log('Room state changed:', state)
      });

      this.room.onMessage("playerJoined", (data: ServerPlayerData) => {
        console.log('Received playerJoined message:', data);
        // playersManager.addPlayer(data)
        // const playScene = sceneManager.getScene("PlayScene")
        // console.log(playScene)
      });

      this.room.onMessage('update_data', (data) => {
        console.log('Received update_data message:', data)
      });

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
