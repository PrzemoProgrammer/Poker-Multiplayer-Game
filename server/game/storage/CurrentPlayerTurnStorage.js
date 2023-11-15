class CurrentPlayerTurnStorage {
  constructor() {
    this.data = { id: null, sitPosition: null };
  }

  get getPlayerData() {
    return this.data;
  }

  get getId() {
    return this.data.id;
  }

  get getSitPosition() {
    return this.data.sitPosition;
  }

  setPlayerData(playerId, playerSitPosition) {
    this.data["id"] = playerId;
    this.data["sitPosition"] = playerSitPosition;
  }
}
module.exports = new CurrentPlayerTurnStorage();
