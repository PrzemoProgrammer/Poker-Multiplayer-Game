import PlayersStorage from "../storage/PlayersStorage";
import AudioManager from "../../../managers/AudioManager";
import IPlayersDataStorage from "../storage/interface/IPlayersDataStorage";
import IPlayersCards from "../../../interfaces/IPlayersCards";
import Player from "../player/Player";
import ColyseusClient from "../../../services/colyseus/ColyseusClient";
import { MAX_PLAYER_CARDS } from "../../config/gameConfig";
import { CROUPIER_CARD_DEAL_CONFIG } from "../../card/config/cardAnimsConfig";

class PlayersManager {

    public static addPlayer(player: Player) {
        PlayersStorage.addPlayer(player);
    }

    public static getPlayers(): IPlayersDataStorage {
        return PlayersStorage.getPlayers;
    }

    public static getPlayersCount(): number {
        const players = this.getPlayers();
        return Object.keys(players).length;
    }

    public static getPlayer(id: string) {
        return PlayersStorage.getPlayer(id);
    }

    public static updatePlayerMoneyText(playerId: string, players: IPlayersDataStorage, updateMoneyText: number) {
        players[playerId].updateMoneyText(updateMoneyText);
    }

    public static updatePlayerBet(playerId: string, players: IPlayersDataStorage, updateBet: number) {
        players[playerId].updateBets(updateBet);
        if (updateBet > 0) players[playerId].setBetVisible(true);
    }

    public static updatePlayerPosition(playerId: string, players: IPlayersDataStorage, updatedPosition: string) {
        players[playerId].updateGamePosition(updatedPosition);
    }

    public static checkDisplayDealerSign(playerId: string, players: IPlayersDataStorage, updatedPosition: string) {
        if (updatedPosition === "dealer") players[playerId].setDealerSignVisible(true);
    }

    public static async playDealCardsForPlayersAnim() {
        const players = this.getPlayers();
        const {
            nextAnimDelay,
            nextCardDeal,
            cardScale: { owner, other },
        } = CROUPIER_CARD_DEAL_CONFIG;
        const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

        for (let i = 0; i < MAX_PLAYER_CARDS; i++) {
            await delay(nextCardDeal);

            for (const playerId in players) {
                if (players.hasOwnProperty(playerId)) {
                    await delay(nextAnimDelay);
                    const scaleValue = ColyseusClient.isMyId(playerId) ? owner : other;
                    players[playerId].startDealCardsAnim(i, scaleValue);
                }
            }
        }
    }

    public static turnOverPlayersCardsAnim(drawCards: IPlayersCards, onlyYou: boolean) {
      const players = this.getPlayers();
      const myId = ColyseusClient.getMyId;
  
      const turnOverCardsForPlayer = (playerId: string) => {
          const symbols = drawCards[playerId];
          players[playerId].turnOverCards(symbols);
      };
  
      if (onlyYou) {
          turnOverCardsForPlayer(myId);
      } else {
          for (const playerId in players) {
              if (!ColyseusClient.isMyId(playerId)) {
                  turnOverCardsForPlayer(playerId);
              }
          }
      }
  }

  public static async startScaleUpCardsAnim(exceptMe: boolean){
    const players = this.getPlayers();
    const movePromises = []
    for (const playerId in players) {
        const player = players[playerId];
        if (ColyseusClient.isMyId(playerId) && exceptMe) continue
        const movePromise = player.startScaleUpCardsAnim();
        movePromises.push(movePromise)
    }
    await Promise.all(movePromises)
  }
  
    public static resetBets() {
        const players = this.getPlayers();
        for (const playerId in players) {
            const player = players[playerId];
            player.resetBet();
        }
    }

    public static deletePlayer(playerId: string) {
        AudioManager.playAudio("player_leave");
        const player = this.getPlayer(playerId);
        player.destroy();
        PlayersStorage.deletePlayer(playerId);
    }

    public static turnOffPlayersTimer() {
        const players = this.getPlayers();
        for (const playerId in players) {
            const player = players[playerId];
            player.turnOffTimer();
        }
    }

    public static setPlayerActionSignVisible(playerId: string, value: boolean) {
        const players = this.getPlayers();
        const player = players[playerId];
        player.setPlayerActionSignVisible(value);
    }

    public static setPlayersSignsVisible(value: boolean) {
        const players = this.getPlayers();
        for (const playerId in players) {
            this.setPlayerActionSignVisible(playerId, value);
        }
    }
}

export default PlayersManager
