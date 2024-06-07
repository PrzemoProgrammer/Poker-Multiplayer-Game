import { checkIsPortraitOrientation } from "../../utility/screen/checkIsPortraitOrientation";
export const MAX_PLAYERS = 5;
export const MAX_PLAYER_CARDS = 2;
export const GAME_POSITIONS = ["dealer", "smallBlind", "bigBlind", "player"];
export const BUTTON_TYPES = ["fold", "check", "call", "raise", "bet"];
export const VALUE_BUTTON_TYPES = ["5BB", "35", "75", "110"];

const PLAYER_POSITIONS_LANDSCAPE_CONFIG = {
  player1: {
    sitPosition: {
      x: 967,
      y: 792,
    },
    betPosition: {
      x: -6,
      y: -140,
    },
    cardsPositions: {
      dealAnimStartPositions: [
        {
          x: 150,
          y: -500,
        },
        {
          x: 150,
          y: -500,
        },
      ],
      dealAnimEndPositions: [
        {
          x: -1, //190
          y: -60, //60
        },
        {
          x: -10, //330
          y: -51, //60
        },
      ],
    },
  },
  player2: {
    sitPosition: {
      x: 454,
      y: 504,
    },
    betPosition: {
      x: 172,
      y: -2,
    },
    cardsPositions: {
      dealAnimStartPositions: [
        {
          x: 580,
          y: -290,
        },
        {
          x: 580,
          y: -290,
        },
      ],
      dealAnimEndPositions: [
        {
          x: 2, // RÓZNICA 9
          y: -57, //RÓŻNICA 9
        },
        {
          x: -7, // RÓZNICA 9
          y: -48, //RÓŻNICA 9
        },
      ],
    },
  },
  player3: {
    sitPosition: {
      x: 658,
      y: 232,
    },
    betPosition: {
      x: -11,
      y: 73,
    },
    cardsPositions: {
      dealAnimStartPositions: [
        {
          x: 410,
          y: 50,
        },
        {
          x: 410,
          y: 50,
        },
      ],
      dealAnimEndPositions: [
        {
          x: 3,
          y: -54,
        },
        {
          x: -6,
          y: -47,
        },
      ],
    },
  },
  player4: {
    sitPosition: {
      x: 1282,
      y: 232,
    },
    betPosition: {
      x: -11,
      y: 73,
    },
    cardsPositions: {
      dealAnimStartPositions: [
        {
          x: -400,
          y: 50,
        },
        {
          x: -400,
          y: 50,
        },
      ],
      dealAnimEndPositions: [
        {
          x: 2,
          y: -56,
        },
        {
          x: -6,
          y: -47,
        },
      ],
    },
  },
  player5: {
    sitPosition: {
      x: 1455,
      y: 504,
    },
    betPosition: {
      x: -172,
      y: -2,
    },
    cardsPositions: {
      dealAnimStartPositions: [
        {
          x: -580,
          y: -290,
        },
        {
          x: -580,
          y: -290,
        },
      ],
      dealAnimEndPositions: [
        {
          x: 1,
          y: -58,
        },
        {
          x: -8,
          y: -49,
        },
      ],
    },
  },
};

const PLAYER_POSITIONS_PORTRAIT_CONFIG = {
  player1: {
    sitPosition: {
      x: 751,
      y: 930,
    },
    betPosition: {
      x: -6,
      y: -140,
    },
    cardsPositions: {
      dealAnimStartPositions: [
        {
          x: 0,
          y: -958,
        },
        {
          x: 0,
          y: -958,
        },
      ],
      dealAnimEndPositions: [
        {
          x: -1, //190
          y: -60, //60
        },
        {
          x: -10, //330
          y: -51, //60
        },
      ],
    },
  },
  player2: {
    sitPosition: {
      x: 480,
      y: 650,
    },
    betPosition: {
      x: 172,
      y: -2,
    },
    cardsPositions: {
      dealAnimStartPositions: [
        {
          x: 297,
          y: -705,
        },
        {
          x: 297,
          y: -705,
        },
      ],
      dealAnimEndPositions: [
        {
          x: 2, // RÓZNICA 9
          y: -57, //RÓŻNICA 9
        },
        {
          x: -7, // RÓZNICA 9
          y: -48, //RÓŻNICA 9
        },
      ],
    },
  },
  player3: {
    sitPosition: {
      x: 480,
      y: 154,
    },
    betPosition: {
      x: 172,
      y: -2,
    },
    cardsPositions: {
      dealAnimStartPositions: [
        {
          x: 260,
          y: -216,
        },
        {
          x: 260,
          y: -216,
        },
      ],
      dealAnimEndPositions: [
        {
          x: 3,
          y: -54,
        },
        {
          x: -6,
          y: -47,
        },
      ],
    },
  },
  player4: {
    sitPosition: {
      x: 1013,
      y: 154,
    },
    betPosition: {
      x: -172,
      y: -2,
    },
    cardsPositions: {
      dealAnimStartPositions: [
        {
          x: -260,
          y: -216,
        },
        {
          x: -260,
          y: -216,
        },
      ],
      dealAnimEndPositions: [
        {
          x: 2,
          y: -56,
        },
        {
          x: -6,
          y: -47,
        },
      ],
    },
  },
  player5: {
    sitPosition: {
      x: 1013,
      y: 650,
    },
    betPosition: {
      x: -172,
      y: -2,
    },
    cardsPositions: {
      dealAnimStartPositions: [
        {
          x: -297,
          y: -705,
        },
        {
          x: -297,
          y: -705,
        },
      ],
      dealAnimEndPositions: [
        {
          x: 1,
          y: -58,
        },
        {
          x: -8,
          y: -49,
        },
      ],
    },
  },
};

export const PLAYER_POSITIONS_CONFIG = checkIsPortraitOrientation()
  ? PLAYER_POSITIONS_PORTRAIT_CONFIG
  : PLAYER_POSITIONS_LANDSCAPE_CONFIG;
