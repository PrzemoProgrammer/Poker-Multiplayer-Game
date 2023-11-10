const { MAX_PLAYER_CARDS } = require("../../config/gameConfig");
const PlayersManager = require("./PlayersManager");
const CroupierCardsManager = require("./CroupierCardsManager");

class PlayersCardsManager {
  initCards(players) {
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
}

module.exports = new PlayersCardsManager();
