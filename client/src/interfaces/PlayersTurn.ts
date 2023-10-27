export default interface PlayersTurn {
    [playerId: string]: {
        turn: boolean;
    };
}