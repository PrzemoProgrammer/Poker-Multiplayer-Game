// module.exports = class PokerHandChecker {
//    findPlayerWithBestCombination(playersCards, tableCards) {
//     const playersPokerHands = {};
//     for (const playerId in playersCards) {
//       const playerCardsArray = playersCards[playerId];

//       if (this.hasRoyalFlush(playerCardsArray, tableCards)) {
//         playersPokerHands[playerId] = 9;
//       } else if (this.hasStraightFlush(playerCardsArray, tableCards)) {
//         playersPokerHands[playerId] = 8;
//       } else if (this.findFourOfAKind(playerCardsArray, tableCards)) {
//         playersPokerHands[playerId] = 7;
//       } else if (this.hasFullHouse(playerCardsArray, tableCards)) {
//         playersPokerHands[playerId] = 6;
//       } else if (this.hasFlush(playerCardsArray, tableCards)) {
//         playersPokerHands[playerId] = 5;
//       } else if (this.hasStraight(playerCardsArray, tableCards)) {
//         playersPokerHands[playerId] = 4;
//       } else if (this.hasThreeOfAKind(playerCardsArray, tableCards)) {
//         playersPokerHands[playerId] = 3;
//       } else if (this.hasTwoPairs(playerCardsArray, tableCards)) {
//         playersPokerHands[playerId] = 2;
//       } else if (this.hasOnePair(playerCardsArray, tableCards)) {
//         playersPokerHands[playerId] = 1;
//       } else {
//         playersPokerHands[playerId] = 0;
//       }
//     }

//     return playersPokerHands;
//   }

//    findHighestCard(playerCards) {
//     return playerCards.reduce(
//       (maxCard, card) => (card.value > maxCard.value ? card : maxCard),
//       playerCards[0]
//     );
//   }

//    hasOnePair(playerCards, tableCards) {
//     return this.hasNOfAKind(playerCards, tableCards, 2);
//   }

//    hasTwoPairs(playerCards, tableCards) {
//     return this.hasNOfAKind(playerCards, tableCards, 2, 2);
//   }

//    hasThreeOfAKind(playerCards, tableCards) {
//     return this.hasNOfAKind(playerCards, tableCards, 3);
//   }

//    hasNOfAKind(playerCards, tableCards, n, distinctValues = 1) {
//     const allCards = [...playerCards, ...tableCards];
//     const valueCount = {};
//     for (const card of allCards) {
//       valueCount[card.value] = (valueCount[card.value] || 0) + 1;
//     }
//     return (
//       Object.values(valueCount).includes(n) &&
//       Object.keys(valueCount).length === distinctValues
//     );
//   }

//    hasStraight(playerCards, tableCards) {
//     const allCards = [...playerCards, ...tableCards].sort(
//       (a, b) => a.value - b.value
//     );
//     return this.findConsecutiveSequence(
//       allCards.map((card) => parseInt(card.value, 10)),
//       5
//     );
//   }

//    findConsecutiveSequence(arr, length) {
//     return arr.some((value, index) =>
//       arr.slice(index, index + length).every((v, i) => v === value + i)
//     );
//   }

//    hasFlush(playerCards, tableCards) {
//     const allCards = [...playerCards, ...tableCards];
//     const suitsGroups = {};
//     for (const card of allCards) {
//       suitsGroups[card.suit] = (suitsGroups[card.suit] || 0) + 1;
//     }
//     return Object.values(suitsGroups).some((count) => count >= 5);
//   }

//    hasFullHouse(playerCards, tableCards) {
//     const allCards = [...playerCards, ...tableCards];
//     const valueCounts = {};
//     for (const card of allCards) {
//       valueCounts[card.value] = (valueCounts[card.value] || 0) + 1;
//     }
//     return (
//       Object.values(valueCounts).includes(2) &&
//       Object.values(valueCounts).includes(3)
//     );
//   }

//    findFourOfAKind(playerCards, tableCards) {
//     return this.hasNOfAKind(playerCards, tableCards, 4);
//   }

//    hasStraightFlush(playerCards, tableCards) {
//     const allCards = [...playerCards, ...tableCards].sort(
//       (a, b) => a.value - b.value
//     );
//     return (
//       this.findConsecutiveSequence(
//         allCards.map((card) => parseInt(card.value, 10)),
//         5
//       ) && this.hasFlush(playerCards, tableCards)
//     );
//   }

//    hasRoyalFlush(playerCards, tableCards) {
//     const allCards = [...playerCards, ...tableCards];
//     const royalFlushValues = ["10", "11", "12", "13", "14"];
//     const suitsGroups = {};
//     for (const card of allCards) {
//       if (!suitsGroups[card.suit]) {
//         suitsGroups[card.suit] = [];
//       }
//       suitsGroups[card.suit].push(card.value);
//     }
//     return Object.values(suitsGroups).some(
//       (values) =>
//         values.length >= 5 &&
//         royalFlushValues.every((value) => values.includes(value))
//     );
//   }
// };
//! ///////////
// const PokerHandChecker = require("../PokerHandChecker");

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

    // Sprawdź, czy istnieje sekwencja pięciu kart z rzędu
    for (let i = 0; i < sortedCards.length - 4; i++) {
      const straightSequence = sortedCards.slice(i, i + 5);

      if (this.isStraight(straightSequence)) {
        return true;
      }
    }

    return false;
  }

  static isStraight(cards) {
    // Sprawdź, czy karty tworzą sekwencję z rzędu
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

    // Liczenie ilości kart o danej wartości
    allCards.forEach((card) => {
      if (!valueCount[card.value]) {
        valueCount[card.value] = 1;
      } else {
        valueCount[card.value]++;
      }
    });

    // Sprawdzanie, czy istnieją cztery karty o tej samej wartości
    for (const value in valueCount) {
      if (valueCount[value] === 4) {
        return true; // Gracz ma Four of a Kind
      }
    }

    return false; // Gracz nie ma Four of a Kind
  }

  static hasStraightFlush(playerCards, tableCards) {
    const allCards = [...playerCards, ...tableCards];

    // Sortowanie kart według wartości
    allCards.sort((a, b) => a.value - b.value);

    // Sprawdzanie Straight Flush
    for (let i = 0; i <= allCards.length - 5; i++) {
      const straightFlushCandidate = allCards.slice(i, i + 5);

      // Sprawdzanie, czy wszystkie karty mają ten sam kolor
      const isSameSuit = straightFlushCandidate.every(
        (card) => card.suit === straightFlushCandidate[0].suit
      );

      // Sprawdzanie, czy wartości kart tworzą sekwencję
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
        return true; // Gracz ma Straight Flush
      }
    }

    return false; // Gracz nie ma Straight Flush
  }

  static hasRoyalFlush(playerCards, tableCards) {
    const allCards = [...playerCards, ...tableCards];
    const suits = new Set();
    const values = new Set();

    // Check for cards of the same suit
    for (const card of allCards) {
      suits.add(card.suit);
    }

    for (const suit of suits) {
      const suitCards = allCards.filter((card) => card.suit === suit);

      // Check if there are at least 5 cards of the same suit
      if (suitCards.length >= 5) {
        // Reset the values set
        values.clear();

        // Check for A, K, Q, J, 10 in the same suit
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
          return true; // Royal Flush found
        }
      }
    }

    return false; // No Royal Flush
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
