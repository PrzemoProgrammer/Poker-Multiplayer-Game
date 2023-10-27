import DrawCards from "../interfaces/DrawCards";
import PlayerBets from "../interfaces/PlayerBets";
import PlayersMoney from "../interfaces/PlayersMoney";
import PlayersTurn from "../interfaces/PlayersTurn";
import PlayerGamePositions from "../interfaces/PlayerGamePositions";

export default interface ServerGameUpdateOnStart {
    playersGamePositions: PlayerGamePositions;
    playersBets: PlayerBets;
    playersMoney: PlayersMoney
    playersTurn: PlayersTurn,
    drawCards: DrawCards
}