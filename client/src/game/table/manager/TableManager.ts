import TableAdapter from "../adapter/TableAdapter";
import BaseScene from "../../../abstraction/BaseScene";
import ICardData from "../../../interfaces/ICardData";

export default class TableManager {
    private static tableAdapter: TableAdapter = new TableAdapter();

    public static initTable(scene: BaseScene){
    const bettingFactory = this.tableAdapter.createTable()
    scene.addChild(bettingFactory)
    }

    public static async layOutCards(cardsSymbols: ICardData[]){
        const tableCards = this.tableAdapter.getCards
        await tableCards.dealCardsToTable(cardsSymbols)
    }

    public static updateTotalBetsText(updatedText: string | number){
        this.tableAdapter.setTotalBetsVisible(true)
        this.tableAdapter.updateTotalBetsText(updatedText)
    }
  }
  