import IPlayersCards from "./IPlayersCards";

export default interface IGameResultData {
    players: {
        playersCards: IPlayersCards,
      },
      game: {
        winnerPlayerId: string,
        winnerPlayerMoney: number,
        tableBets: number,
      },
  }