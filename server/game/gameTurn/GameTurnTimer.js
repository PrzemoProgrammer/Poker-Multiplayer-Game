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

  resetTimer() {
    clearInterval(this.countdownInterval);
    this.resetTimeLimit();
    this.startTimer();
  }

  stopTimer() {
    clearInterval(this.countdownInterval);
    this.resetTimeLimit();
  }

  getServerTime() {
    return new Date().getTime();
  }

  getTurnRespondTime() {
    return this.turnDurationInSeconds;
  }

  getTimeData() {
    const serverTime = this.getServerTime();
    const turnRespondTime = this.getTurnRespondTime();
    return { serverTime, turnRespondTime };
  }
}
module.exports = new GameTurnTimer();

// const { PLAYER_TURN_DURATION } = require("../config/gameConfig");

// class GameTurnTimer {
//   constructor() {
//     this.seconds = PLAYER_TURN_DURATION;
//     this.timer = null;
//   }

//   startTimer(callback) {
//     this.timer = setTimeout(() => {
//       callback();
//     }, this.seconds * 1000);
//   }

//   resetTimer() {
//     clearTimeout(this.timer);
//     this.startTimer();
//   }

//   stopTimer() {
//     clearTimeout(this.timer);
//   }

//   getServerTime() {
//     return new Date().getTime();
//   }

//   getTurnRespondTime() {
//     return this.seconds;
//   }

//   getTimeData() {
//     const serverTime = this.getServerTime();
//     const turnRespondTime = this.getTurnRespondTime();
//     return { serverTime, turnRespondTime };
//   }
// }
// module.exports = new GameTurnTimer();
