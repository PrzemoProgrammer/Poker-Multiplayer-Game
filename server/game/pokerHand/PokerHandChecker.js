module.exports = class PokerHandChecker {
  static getPlayerWithBestCombination(playersCards, tableCards) {
    const playersPokerHandCombinations =
      this.calculatePlayersPokerHandCombinations(playersCards, tableCards);
    const playerWithBestCombination = this.findPlayerWithBestCombination(
      playersPokerHandCombinations
    );

    console.log(playersPokerHandCombinations);
    return playerWithBestCombination;
  }

  static calculatePlayersPokerHandCombinations(playersCards, tableCards) {
    const playersPokerHands = {};
    for (const playerId in playersCards) {
      const playerCardsArray = playersCards[playerId];

      if (this.hasRoyalFlush(playerCardsArray, tableCards)) {
        playersPokerHands[playerId] = 9;
      } else if (this.hasStraightFlush(playerCardsArray, tableCards)) {
        playersPokerHands[playerId] = 8;
      } else if (this.findFourOfAKind(playerCardsArray, tableCards)) {
        playersPokerHands[playerId] = 7;
      } else if (this.hasFullHouse(playerCardsArray, tableCards)) {
        playersPokerHands[playerId] = 6;
      } else if (this.hasFlush(playerCardsArray, tableCards)) {
        playersPokerHands[playerId] = 5;
      } else if (this.hasStraight(playerCardsArray, tableCards)) {
        playersPokerHands[playerId] = 4;
      } else if (this.hasThreeOfAKind(playerCardsArray, tableCards)) {
        playersPokerHands[playerId] = 3;
      } else if (this.hasTwoPairs(playerCardsArray, tableCards)) {
        playersPokerHands[playerId] = 2;
      } else if (this.hasOnePair(playerCardsArray, tableCards)) {
        playersPokerHands[playerId] = 1;
      } else {
        playersPokerHands[playerId] = 0;
      }
    }
    return playersPokerHands;
  }

  static findHighestCard(playerCards) {
    const sortedCards = playerCards.sort((a, b) => b.value - a.value);
    return sortedCards[0];
  }

  static hasOnePair(playerCards, tableCards) {
    const allCards = [...playerCards, ...tableCards];
    const cardCounts = {};

    for (const card of allCards) {
      if (cardCounts[card.value]) {
        cardCounts[card.value]++;
      } else {
        cardCounts[card.value] = 1;
      }
    }

    for (const value in cardCounts) {
      if (cardCounts[value] === 2) {
        return true;
      }
    }

    return false;
  }

  static hasTwoPairs(playerCards, tableCards) {
    const allCards = [...playerCards, ...tableCards];
    const cardCounts = {};

    allCards.forEach((card) => {
      const { value } = card;
      cardCounts[value] = (cardCounts[value] || 0) + 1;
    });

    let pairCount = 0;
    for (const count of Object.values(cardCounts)) {
      if (count === 2) {
        pairCount++;
      }
    }

    return pairCount === 2;
  }

  static hasThreeOfAKind(playerCards, tableCards) {
    const allCards = [...playerCards, ...tableCards];
    const valueCount = {};

    allCards.forEach((card) => {
      const value = card.value;
      valueCount[value] = (valueCount[value] || 0) + 1;
    });

    const threeOfAKindValue = Object.keys(valueCount).find(
      (value) => valueCount[value] === 3
    );

    return !!threeOfAKindValue;
  }

  static hasStraight(playerCards, tableCards) {
    const allCards = [...playerCards, ...tableCards];
    const sortedCards = allCards.sort((a, b) => a.value - b.value);

    for (let i = 0; i < sortedCards.length - 4; i++) {
      const straightSequence = sortedCards.slice(i, i + 5);

      if (this.isStraight(straightSequence)) {
        return true;
      }
    }

    return false;
  }

  static isStraight(cards) {
    for (let i = 0; i < cards.length - 1; i++) {
      if (parseInt(cards[i].value) !== parseInt(cards[i + 1].value) - 1) {
        return false;
      }
    }

    return true;
  }

  static hasFlush(playerCards, tableCards) {
    const allCards = [...playerCards, ...tableCards];
    const suitsGroups = {};
    allCards.forEach((card) => {
      const { suit } = card;
      if (!suitsGroups[suit]) {
        suitsGroups[suit] = [];
      }
      suitsGroups[suit].push(card);
    });
    const flushSuit = Object.keys(suitsGroups).find(
      (suit) => suitsGroups[suit].length >= 5
    );

    return !!flushSuit;
  }

  static hasFullHouse(playerCards, tableCards) {
    const allCards = playerCards.concat(tableCards);
    const valueCounts = {};

    allCards.forEach((card) => {
      const value = card.value;
      valueCounts[value] = (valueCounts[value] || 0) + 1;
    });

    let hasThreeOfAKind = false;
    let hasPair = false;

    for (const value in valueCounts) {
      if (valueCounts[value] === 3) {
        hasThreeOfAKind = true;
      } else if (valueCounts[value] === 2) {
        hasPair = true;
      }
    }

    return hasThreeOfAKind && hasPair;
  }

  static findFourOfAKind(playerCards, tableCards) {
    const allCards = [...playerCards, ...tableCards];
    const valueCount = {};

    allCards.forEach((card) => {
      if (!valueCount[card.value]) {
        valueCount[card.value] = 1;
      } else {
        valueCount[card.value]++;
      }
    });

    for (const value in valueCount) {
      if (valueCount[value] === 4) {
        return true;
      }
    }

    return false;
  }

  static hasStraightFlush(playerCards, tableCards) {
    const allCards = [...playerCards, ...tableCards];

    allCards.sort((a, b) => a.value - b.value);

    for (let i = 0; i <= allCards.length - 5; i++) {
      const straightFlushCandidate = allCards.slice(i, i + 5);

      const isSameSuit = straightFlushCandidate.every(
        (card) => card.suit === straightFlushCandidate[0].suit
      );

      const isStraight = straightFlushCandidate.every((card, index) => {
        if (index < 4) {
          return (
            parseInt(card.value, 10) + 1 ===
            parseInt(straightFlushCandidate[index + 1].value, 10)
          );
        }
        return true;
      });

      if (isSameSuit && isStraight) {
        return true;
      }
    }

    return false;
  }

  static hasRoyalFlush(playerCards, tableCards) {
    const allCards = [...playerCards, ...tableCards];
    const suits = new Set();
    const values = new Set();

    for (const card of allCards) {
      suits.add(card.suit);
    }

    for (const suit of suits) {
      const suitCards = allCards.filter((card) => card.suit === suit);

      if (suitCards.length >= 5) {
        values.clear();

        for (const card of suitCards) {
          values.add(card.value);
        }

        if (
          values.has("10") &&
          values.has("11") &&
          values.has("12") &&
          values.has("13") &&
          values.has("14")
        ) {
          return true;
        }
      }
    }

    return false;
  }

  static findPlayerWithBestCombination(playersCombinations) {
    let maxKey = null;
    let maxValue = -Infinity;

    for (const key in playersCombinations) {
      if (playersCombinations.hasOwnProperty(key)) {
        const value = playersCombinations[key];

        if (value > maxValue) {
          maxValue = value;
          maxKey = key;
        }
      }
    }

    return maxKey;
  }
};
