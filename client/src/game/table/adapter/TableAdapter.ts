import TableView from "../view/TableView";
import TableCards from "../cards/TableCards";
import Bet from "../../bet/Bet";

export default  class TableAdapter {
    table: TableView | null
    constructor() {
        this.table = null
    }

    public createTable(): TableView{
        return this.table = new TableView()
    }

    public get getCards(): TableCards{
        return this.table!.cards
    }

    public get getTotalBetsText(): Bet{
        return this.table!.totalBets
    }

    public updateTotalBetsText(updatedText: string | number){
        this.table!.totalBets.updateText(updatedText)
    }

    public setTotalBetsVisible(value: boolean){
        this.table!.totalBets.setVisible(value)
    }

  }