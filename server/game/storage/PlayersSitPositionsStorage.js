const { SIT_POSITIONS } = require("../config/gameConfig");

class PlayersSitPositionsStorage {
  constructor() {
    this.sitPositions = [...SIT_POSITIONS];
  }

  get getSitPositions() {
    return this.sitPositions;
  }

  get getEmptyPosition() {
    return this.sitPositions.shift();
  }

  addPosition(position) {
    this.sitPositions.push(position);
  }

  sortPositions() {
    this.sitPositions.sort(function (a, b) {
      return a - b;
    });
  }
}

module.exports = new PlayersSitPositionsStorage();
