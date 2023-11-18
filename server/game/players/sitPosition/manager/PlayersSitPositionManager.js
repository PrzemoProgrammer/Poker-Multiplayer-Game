const PlayersSitPositionsStorage = require("../../../storage/PlayersSitPositionsStorage");

module.exports = class PlayersSitPositionManager {
  static get getSmallestNumber() {
    const sitPositions = PlayersSitPositionsStorage.getSitPositions;
    return Math.min.apply(null, sitPositions);
  }

  static get getEmptyPosition() {
    return PlayersSitPositionsStorage.getEmptyPosition;
  }

  static sortPositions() {
    PlayersSitPositionsStorage.sortPositions();
  }

  static releasePosition(position) {
    PlayersSitPositionsStorage.addPosition(position);
    this.sortPositions();
  }
};
