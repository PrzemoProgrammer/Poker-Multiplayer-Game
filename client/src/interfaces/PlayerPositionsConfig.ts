
  export default interface PlayerPositionsConfig {
        sitPosition: {
            x: number,
            y: number,
        },
        betPosition: {
            x: number,
            y: number,
        },
        cardsPositions: {
            dealAnimStartPositions: {x: number, y: number}[],
            dealAnimEndPositions:{x: number, y: number}[],
        }
}