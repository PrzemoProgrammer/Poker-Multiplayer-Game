import PlayersStorage from "../storage/PlayersStorage";
import AssetsManager from "../../../managers/AssetsManager";
import IPlayersDataStorage from "../storage/interface/IPlayersDataStorage";
import IPlayersCards from "../../../interfaces/IPlayersCards";
import Player from "../player/Player";
import ColyseusClient from "../../../services/colyseus/ColyseusClient";
import { MAX_PLAYER_CARDS } from "../../config/gameConfig";
import { CROUPIER_CARD_DEAL_CONFIG } from "../../card/config/cardAnimsConfig";

class PlayersManager {
    constructor() {}

    public addPlayer(player: Player) {
        PlayersStorage.addPlayer(player);
    }

    public getPlayers(): IPlayersDataStorage {
        return PlayersStorage.getPlayers;
    }

    public getPlayersCount(): number {
        const players = this.getPlayers();
        return Object.keys(players).length;
    }

    public getPlayer(id: string) {
        return PlayersStorage.getPlayer(id);
    }

    public updatePlayerMoneyText(playerId: string, players: IPlayersDataStorage, updateMoneyText: number) {
        players[playerId].updateMoneyText(updateMoneyText);
    }

    public updatePlayerBet(playerId: string, players: IPlayersDataStorage, updateBet: number) {
        players[playerId].updateBets(updateBet);
        if (updateBet > 0) players[playerId].setBetVisible(true);
    }

    public updatePlayerPosition(playerId: string, players: IPlayersDataStorage, updatedPosition: string) {
        players[playerId].updateGamePosition(updatedPosition);
    }

    public checkDisplayDealerSign(playerId: string, players: IPlayersDataStorage, updatedPosition: string) {
        if (updatedPosition === "dealer") players[playerId].setDealerSignVisible(true);
    }

    public async playDealCardsForPlayersAnim() {
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

    public turnOverPlayersCardsAnim(drawCards: IPlayersCards, onlyYou: boolean) {
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

  public async startScaleUpCardsAnim(exceptMe: boolean){
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
  
    public resetBets() {
        const players = this.getPlayers();
        for (const playerId in players) {
            const player = players[playerId];
            player.resetBet();
        }
    }

    public deletePlayer(playerId: string) {
        AssetsManager.playAudio("player_leave");
        const player = this.getPlayer(playerId);
        player.destroy();
        PlayersStorage.deletePlayer(playerId);
    }

    public turnOffPlayersTimer() {
        const players = this.getPlayers();
        for (const playerId in players) {
            const player = players[playerId];
            player.turnOffTimer();
        }
    }

    public setPlayerActionSignVisible(playerId: string, value: boolean) {
        const players = this.getPlayers();
        const player = players[playerId];
        player.setPlayerActionSignVisible(value);
    }

    public setPlayersSignsVisible(value: boolean) {
        const players = this.getPlayers();
        for (const playerId in players) {
            this.setPlayerActionSignVisible(playerId, value);
        }
    }
}

export default new PlayersManager();
