class Bet {
  constructor() {
    this.betsInPot = 0;
  }

  addToPot(value) {
    this.betsInPot += value;
  }

  getBets() {
    return this.betsInPot;
  }
}

module.exports = new Bet();
