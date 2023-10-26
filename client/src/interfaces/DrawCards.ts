import Card from "./CardData";
export default interface DrawCards {
    [key: string]: {
        drawCards: {
            cards: Card[];
        };
    };
}