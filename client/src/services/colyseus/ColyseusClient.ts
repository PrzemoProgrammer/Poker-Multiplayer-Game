import * as Colyseus from 'colyseus.js';
import  {WEBSOCKET_URL} from '../config';

class ColyseusClient {
  private client: Colyseus.Client;
  private room: Colyseus.Room | null = null;

  constructor() {
    this.client = new Colyseus.Client('ws://localhost:2567');
    this.setupListeners();
  }

   async joinGameRoom(authToken: string | undefined) {
    let isConnected = false
   await this.client.joinOrCreate('game',{authToken}).then(room => {
        console.log('Joined room', room)
      
        // Listen for messages from the server
        // room.onMessage('message', message => {
        //   console.log('Received message from server:', message)
        // });
      
        // Send a message to the server
        // room.send('message', { text: 'Hello, server!' });
        isConnected = true
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

  private setupListeners() {
    if (this.room) {
      this.room.onStateChange((state) => {
        console.log('Room state changed:', state)
      });

    //   this.room.send("message", { text: "Hello, server!" });

      this.room.onMessage('update_data', (data) => {
        console.log('Received update_data message:', data);
      });

      this.room.onLeave((data) => {
        console.log('Leave room:', data);
      });
    }

    // this.client.onClose(() => {
    //   console.log('Connection closed.');
    // });
  }
}
const colyseusClient = new ColyseusClient()
export default colyseusClient;
