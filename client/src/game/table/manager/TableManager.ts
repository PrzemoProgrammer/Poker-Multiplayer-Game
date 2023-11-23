import TableAdapter from "../adapter/TableAdapter";
import BaseScene from "../../../abstraction/BaseScene";
import ICardData from "../../../interfaces/ICardData";
import {MOVE_TO_PLAYER_ANIM} from "../bets/config/tableBetsConfig";
import gsap from "gsap";

export default class TableManager {
    private static tableAdapter: TableAdapter = new TableAdapter();

    public static initTable(scene: BaseScene){
    const bettingView = this.tableAdapter.createTable()
    scene.addChild(bettingView)
    }

    public static async layOutCards(cardsSymbols: ICardData[]){
        const tableCards = this.tableAdapter.getCards
        await tableCards.dealCardsToTable(cardsSymbols)
    }

    public static updateTotalBetsTextAndMakeVisible(updatedText: string | number){
        this.setTotalBetsTextVisible(true)
        this.tableAdapter.updateTotalBetsText(updatedText)
    }

    public static setTotalBetsTextVisible(value: boolean){
        this.tableAdapter.setTotalBetsVisible(value)
    }

    public static async moveBetsToWinnerAnim(targetX: number, targetY: number ){
        const {ease, duration}= MOVE_TO_PLAYER_ANIM
        const tableBets = this.tableAdapter.getTotalBetsText
       await gsap.to(tableBets, {
          y: targetY,
          x: targetX,
          duration: duration,
          ease: ease,
        });
      }
  }