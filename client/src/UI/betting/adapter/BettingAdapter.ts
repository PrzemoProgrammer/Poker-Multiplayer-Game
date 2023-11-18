// bettingFactory.ts
import BettingFactory from "../factory/BettingFactory";
import DragObject from "../../../components/draggableObject/DraggableObject";
import Button from "../../../components/button/Button";

export default class BettingAdapter {
    private betting: BettingFactory | null

    constructor() {
        this.betting = null
    }

    public createBetting(): BettingFactory{
        return this.betting = new BettingFactory();
    }

    public get getBettingY(): number{
        return this.betting!.y
    }

    public get getBettingFactory(): BettingFactory{
        return this.betting!
    }

    public get getArrow(): DragObject | null{
        return this.betting!.arrow
    }

    public get getArrowYPosition(): number | undefined {
        const arrow = this.getArrow
        return arrow?.y;
    }

    public get getToggleButton(): Button | null{
        return this.betting!.toggleButton
    }

    public updateBetText(newText: number): void {
        this.betting!.betText?.updateMessage(newText);
    }

    public set setIsBettingOpen(updateValue: boolean) {
        this.betting!.isOpen = updateValue
    }

    public get isBettingOpen(): boolean {
        return this.betting!.isOpen;
    }

    public get getBetTextNumber(){
        return this.betting!.betText?.getTextInNumber
    }
}
