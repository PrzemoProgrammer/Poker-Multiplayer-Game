import IPlayersCards from "./IPlayersCards";
import IPlayersBets from "./IPlayersBets";
import IPlayersChips from "./IPlayersChips";
import IPlayersMoney from "./IPlayersMoney";
import IPlayerTurnData from "./IPlayerTurnData";
import IPlayerGamePositions from "../game/interface/IPlayerGamePositions";

export default interface IServerGameUpdateOnStart {
    players: {
        playersGamePositions: IPlayerGamePositions;
        playersBets: IPlayersBets;
        playersChips: IPlayersChips
        drawCards: IPlayersCards
        playersMoney: IPlayersMoney
    },
    game: {
        playerTurnData: IPlayerTurnData
    }
}