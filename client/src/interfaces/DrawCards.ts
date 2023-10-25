import Card from "./Card";
export default interface DrawCards {
    [key: string]: {
        drawCards: {
            cards: Card[];
        };
    };
}