import BettingView from "../view/BettingView";
import DragObject from "../../../components/draggableObject/DraggableObject";
import Button from "../../../components/button/Button";

export default class BettingAdapter {
    private betting: BettingView | null

    constructor() {
        this.betting = null
    }

    public createBetting(): BettingView{
        return this.betting = new BettingView();
    }

    public get getBettingY(): number{
        return this.betting!.y
    }

    public get getBettingView(): BettingView{
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
