const PlayersSitPositionsStorage = require("../../../storage/PlayersSitPositionsStorage");

class PlayersSitPositionManager {
  get getSmallestNumber() {
    const sitPositions = PlayersSitPositionsStorage.getSitPositions;
    return Math.min.apply(null, sitPositions);
  }

  get getEmptyPosition() {
    return PlayersSitPositionsStorage.getEmptyPosition;
  }

  sortPositions() {
    PlayersSitPositionsStorage.sortPositions();
  }

  releasePosition(position) {
    PlayersSitPositionsStorage.addPosition(position);
    this.sortPositions();
  }
}

module.exports = new PlayersSitPositionManager();
