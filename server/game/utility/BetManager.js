const Bet = require("../bet/Bet");
const PlayersManager = require("./PlayersManager");
const {
  SMALL_BLIND_BET,
  BIG_BLIND_BET,
  GAME_POSITIONS,
} = require("../../game/config");

class BetManager {
  constructor() {}

  calculateBetsOnStart(playersIDWithGamePositions, players) {
    const playersIDWithMoney = this.calculateMoneyAndBets(
      playersIDWithGamePositions,
      players
    );
    this.addStartBetsToPot();
    this.updatePlayersBets(playersIDWithMoney, players);
    return playersIDWithMoney;
  }

  addBetsToPot(bets) {
    Bet.addToPot(bets);
  }

  updatePlayersBets(playersIDWithMoney, players) {
    for (const playerId in players) {
      const player = PlayersManager.getPlayer(playerId);
      const newPlayerBets = playersIDWithMoney[playerId].bet;
      const actualPlayerBets = player.bet;
      const updatePlayerBets = newPlayerBets + actualPlayerBets;
      player.bet = updatePlayerBets;
      PlayersManager.addPlayer(playerId, player);
    }
  }

  addStartBetsToPot() {
    const smallBlindBet = SMALL_BLIND_BET;
    const bigBlindBet = BIG_BLIND_BET;
    const fullBet = smallBlindBet + bigBlindBet;
    this.addBetsToPot(fullBet);
  }

  calculateMoneyAndBets(playersIDWithGamePositions, players) {
    const smallBlindValue = SMALL_BLIND_BET;
    const bigBlindValue = BIG_BLIND_BET;
    const smallBlindGamePosition = GAME_POSITIONS[1];
    const bigBlindGamePosition = GAME_POSITIONS[2];
    const playersIDMoneyAndBets = {};

    for (const playerId in players) {
      playersIDMoneyAndBets[playerId] = {};
      if (
        playersIDWithGamePositions[playerId].position === bigBlindGamePosition
      ) {
        players[playerId].money -= bigBlindValue;
        playersIDMoneyAndBets[playerId].bet = bigBlindValue;
      } else if (
        playersIDWithGamePositions[playerId].position === smallBlindGamePosition
      ) {
        players[playerId].money -= smallBlindValue;
        playersIDMoneyAndBets[playerId].bet = smallBlindValue;
      } else {
        playersIDMoneyAndBets[playerId].bet = 0;
      }
      playersIDMoneyAndBets[playerId].money = players[playerId].money;
    }
    return playersIDMoneyAndBets;
  }

  getBets() {
    return Bet.getBets();
  }
}

module.exports = new BetManager();
