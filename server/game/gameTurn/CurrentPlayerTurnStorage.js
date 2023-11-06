class CurrentPlayerTurnStorage {
  constructor() {
    this.data = { id: null, sitPosition: null };
  }

  setPlayerData(playerId, playerSitPosition) {
    this.data["id"] = playerId;
    this.data["sitPosition"] = playerSitPosition;
  }

  getPlayerData() {
    return this.data;
  }

  getId() {
    return this.data.id;
  }

  getSitPosition() {
    return this.data.sitPosition;
  }
}
module.exports = new CurrentPlayerTurnStorage();
