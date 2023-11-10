// @ts-nocheck
import {MiniSignal} from 'mini-signals';

export default class GameSignals {
    static onPlayerJoined = new MiniSignal();
    static onGetPlayers = new MiniSignal();
    static onStartGameData = new MiniSignal();
    static onChangePlayerTurn = new MiniSignal();
    static onInitNextRound = new MiniSignal();
    static onPlayerLeave = new MiniSignal();
    static onUpdatePlayerTurnAction = new MiniSignal();

    static playerTurnAction = new MiniSignal();
  } 