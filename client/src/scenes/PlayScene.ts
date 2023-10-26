import * as PIXI from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from "../config/gameConfig";
import { TURN_OVER_CARD_DELAY } from "../config/cardAnimationConfig";
import spritesConfig from "../../assets/spritesConfig.json";
import CreateComponent from "../components/CreateComponent";
import SpriteConfig from "../interfaces/SpriteConfig";
import sceneManager from "../utility/SceneManager";
import Player from "../components/players/Player";
import ColyseusClient from "../services/colyseus/ColyseusClient";
import BaseScene from "../abstraction/BaseScene";
import GameSignals from "../gameSignals/GameSignals";
import ServerPlayerData from "../interfaces/ServerPlayerData";
import playersManager from "../utility/PlayersManager";
import PLAYER_CONFIG from "../config/playerConfig";
import PlayersConfig from "../interfaces/PlayersConfig";
import ServerGameUpdateOnStart from "../interfaces/ServerGameUpdateOnStart";
import UiInterfaceManager from "../utility/UiInterfaceManager";
import SitPositionManager from "../utility/SitPositionManager";
import GameManager from "../utility/GameManager";
import PlayersManager from "../utility/PlayersManager";

class PlayScene extends BaseScene {
    constructor() {
        super("PlayScene");
    }

    get gw() {
        return GAME_WIDTH;
    }
    get gh() {
        return GAME_HEIGHT;
    }

    init() {
        this.createComponents();
        this.createUiInterface();

        this.bindSignals();
        this.startSetupGameScene();
    }

    updateGame() {
        // sceneManager.game.ticker.add((delta) => {
        //   if (this.isPaused) return;
        // })
    }

    bindSignals(): void {
        GameSignals.onPlayerJoined.add((playerData: ServerPlayerData) => this.addPlayerToGame(playerData));
        GameSignals.onGetPlayers.add((playerData: PlayersConfig) => this.addPlayersToGame(playerData));
        GameSignals.onStartGameData.add((startGameData: ServerGameUpdateOnStart) =>
            this.updateGameOnStart(startGameData),
        );
    }

    addPlayerToGame(playerData: ServerPlayerData) {
        SitPositionManager.setupConfigPositions(playerData.sit);
        if (ColyseusClient.isMyId(playerData.id)) return;
        this.createPlayerAndAddToGame(playerData);
    }

    addPlayersToGame(playersData: PlayersConfig) {
        for (const playerId in playersData) {
            const playerData = playersData[playerId];
            this.createPlayerAndAddToGame(playerData);

            if (ColyseusClient.isMyId(playerData.id)) GameManager.updateInterfaceMoneyText(playerData.money);
        }
    }

    async updateGameOnStart(startGameData: ServerGameUpdateOnStart) {
        const players = playersManager.getPlayers();
        const {drawCards, playersBets, playersGamePositions } = startGameData;

        for (const playerId in players) {
            GameManager.updateGameOnStart(playerId, players, playersBets, playersGamePositions);
        }

        await PlayersManager.playDealCardsForPlayersAnim();
        setTimeout(() => {
            playersManager.turnOverPlayerCardsAnim(drawCards, true);
        }, TURN_OVER_CARD_DELAY);
    }

    createPlayerAndAddToGame(playerData: ServerPlayerData) {
        const player = this.createPlayer(playerData);
        playersManager.addPlayer(player);
    }

    createComponents() {
        for (let spriteConfig in spritesConfig) {
            const spriteData: SpriteConfig = spritesConfig[spriteConfig as keyof typeof spritesConfig];
            const sprite = CreateComponent.create(spriteData);
            if (sprite !== null) this.addChild(sprite);
        }
    }

    createPlayer(playerData: ServerPlayerData): Player {
        const { id, money, nick, sit, bet, position } = playerData;
        const { sitPosition, betPosition, cardsPositions } = SitPositionManager.getConfigPositions(sit);
        const config = { ...PLAYER_CONFIG };
        config.x = sitPosition.x;
        config.y = sitPosition.y;
        config.bet.x = betPosition.x;
        config.bet.y = betPosition.y;
        config.id = id;
        config.sit = sit;
        config.bet.text.message = bet;
        config.position = position;
        config.nickname.message = nick;
        config.money.message = money;
        config.cardsAnimPositions.animStartPosition = cardsPositions.dealAnimStartPositions;
        config.cardsAnimPositions.animEndPosition = cardsPositions.dealAnimEndPositions;
        for (let i = 0; i < cardsPositions.dealAnimEndPositions.length; i++) {
            config.cards[i].x = cardsPositions.dealAnimEndPositions[i].x;
            config.cards[i].y = cardsPositions.dealAnimEndPositions[i].y;
        }

        const player = new Player(config);
        if (player !== null) this.addChild(player);

        return player;
    }

    startSetupGameScene() {
        sceneManager.startScene("SetupGameScene");
    }

    createUiInterface() {
        UiInterfaceManager.createInterface(this);
    }
}

export default new PlayScene();
