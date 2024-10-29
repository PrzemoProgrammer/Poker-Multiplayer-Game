
<img align="right" alt="coding" src="https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX16586411.jpg" width="350" height="auto">
***This project is not fully open source code, I am not allowed to share everything***

# Poker Texas Hold'em - Online Game

-- CLIETN:-------
* 𝗣𝗶𝘅𝗶.𝗷𝘀 7.4
* 𝗥𝗲𝗮𝗰𝘁.𝗷𝘀 18.2
* 𝗷𝘄𝘁-𝗮𝘂𝘁𝗵𝗲𝗻𝘁𝗶𝗰𝗮𝘁𝗶𝗼𝗻: registration and login
* 𝐇𝐨𝐰𝐥𝐞𝐫 for audio
* 𝗚𝘀𝗮𝗽 for animations

-- SERVER:-------
* 𝗡𝗼𝗱𝗲.𝗷𝘀
* 𝗘𝘅𝗽𝗿𝗲𝘀𝘀.𝗷𝘀
* 𝗦𝗼𝗰𝗸𝗲𝘁.𝗶𝗼
* 𝗠𝗼𝗻𝗴𝗼𝗱𝗯 
* 𝐌𝐢𝐧𝐢-𝐒𝐢𝐠𝐧𝐚𝐥𝐬


𝐕𝐢𝐝𝐞𝐨




# CODE STRUCTURE

```
src
├─ App.css
├─ App.jsx
├─ components
│  ├─ closeButton
│  │  ├─ CloseButton.jsx
│  │  └─ CSS
│  │     └─ CloseButton.css
│  ├─ textureButton
│  │  ├─ CSS
│  │  │  └─ TextureButton.css
│  │  └─ TextureButton.jsx
│  └─ UISvgButton
│     ├─ CSS
│     │  └─ UISvgButton.css
│     └─ UISvgButton.jsx
├─ componentsContextRefs
│  └─ ComponentsContextRefsStorage.js
├─ config
│  ├─ assetsConfig.js
│  └─ screenConfig.js
├─ game
│  ├─ abstraction
│  │  └─ BaseScene.js
│  ├─ components
│  │  ├─ Button.js
│  │  ├─ Container.js
│  │  ├─ ProgressBar.js
│  │  ├─ Sprite.js
│  │  └─ Text.js
│  ├─ config
│  │  └─ gameConfig.js
│  ├─ CSS
│  │  └─ Game.css
│  ├─ game
│  │  ├─ bet
│  │  │  ├─ Bet.ts
│  │  │  └─ interface
│  │  │     └─ IBetConfig.ts
│  │  ├─ card
│  │  │  ├─ Card.ts
│  │  │  └─ config
│  │  │     └─ cardAnimsConfig.ts
│  │  ├─ config
│  │  │  └─ gameConfig.ts
│  │  ├─ interface
│  │  │  ├─ IPlayerGamePositions.ts
│  │  │  └─ IPlayerPositionsConfig.ts
│  │  ├─ players
│  │  │  ├─ interface
│  │  │  │  └─ IPlayersConfig.ts
│  │  │  ├─ manager
│  │  │  │  └─ PlayersManager.ts
│  │  │  ├─ player
│  │  │  │  ├─ cards
│  │  │  │  │  └─ PlayerCards.ts
│  │  │  │  ├─ config
│  │  │  │  │  └─ playerConfig.ts
│  │  │  │  ├─ interface
│  │  │  │  │  └─ IPlayerConfig.ts
│  │  │  │  ├─ moneyText
│  │  │  │  │  └─ MoneyText.ts
│  │  │  │  ├─ Player.ts
│  │  │  │  ├─ timer
│  │  │  │  │  ├─ interface
│  │  │  │  │  │  └─ ITimerConfig.ts
│  │  │  │  │  └─ Timer.ts
│  │  │  │  └─ view
│  │  │  │     └─ PlayerView.ts
│  │  │  └─ storage
│  │  │     ├─ interface
│  │  │     │  └─ IPlayersDataStorage.ts
│  │  │     └─ PlayersStorage.ts
│  │  └─ table
│  │     ├─ adapter
│  │     │  └─ TableAdapter.ts
│  │     ├─ bets
│  │     │  └─ config
│  │     │     └─ tableBetsConfig.ts
│  │     ├─ cards
│  │     │  ├─ config
│  │     │  │  └─ tableCardsConfig.ts
│  │     │  ├─ interface
│  │     │  │  └─ ITableCardsConfig.ts
│  │     │  └─ TableCards.ts
│  │     ├─ config
│  │     │  └─ tableConfig.ts
│  │     ├─ interface
│  │     │  └─ ITableConfig.ts
│  │     ├─ manager
│  │     │  └─ TableManager.ts
│  │     └─ view
│  │        └─ TableView.ts
│  ├─ main.js
│  ├─ manager
│  │  ├─ GameManager.ts
│  │  └─ PlayerSitPositionManager.ts
│  ├─ PixiGame.jsx
│  ├─ scenes
│  │  ├─ Background.js
│  │  ├─ Game.ts
│  │  └─ Preload.js
│  └─ StartGame.js
├─ gameSignals
│  └─ GameSignals.js
├─ index.css
├─ interfaces
│  ├─ IAllPlayerJoinedServerData.ts
│  ├─ ICardData.ts
│  ├─ IGameResultData.ts
│  ├─ ILoginScreenConfig.ts
│  ├─ INextRoundData.ts
│  ├─ IPlayersBets.ts
│  ├─ IPlayersCards.ts
│  ├─ IPlayersChips.ts
│  ├─ IPlayersMoney.ts
│  ├─ IPlayerTurnAction.ts
│  ├─ IPlayerTurnData.ts
│  ├─ IRegisterScreenConfig.ts
│  ├─ IServerPlayerData.ts
│  └─ IUpdatePlayerTurnAction.ts
├─ main.jsx
├─ managers
│  ├─ AppManager.js
│  ├─ AudioManager.js
│  ├─ ImageManager.js
│  └─ SceneManager.js
├─ pages
│  ├─ background
│  │  ├─ Background.jsx
│  │  └─ CSS
│  │     └─ Background.css
│  ├─ CSS
│  │  └─ Pages.css
│  ├─ loadingGame
│  │  ├─ CSS
│  │  │  └─ LoadingGame.css
│  │  └─ LoadingGame.jsx
│  ├─ loadingScreen
│  │  ├─ CSS
│  │  │  └─ LoadingScreen.css
│  │  └─ LoadingScreen.jsx
│  ├─ lobby
│  │  ├─ buyInWindow
│  │  │  ├─ BuyInWindow.jsx
│  │  │  └─ CSS
│  │  │     └─ BuyInWindow.css
│  │  ├─ CSS
│  │  │  └─ LobbyScreen.css
│  │  ├─ informationWindow
│  │  │  ├─ CSS
│  │  │  │  └─ InformationWindow.css
│  │  │  └─ InformationWindow.jsx
│  │  └─ LobbyScreen.jsx
│  ├─ loginScreen
│  │  ├─ CSS
│  │  │  └─ LoginScreen.css
│  │  └─ LoginScreen.jsx
│  ├─ manager
│  │  └─ PagesManager.js
│  ├─ Pages.jsx
│  └─ rooms
│     ├─ CSS
│     │  └─ RoomsScreen.css
│     └─ RoomsScreen.jsx
├─ services
│  ├─ config.ts
│  ├─ requests
│  │  ├─ config
│  │  │  └─ config.ts
│  │  ├─ helper
│  │  │  └─ helper.ts
│  │  └─ requests.ts
│  └─ webSocket
│     └─ SocketClient.ts
├─ storage
│  ├─ AppStorage.js
│  ├─ AudioStorage.js
│  ├─ ImageStorage.js
│  └─ SceneStorage.js
├─ UI
│  ├─ bottomBar
│  │  ├─ BottomBar.jsx
│  │  ├─ chat
│  │  │  ├─ Chat.jsx
│  │  │  └─ CSS
│  │  │     └─ Chat.css
│  │  └─ CSS
│  │     └─ BottomBar.css
│  ├─ CSS
│  │  └─ UI.css
│  ├─ manager
│  │  └─ UIManager.js
│  ├─ middleBar
│  │  ├─ bettingButtons
│  │  │  ├─ BettingPanel.jsx
│  │  │  └─ CSS
│  │  │     └─ BettingPanel.css
│  │  ├─ buttonsChannel
│  │  │  ├─ ButtonsChannel.jsx
│  │  │  └─ CSS
│  │  │     └─ ButtonsChannel.css
│  │  ├─ channels
│  │  │  ├─ Channels.jsx
│  │  │  └─ CSS
│  │  │     └─ Channels.css
│  │  ├─ CSS
│  │  │  └─ MiddleBar.css
│  │  └─ MiddleBar.jsx
│  ├─ topBar
│  │  ├─ CSS
│  │  │  └─ TopBar.css
│  │  └─ TopBar.jsx
│  └─ UI.jsx
└─ utility
   ├─ formatNumber.js
   ├─ screen
   │  ├─ checkIsPortraitOrientation.js
   │  └─ ScreenUtils.js
   └─ unformatNumber.js

```
