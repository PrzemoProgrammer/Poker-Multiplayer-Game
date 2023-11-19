import {GAME_POSITIONS} from "../config/gameConfig";
const [dealer, smallBlind, bigBlind, player] = GAME_POSITIONS

export default interface IPlayerGamePositions {
    [playerId: string]: {
        position: typeof player | typeof bigBlind | typeof smallBlind | typeof dealer;
    };
}