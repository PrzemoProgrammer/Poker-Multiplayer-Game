export default interface PlayerGamePositions {
    [playerId: string]: {
        position: "player" | "bigBlind" | "smallBlind" | "dealer";
    };
}