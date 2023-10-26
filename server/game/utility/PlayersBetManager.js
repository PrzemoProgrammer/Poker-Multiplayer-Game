const Bet = require("../bet/Bet");
const PlayersManager = require("./PlayersManager");
const {
  SMALL_BLIND_BET,
  BIG_BLIND_BET,
  GAME_POSITIONS,
} = require("../config/gameConfig");

class PlayersBetManager {
  updateBets(playersIDWithGamePositions, players) {
    const calculatedPlayersBets = this.calculateBetsOnStart(
      playersIDWithGamePositions,
      players
    );
    this.updateBetsOnServer(calculatedPlayersBets);

    return calculatedPlayersBets;
  }

  updateBetsOnServer(calculatedPlayersBets) {
    for (const playerId in calculatedPlayersBets) {
      const newPlayerBet = calculatedPlayersBets[playerId].bet;
      this.updateBetOnServer(playerId, newPlayerBet);
    }
  }

  updateBetOnServer(playerId, newPlayerBet) {
    PlayersManager.updatePlayerBet(playerId, newPlayerBet);
  }

  calculateBetsOnStart(playersIDWithGamePositions, players) {
    const playersIDWithMoney = this.calculateMoneyAndBets(
      playersIDWithGamePositions,
      players
    );
    // this.addStartBetsToPot();
    // this.updatePlayersBets(playersIDWithMoney, players);
    return playersIDWithMoney;
  }

  // addBetsToPot(bets) {
  //   Bet.addToPot(bets);
  // }

  //   updatePlayersBets(playersIDWithMoney, players) {
  //     for (const playerId in players) {
  //       const player = PlayersManager.getPlayer(playerId);
  //       const newPlayerBets = playersIDWithMoney[playerId].bet;
  //       const actualPlayerBets = player.bet;
  //       const updatePlayerBets = newPlayerBets + actualPlayerBets;
  //       player.bet = updatePlayerBets;
  //       PlayersManager.addPlayer(playerId, player);
  //     }
  //   }

  // addStartBetsToPot() {
  //   const smallBlindBet = SMALL_BLIND_BET;
  //   const bigBlindBet = BIG_BLIND_BET;
  //   const fullBet = smallBlindBet + bigBlindBet;
  //   this.addBetsToPot(fullBet);
  // }

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
        players[playerId].clientData.money -= bigBlindValue;
        playersIDMoneyAndBets[playerId].bet = bigBlindValue;
      } else if (
        playersIDWithGamePositions[playerId].position === smallBlindGamePosition
      ) {
        players[playerId].clientData.money -= smallBlindValue;
        playersIDMoneyAndBets[playerId].bet = smallBlindValue;
      } else {
        playersIDMoneyAndBets[playerId].bet = 0;
      }
      playersIDMoneyAndBets[playerId].money =
        players[playerId].clientData.money;
    }
    return playersIDMoneyAndBets;
  }

  // getBets() {
  //   return Bet.getBets();
  // }
}

module.exports = new PlayersBetManager();
