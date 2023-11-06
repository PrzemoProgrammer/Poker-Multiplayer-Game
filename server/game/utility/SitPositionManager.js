const PlayersSitPositionsStorage = require("../utility/PlayersSitPositionsStorage");

class PlayersSitPositionManager {

  getSmallestNumber() {
    const sitPositions = PlayersSitPositionsStorage.getSitPositions();
    return Math.min.apply(null, sitPositions);
  }

  sortPositions() {
    PlayersSitPositionsStorage.sortPositions();
  }

  getEmptyPosition() {
    return PlayersSitPositionsStorage.getEmptyPosition();
  }

  releasePosition(position) {
    PlayersSitPositionsStorage.addPosition(position);
    this.sortPositions();
  }
}

module.exports = new PlayersSitPositionManager();