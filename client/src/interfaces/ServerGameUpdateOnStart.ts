import DrawCards from "../interfaces/DrawCards";
import PlayerBets from "../interfaces/PlayerBets";
import PlayerGamePositions from "../interfaces/PlayerGamePositions";

export default interface ServerGameUpdateOnStart {
    playersGamePositions: PlayerGamePositions;
    playersBets: PlayerBets;
    drawCards: DrawCards
}