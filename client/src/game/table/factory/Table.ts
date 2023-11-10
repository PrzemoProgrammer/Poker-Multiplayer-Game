import { Sprite, Container } from "pixi.js";
import Bet from "../../bet/Bet";
import TableCards from "../cards/TableCards";
import CardData from "../../../interfaces/CardData";
import TableConfig from "../../../interfaces/TableConfig";
import tableConfig from "../config/tableConfig";
import BaseScene from "../../../abstraction/BaseScene";

export default class Table extends Container {
    config: TableConfig
    totalBets: Bet 
    cards:TableCards 
    constructor(scene: BaseScene) {
        super()
        this.config = tableConfig
        this.totalBets = this.createTotalBets();
        this.cards = this.createCards();
        scene.addChild(this)
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

      public async layOutCards(cardsSymbols: CardData[]){
        await this.cards?.dealCardsToTable(cardsSymbols)
      }

      public updateTotalBets(newText: string | number){
        this.totalBets.setVisible(true)
        this.totalBets.updateText(newText)
      }
     
  }
  
//! zmienic tu nazwe na factoryu io przenieś do folderu