import { Container } from "pixi.js";
import Bet from "../../bet/Bet";
import TableCards from "../cards/TableCards";
import TableConfig from "../../../interfaces/TableConfig";
import tableConfig from "../config/tableConfig";

export default class TableFactory extends Container {
    config: TableConfig
    totalBets: Bet 
    cards:TableCards 
    constructor() {
        super()
        this.config = tableConfig
        this.totalBets = this.createTotalBets();
        this.cards = this.createCards();
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
  