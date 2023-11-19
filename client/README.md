## Commands:

-   `npm run build` - starts build procedure
-   `npm run start` - start watching for files and open's server on localhost:8080
-   `npm run test` - run tests
-   `npm run code-coverage` - generate code coverage report
-   `npm run code-style-check` - run's eslint and prettier check on your code

## Highlights

-   🔰 - Beginner friendly.
-   🚀 - Blazing fast bundle times ( by using [swc](https://github.com/swc-project/swc) for transpiling )
-   🛠 - Typescript + swc
-   ✈️ - Live reload.
-   📝 - Consistent code style using Prettier and Eslint
-   📝 - Unit test support with [Jest](https://jestjs.io/), generating code coverage.

```
src
├─ abstraction
│  ├─ BaseEntity.ts
│  └─ BaseScene.ts
├─ actions
│  └─ CreateComponent.ts
├─ assets
│  ├─ audio
│  └─ images
├─ components
│  ├─ button
│  │  ├─ Button.ts
│  │  └─ interface
│  │     └─ IButtonConfig.ts
│  ├─ draggableObject
│  │  └─ DraggableObject.ts
│  ├─ loadingScreen
│  │  ├─ interface
│  │  │  └─ ILoadingScreenConfig.ts
│  │  └─ LoadingScreen.ts
│  ├─ progressBar
│  │  ├─ interface
│  │  │  └─ IProgressBarConfig.ts
│  │  └─ ProgressBar.ts
│  ├─ sprite
│  │  ├─ interface
│  │  │  ├─ IDefaultSpriteConfig.ts
│  │  │  ├─ ISpriteConfig.ts
│  │  │  └─ ISpriteConfigBase.ts
│  │  └─ Sprite.ts
│  ├─ text
│  │  ├─ interface
│  │  │  └─ ITextConfig.ts
│  │  └─ Text.ts
│  └─ textInput
│     ├─ interface
│     │  └─ ITextInputConfig.ts
│     └─ TextInput.ts
├─ config
│  ├─ assetsConfig.ts
│  ├─ config.ts
│  ├─ loadingScreenConfig.ts
│  └─ loginScreenConfig.ts
├─ game
│  ├─ bet
│  │  ├─ Bet.ts
│  │  └─ interface
│  │     └─ IBetConfig.ts
│  ├─ card
│  │  ├─ Card.ts
│  │  └─ config
│  │     └─ cardAnimsConfig.ts
│  ├─ config
│  │  └─ gameConfig.ts
│  ├─ interface
│  │  ├─ IPlayerGamePositions.ts
│  │  └─ IPlayerPositionsConfig.ts
│  ├─ manager
│  │  └─ PlayerSitPositionManager.ts
│  ├─ players
│  │  ├─ interface
│  │  │  └─ IPlayersConfig.ts
│  │  ├─ manager
│  │  │  └─ PlayersManager.ts
│  │  ├─ player
│  │  │  ├─ cards
│  │  │  │  └─ PlayerCards.ts
│  │  │  ├─ config
│  │  │  │  └─ playerConfig.ts
│  │  │  ├─ factory
│  │  │  │  └─ PlayerFactory.ts
│  │  │  ├─ interface
│  │  │  │  └─ IPlayerConfig.ts
│  │  │  ├─ Player.ts
│  │  │  └─ timer
│  │  │     ├─ interface
│  │  │     │  └─ ITimerConfig.ts
│  │  │     └─ Timer.ts
│  │  └─ storage
│  │     ├─ interface
│  │     │  └─ IPlayersDataStorage.ts
│  │     └─ PlayersStorage.ts
│  └─ table
│     ├─ adapter
│     │  └─ TableAdapter.ts
│     ├─ cards
│     │  ├─ config
│     │  │  └─ tableCardsConfig.ts
│     │  ├─ interface
│     │  │  └─ ITableCardsConfig.ts
│     │  └─ TableCards.ts
│     ├─ config
│     │  └─ tableConfig.ts
│     ├─ factory
│     │  └─ TableFactory.ts
│     ├─ interface
│     │  └─ ITableConfig.ts
│     └─ manager
│        └─ TableManager.ts
├─ gameSignals
│  └─ GameSignals.ts
├─ index.ts
├─ interfaces
│  ├─ IAllPlayerJoinedServerData.ts
│  ├─ ICardData.ts
│  ├─ IGameResultData.ts
│  ├─ ILoginScreenConfig.ts
│  ├─ INextRoundData.ts
│  ├─ IPlayersBets.ts
│  ├─ IPlayersCards.ts
│  ├─ IPlayersMoney.ts
│  ├─ IPlayerTurnAction.ts
│  ├─ IPlayerTurnData.ts
│  ├─ IServerPlayerData.ts
│  └─ IUpdatePlayerTurnAction.ts
├─ managers
│  ├─ AudioManager.ts
│  ├─ GameManager.ts
│  ├─ ImageManager.ts
│  └─ SceneManager.ts
├─ README.md
├─ scenes
│  ├─ BootScene.ts
│  ├─ LoginScene.ts
│  ├─ PlayScene.ts
│  ├─ PreloadScene.ts
│  └─ SetupGameScene.ts
├─ services
│  ├─ colyseus
│  │  └─ ColyseusClient.ts
│  ├─ config.ts
│  └─ requests
│     ├─ config
│     │  └─ config.ts
│     ├─ helper
│     │  └─ helper.ts
│     └─ requests.ts
├─ storage
│  ├─ AudioStorage.ts
│  ├─ GameStorage.ts
│  ├─ ImageStorage.ts
│  └─ SceneStorage.ts
├─ style.css
├─ UI
│  ├─ betting
│  │  ├─ adapter
│  │  │  └─ BettingAdapter.ts
│  │  ├─ config
│  │  │  └─ bettingConfig.ts
│  │  ├─ factory
│  │  │  └─ BettingFactory.ts
│  │  ├─ interface
│  │  │  └─ IBettingConfig.ts
│  │  └─ manager
│  │     └─ BettingManager.ts
│  └─ pokerBar
│     ├─ adapter
│     │  └─ PokerBarAdapter.ts
│     ├─ config
│     │  └─ pokerBarConfig.ts
│     ├─ factory
│     │  └─ PokerBarFactory.ts
│     ├─ interface
│     │  └─ IPokerBarConfig.ts
│     └─ manager
│        └─ PokerBarManager.ts
└─ utility
   └─ screen
      └─ ScreenUtils.ts

```
