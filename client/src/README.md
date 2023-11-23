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
│  ├─ loginScreenConfig.ts
│  └─ registerScreenConfig.ts
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
│  │  │  ├─ interface
│  │  │  │  └─ IPlayerConfig.ts
│  │  │  ├─ Player.ts
│  │  │  ├─ timer
│  │  │  │  ├─ interface
│  │  │  │  │  └─ ITimerConfig.ts
│  │  │  │  └─ Timer.ts
│  │  │  └─ view
│  │  │     └─ PlayerView.ts
│  │  └─ storage
│  │     ├─ interface
│  │     │  └─ IPlayersDataStorage.ts
│  │     └─ PlayersStorage.ts
│  └─ table
│     ├─ adapter
│     │  └─ TableAdapter.ts
│     ├─ bets
│     │  └─ config
│     │     └─ tableBetsConfig.ts
│     ├─ cards
│     │  ├─ config
│     │  │  └─ tableCardsConfig.ts
│     │  ├─ interface
│     │  │  └─ ITableCardsConfig.ts
│     │  └─ TableCards.ts
│     ├─ config
│     │  └─ tableConfig.ts
│     ├─ interface
│     │  └─ ITableConfig.ts
│     ├─ manager
│     │  └─ TableManager.ts
│     └─ view
│        └─ TableView.ts
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
│  ├─ IRegisterScreenConfig.ts
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
│  ├─ RegisterScene.ts
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
│  │  ├─ interface
│  │  │  └─ IBettingConfig.ts
│  │  ├─ manager
│  │  │  └─ BettingManager.ts
│  │  └─ view
│  │     └─ BettingView.ts
│  └─ pokerBar
│     ├─ adapter
│     │  └─ PokerBarAdapter.ts
│     ├─ config
│     │  └─ pokerBarConfig.ts
│     ├─ interface
│     │  └─ IPokerBarConfig.ts
│     ├─ manager
│     │  └─ PokerBarManager.ts
│     └─ view
│        └─ PokerBarView.ts
├─ utility
│  └─ screen
│     └─ ScreenUtils.ts
└─ view
   ├─ LoginSceneView.ts
   └─ RegisterScreenView.ts

```
