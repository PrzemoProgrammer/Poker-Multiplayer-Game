export const MAX_PLAYERS = 5
export const MAX_PLAYER_CARDS = 2
export const GAME_POSITIONS = ["dealer", "smallBlind", "bigBlind", "player"];
export const PLAYER_POSITIONS_CONFIG = {
    player1: {
        sitPosition: {
            x: 830,
            y: 750,
        },
        betPosition: {
            x: 130,
            y: -130,
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
                    x: 190,
                    y: 60,
                },
                {
                    x: 330,
                    y: 60,
                },
            ]
        },
    },
    player2: {
        sitPosition: {
            x: 390,
            y: 550,
        },
        betPosition: {
            x: 170,
            y: 50,
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
                    x: 110,
                    y: -40,
                },
                {
                    x: 160,
                    y: -40,
                },
            ]
          },
    },
    player3: {
        sitPosition: {
            x: 550,
            y: 200,
        },
        betPosition: {
            x: 170,
            y: 90,
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
                    x: 110,
                    y: -20,
                },
                {
                    x: 160,
                    y: -20,
                },
            ]
          },
     },
    player4: {
        sitPosition: {
            x: 1380,
            y: 200,
        },
        betPosition: {
            x: -170,
            y: 90,
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
                    x: -160,
                    y: -20,
                },
                {
                    x: -110,
                    y: -20,
                },
            ]
          },
    },
    player5: {
        sitPosition: {
            x: 1530,
            y: 550,
        },
        betPosition: {
            x: -170,
            y: 50,
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
                    x: -160,
                    y: -40,
                },
                {
                    x: -110,
                    y: -40,
                },
            ]
          },
    }
}