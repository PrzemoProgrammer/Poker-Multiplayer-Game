Project structure:

| index.ts
| style.css
|  
+---abstraction
| BaseEntity.ts
| BaseScene.ts
|  
+---actions
| CreateComponent.ts
|  
+---assets
| +---audio
| \---images
+---components
| +---button
| | | Button.ts
| | |  
| | \---interface
| | IButtonConfig.ts
| |  
| +---draggableObject
| | DraggableObject.ts
| |  
| +---loadingScreen
| | | LoadingScreen.ts
| | |  
| | \---interface
| | ILoadingScreenConfig.ts
| |  
| +---progressBar
| | | ProgressBar.ts
| | |  
| | \---interface
| | IProgressBarConfig.ts
| |  
| +---sprite
| | | Sprite.ts
| | |  
| | \---interface
| | IDefaultSpriteConfig.ts
| | ISpriteConfig.ts
| | ISpriteConfigBase.ts
| |  
| +---text
| | | Text.ts
| | |  
| | \---interface
| | ITextConfig.ts
| |  
| \---textInput
| | TextInput.ts
| |  
| \---interface
| ITextInputConfig.ts
|  
+---config
| assetsConfig.ts
| config.ts
| loadingScreenConfig.ts
| loginScreenConfig.ts
|  
+---game
| +---bet
| | | Bet.ts
| | |  
| | \---interface
| | IBetConfig.ts
| |  
| +---card
| | | Card.ts
| | |  
| | \---config
| | cardAnimsConfig.ts
| |  
| +---config
| | gameConfig.ts
| |  
| +---interface
| | IPlayerGamePositions.ts
| | IPlayerPositionsConfig.ts
| |  
| +---manager
| | PlayerSitPositionManager.ts
| |  
| +---players
| | +---interface
| | | IPlayersConfig.ts
| | |  
| | +---manager
| | | PlayersManager.ts
| | |  
| | +---player
| | | | Player.ts
| | | |  
| | | +---cards
| | | | PlayerCards.ts
| | | |  
| | | +---config
| | | | playerConfig.ts
| | | |  
| | | +---factory
| | | | PlayerFactory.ts
| | | |  
| | | +---interface
| | | | IPlayerConfig.ts
| | | |  
| | | \---timer
| | | | Timer.ts
| | | |  
| | | \---interface
| | | ITimerConfig.ts
| | |  
| | \---storage
| | | PlayersStorage.ts
| | |  
| | \---interface
| | IPlayersDataStorage.ts
| |  
| \---table
| +---adapter
| | TableAdapter.ts
| |  
| +---cards
| | | TableCards.ts
| | |  
| | +---config
| | | tableCardsConfig.ts
| | |  
| | \---interface
| | ITableCardsConfig.ts
| |  
| +---config
| | tableConfig.ts
| |  
| +---factory
| | TableFactory.ts
| |  
| +---interface
| | ITableConfig.ts
| |  
| \---manager
| TableManager.ts
|  
+---gameSignals
| GameSignals.ts
|  
+---interfaces
| IAllPlayerJoinedServerData.ts
| ICardData.ts
| IGameResultData.ts
| ILoginScreenConfig.ts
| INextRoundData.ts
| IPlayersBets.ts
| IPlayersCards.ts
| IPlayersMoney.ts
| IPlayerTurnAction.ts
| IPlayerTurnData.ts
| IServerPlayerData.ts
| IUpdatePlayerTurnAction.ts
|  
+---managers
| AudioManager.ts
| GameManager.ts
| ImageManager.ts
| SceneManager.ts
|  
+---scenes
| BootScene.ts
| LoginScene.ts
| PlayScene.ts
| PreloadScene.ts
| SetupGameScene.ts
|  
+---services
| | config.ts
| |  
| +---colyseus
| | ColyseusClient.ts
| |  
| \---requests
| | requests.ts
| |  
| +---config
| | config.ts
| |  
| \---helper
| helper.ts
|  
+---storage
| AudioStorage.ts
| GameStorage.ts
| ImageStorage.ts
| SceneStorage.ts
|  
+---UI
| +---betting
| | +---adapter
| | | BettingAdapter.ts
| | |  
| | +---config
| | | bettingConfig.ts
| | |  
| | +---factory
| | | BettingFactory.ts
| | |  
| | +---interface
| | | IBettingConfig.ts
| | |  
| | \---manager
| | BettingManager.ts
| |  
| \---pokerBar
| +---adapter
| | PokerBarAdapter.ts
| |  
| +---config
| | pokerBarConfig.ts
| |  
| +---factory
| | PokerBarFactory.ts
| |  
| +---interface
| | IPokerBarConfig.ts
| |  
| \---manager
| PokerBarManager.ts
|  
\---utility
\---screen
ScreenUtils.ts