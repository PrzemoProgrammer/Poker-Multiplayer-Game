import { Container } from "pixi.js";
import Bet from "../../bet/Bet";
import TableCards from "../cards/TableCards";
import ITableConfig from "../interface/ITableConfig";
import tableConfig from "../config/tableConfig";

export default class TableView extends Container {
    config: ITableConfig
    totalBets: Bet 
    cards:TableCards 
    constructor() {
        super()
        this.config = tableConfig
        this.cards = this.createCards();
        this.totalBets = this.createTotalBets();
    }

    public createTotalBets(): Bet {
        const config = this.config.bet;
          const bet = new Bet(config);
          this.addChild(bet);
          return bet;
      }

      public createCards(): TableCards  {
        const config = this.config.card;
          const tableCards = new TableCards(config);
          this.addChild(tableCards);
          return tableCards;
      }
  }
  