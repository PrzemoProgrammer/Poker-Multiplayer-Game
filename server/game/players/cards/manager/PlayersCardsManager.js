const { MAX_PLAYER_CARDS } = require("../../../config/gameConfig");
const PlayersManager = require("../../manager/PlayersManager");
const CroupierCardsManager = require("../../../croupier/manager/CroupierCardsManager");

module.exports = class PlayersCardsManager {
  static initCards(players) {
    const playersDrawCards = this.drawCardsAndAssignToPlayersID(players);
    this.updatePlayersCardsOnServer(playersDrawCards);

    return playersDrawCards;
  }

  static updatePlayersCardsOnServer(playersDrawCards) {
    for (const playerId in playersDrawCards) {
      const newPlayerCards = playersDrawCards[playerId].cards;
      this.updatePlayerCardsOnServer(playerId, newPlayerCards);
    }
  }

  static updatePlayerCardsOnServer(playerId, newPlayerCards) {
    PlayersManager.updatePlayerCards(playerId, newPlayerCards);
  }

  static drawCardsAndAssignToPlayersID(players) {
    const playersIDDrawCards = {};
    for (const playerId in players) {
      const playerCards = [];
      for (let i = 0; i < MAX_PLAYER_CARDS; i++) {
        const card = CroupierCardsManager.removeFirstCardFromDeck();
        playerCards.push(card);
      }
      playersIDDrawCards[playerId] = {
        cards: playerCards,
      };
    }

    return playersIDDrawCards;
  }
};
