// bettingFactory.ts
import BettingFactory from "../factory/BettingFactory";

class BettingFactoryAdapter {
    private betting: BettingFactory;

    constructor() {
        this.betting = new BettingFactory();
    }

    public getArrowYPosition(): number | undefined {
        return this.betting.arrow?.y;
    }

    public updateBetText(newText: number): void {
        this.betting.betText?.updateMessage(newText);
    }

    public initDragEvent(callback: () => void): void {
        this.betting.arrow?.initEvents(callback);
    }

    // Add other methods as needed

    get isOpen(): boolean {
        return this.betting.isOpen;
    }

    set isOpen(value: boolean) {
        this.betting.isOpen = value;
    }

    public startSlideAnimation(config: { duration: number; ease: any; shiftY: number }): void {
        const { duration, ease, shiftY } = config;
        const direction = this.isOpen ? 1 : -1;

        gsap.to(this.betting, {
            y: this.betting.y + shiftY * direction,
            duration,
            ease,
        });
    }

    public getBetValueNumber(): number | undefined {
        return this.betting.betText?.getTextInNumber;
    }
}

export default BettingFactoryAdapter;
