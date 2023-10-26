const { SIT_POSITIONS } = require("../config/gameConfig");

class SitPositionManager {
  constructor() {
    this.sitPositions = SIT_POSITIONS;
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

  releasePosition(position) {
    this.sitPositions.push(position);
    this.sortPositions();
  }
}

module.exports = new SitPositionManager();
