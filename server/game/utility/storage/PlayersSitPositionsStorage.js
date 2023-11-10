const { SIT_POSITIONS } = require("../../config/gameConfig");

class PlayersSitPositionsStorage {
  constructor() {
    this.sitPositions = SIT_POSITIONS;
  }

  addPosition(position) {
    this.sitPositions.push(position);
  }

  getSitPositions() {
    return this.sitPositions;
  }

  getSmallestNumber() {
    return Math.min.apply(null, this.sitPositions);
  }

  sortPositions() {
    this.sitPositions.sort(function (a, b) {
      return a - b;
    });
  }

  getEmptyPosition() {
    return this.sitPositions.shift();
  }
}

module.exports = new PlayersSitPositionsStorage();
