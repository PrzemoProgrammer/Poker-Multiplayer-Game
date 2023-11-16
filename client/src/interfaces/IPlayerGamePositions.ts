import {GAME_POSITIONS} from "../game/config/gameConfig";
const [dealer, smallBlind, bigBlind, player] = GAME_POSITIONS

export default interface IPlayerGamePositions {
    [playerId: string]: {
        position: typeof player | typeof bigBlind | typeof smallBlind | typeof dealer;
    };
}