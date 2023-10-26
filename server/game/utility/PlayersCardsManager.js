const { CARD_VALUE, CARD_NUMBER, CARD_COLOR } = require("../config/cardConfig");
const CroupierCards = require("../croupier/CroupierCards");
const PlayersCards = require("../cards/PlayersCards");
const PlayersManager = require("./PlayersManager");
const CroupierCardsManager = require("./CroupierCardsManager");

class PlayersCardsManager {
  updateCards(players) {
    const playersDrawCards = this.drawCardsAndAssignToPlayersID(players);
    this.updatePlayersCardsOnServer(playersDrawCards);

    return playersDrawCards;
  }

  updatePlayersCardsOnServer(playersDrawCards) {
    for (const playerId in playersDrawCards) {
      const newPlayerCards = playersDrawCards[playerId].cards;
      this.updatePlayerCardsOnServer(playerId, newPlayerCards);
    }
  }

  updatePlayerCardsOnServer(playerId, newPlayerCards) {
    PlayersManager.updatePlayerCards(playerId, newPlayerCards);
  }

  drawCardsAndAssignToPlayersID(players) {
    const playersIDDrawCards = {};
    for (const playerId in players) {
      const playerCards = [];
      for (let i = 0; i < 2; i++) {
        const card = CroupierCardsManager.removeFirstCardFromDeck();
        playerCards.push(card);
      }
      playersIDDrawCards[playerId] = {
        cards: playerCards,
      };
    }

    return playersIDDrawCards;
  }

  deletePlayerCards(clientId) {
    PlayersCards.deletePlayerCards(clientId);
  }
}

module.exports = new PlayersCardsManager();
