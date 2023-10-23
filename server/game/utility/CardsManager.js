const {
  CARD_VALUE,
  CARD_NUMBER,
  CARD_COLOR,
} = require("../../game/cards/config");
const CroupierCards = require("../cards/CroupierCards");
const PlayersCards = require("../cards/PlayersCards");
const PlayersManager = require("./PlayersManager");

class CardsManager {
  constructor() {}

  createCroupierCards() {
    for (let i = 0; i < CARD_COLOR.length; i++) {
      const color = CARD_COLOR[i];
      for (let j = 0; j < CARD_NUMBER.length; j++) {
        const cardName = color + CARD_NUMBER[j];
        const cardValue = CARD_VALUE[j];

        const card = {
          name: cardName,
          suit: color,
          value: cardValue,
        };
        CroupierCards.addCard(card);
      }
    }
  }

  createCroupierCardsAndShuffle() {
    this.createCroupierCards();
    this.shuffleCroupierCards();
  }

  getCroupierCards() {
    return CroupierCards.getCards();
  }

  shuffleCroupierCards() {
    CroupierCards.shuffleCards();
    return this.getCroupierCards();
  }

  removeFirstCardFromCroupierDeck() {
    return CroupierCards.subtractFirstCard();
  }

  drawCardsAndAssignToPlayersID(players) {
    const playersIDDrawCards = {};

    for (const playerId in players) {
      const playerCards = [];

      for (let i = 0; i < 2; i++) {
        const card = this.removeFirstCardFromCroupierDeck();
        playerCards.push(card);
      }

      playersIDDrawCards[playerId] = {
        cards: playerCards,
      };
    }

    return playersIDDrawCards;
  }

  drawCardsForPlayers(players) {
    this.createCroupierCardsAndShuffle();
    const playersDrawCards = this.drawCardsAndAssignToPlayersID(players);
    this.addCardsToServerPlayersDec(playersDrawCards);

    return playersDrawCards;
  }

  addCardsToPlayerDeck(playerIDkey, cards) {
    PlayersCards.addPlayerCards(playerIDkey, cards);
  }

  addCardsToServerPlayersDec(playersDrawCards) {
    for (const playerId in playersDrawCards) {
      const cards = playersDrawCards[playerId];
      this.addCardsToPlayerDeck(playerId, cards);
    }
  }

  deletePlayerCards(clientId) {
    PlayersCards.deletePlayerCards(clientId);
  }
}

module.exports = new CardsManager();
