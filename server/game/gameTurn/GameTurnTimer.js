const { PLAYER_TURN_DURATION } = require("../config/gameConfig");

class GameTurnTimer {
  constructor() {
    this.turnDurationInSeconds = PLAYER_TURN_DURATION;
    this.timeLimit = this.turnDurationInSeconds;
    this.countdownInterval = null;
  }

  startTimer(callback) {
    this.countdownInterval = setInterval(() => {
      if (this.timeLimit > 0) {
        this.timeLimit--;
      } else {
        this.resetTimeLimit();
        if (callback) callback();
      }
    }, 1000);
  }

  resetTimeLimit() {
    this.timeLimit = this.turnDurationInSeconds;
  }

  stopTimer() {
    clearInterval(this.countdownInterval);
    this.resetTimeLimit();
  }

  get getServerTime() {
    return new Date().getTime();
  }

  get getTurnRespondTime() {
    return this.turnDurationInSeconds;
  }

  getTimeData() {
    const serverTime = this.getServerTime;
    const turnRespondTime = this.getTurnRespondTime;
    return { serverTime, turnRespondTime };
  }
}
module.exports = new GameTurnTimer();
