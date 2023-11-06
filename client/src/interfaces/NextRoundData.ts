import CardData from "./CardData";
import PlayerTurnData from "./PlayerTurnData";

export default interface NextRoundData {
    game: {
        tableBets: number,
        tableCards: CardData[],
        playerTurnData: PlayerTurnData
      },
  }

