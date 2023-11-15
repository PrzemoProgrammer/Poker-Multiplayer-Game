import TableFactoryAdapter from "../adapter/TableFactoryAdapter";
import BaseScene from "../../../abstraction/BaseScene";
import ICardData from "../../../interfaces/ICardData";


class TableManager {
    tableAdapter: TableFactoryAdapter 
    constructor() {
        this.tableAdapter = new TableFactoryAdapter()
    }

    public initTable(scene: BaseScene){
    const bettingFactory = this.tableAdapter.createTable()
    scene.addChild(bettingFactory)
    }

    public async layOutCards(cardsSymbols: ICardData[]){
        const tableCards = this.tableAdapter.getCards
        await tableCards.dealCardsToTable(cardsSymbols)
    }

    public updateTotalBetsText(updatedText: string | number){
        this.tableAdapter.setTotalBetsVisible(true)
        this.tableAdapter.updateTotalBetsText(updatedText)

    }
  }
  
  export default new TableManager();