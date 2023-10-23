// @ts-nocheck
import {MiniSignal} from 'mini-signals';

export default class GameSignals {
    static onPlayerJoined = new MiniSignal();
    static onGetPlayers = new MiniSignal();
    static onStartGameData = new MiniSignal();


    // static updatePlayer = new MiniSignal();
  } 