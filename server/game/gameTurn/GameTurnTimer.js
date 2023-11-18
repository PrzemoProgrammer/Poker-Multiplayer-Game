const { PLAYER_TURN_DURATION } = require("../config/gameConfig");

module.exports = class GameTurnTimer {
  static turnDurationInSeconds = PLAYER_TURN_DURATION;
  static timeLimit = this.turnDurationInSeconds;
  static countdownInterval = null;

  static startTimer(callback) {
    this.countdownInterval = setInterval(() => {
      if (this.timeLimit > 0) {
        this.timeLimit--;
      } else {
        this.resetTimeLimit();
        if (callback) callback();
      }
    }, 1000);
  }

  static resetTimeLimit() {
    this.timeLimit = this.turnDurationInSeconds;
  }

  static stopTimer() {
    clearInterval(this.countdownInterval);
    this.resetTimeLimit();
  }

  static get getServerTime() {
    return new Date().getTime();
  }

  static get getTurnRespondTime() {
    return this.turnDurationInSeconds;
  }

  static getTimeData() {
    const serverTime = this.getServerTime;
    const turnRespondTime = this.getTurnRespondTime;
    return { serverTime, turnRespondTime };
  }
};
