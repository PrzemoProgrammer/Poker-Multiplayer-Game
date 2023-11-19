## Commands:

- `npm run start` - starts code

Project structure:

```md
server
├─ .env
├─ Colyseus
│ ├─ GameRoom.js
│ └─ PlayerState.js
├─ config.js
├─ controllers
│ ├─ authentication.js
│ ├─ index.js
│ └─ registration.js
├─ dataHasher
│ ├─ config.js
│ └─ PasswordHasher.js
├─ game
│ ├─ card
│ │ └─ config
│ │ └─ cardConfig.js
│ ├─ config
│ │ └─ gameConfig.js
│ ├─ croupier
│ │ ├─ manager
│ │ │ └─ CroupierCardsManager.js
│ │ └─ storage
│ │ └─ CroupierCardsStorage.js
│ ├─ gameTurn
│ │ └─ GameTurnTimer.js
│ ├─ manager
│ │ └─ GameManager.js
│ ├─ players
│ │ ├─ bet
│ │ │ └─ manager
│ │ │ └─ PlayersBetManager.js
│ │ ├─ cards
│ │ │ └─ manager
│ │ │ └─ PlayersCardsManager.js
│ │ ├─ gamePosition
│ │ │ └─ manager
│ │ │ └─ PlayersGamePositionManager.js
│ │ ├─ manager
│ │ │ └─ PlayersManager.js
│ │ ├─ money
│ │ │ └─ manager
│ │ │ └─ PlayersMoneyManager.js
│ │ ├─ player
│ │ │ └─ Player.js
│ │ ├─ sitPosition
│ │ │ └─ manager
│ │ │ └─ PlayersSitPositionManager.js
│ │ ├─ storage
│ │ │ └─ PlayersStorage.js
│ │ └─ turn
│ │ └─ manager
│ │ └─ PlayersTurnManager.js
│ ├─ round
│ │ ├─ manager
│ │ │ └─ RoundNameManager.js
│ │ └─ storage
│ │ └─ RoundNameStorage.js
│ ├─ storage
│ │ ├─ CurrentPlayerTurnStorage.js
│ │ └─ PlayersSitPositionsStorage.js
│ ├─ table
│ │ ├─ bets
│ │ │ ├─ manager
│ │ │ │ └─ TableBetsManager.js
│ │ │ └─ storage
│ │ │ └─ TableBetsStorage.js
│ │ └─ cards
│ │ ├─ manager
│ │ │ └─ TableCardsManager.js
│ │ └─ storage
│ │ └─ TableCardsStorage.js
│ └─ utility
│ └─ PokerHandChecker.js
├─ index.html
├─ index.js
├─ JWT
│ └─ JWTManager.js
├─ main.js
├─ MongoDB
│ ├─ credentials.js
│ ├─ DatabaseManager.js
│ └─ models
│ └─ Player.js
├─ package-lock.json
├─ package.json
├─ Procfile
├─ README.md
├─ TODO.todo
└─ webpack.config.js
```
