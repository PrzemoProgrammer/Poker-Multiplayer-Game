export default interface PlayerBets {
    [playerId: string]: {
        bet: number;
        money: number;
    };
}