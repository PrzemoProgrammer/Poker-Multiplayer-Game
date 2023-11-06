import DrawCards from "../interfaces/DrawCards";
import PlayerBets from "../interfaces/PlayerBets";
import PlayersMoney from "../interfaces/PlayersMoney";
import PlayerTurnData from "../interfaces/PlayerTurnData";
import PlayerGamePositions from "../interfaces/PlayerGamePositions";

export default interface ServerGameUpdateOnStart {
    players: {
        playersGamePositions: PlayerGamePositions;
        playersBets: PlayerBets;
        playersMoney: PlayersMoney
        drawCards: DrawCards
    },
    game: {
        playerTurnData: PlayerTurnData
    }
}