import Table from "../../components/table/Table";
import BaseScene from "../../abstraction/BaseScene";
import TableFactory from "../factory/TableFactory";
import CardData from "../../interfaces/CardData";


class TableManager {
    table: Table | null
    constructor() {
        this.table = null
    }

    public createTable(scene: BaseScene){
     this.table = TableFactory.createTable(scene)
    }

    public async layOutCards(cardsSymbols: CardData[]){
        await this.table?.layOutCards(cardsSymbols)
    }

    public updateTotalBetsText(updatedText: string | number){
        this.table?.updateTotalBets(updatedText)
    }
  }
  
  export default new TableManager();
  