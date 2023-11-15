import IBetConfig from "../../bet/interface/IBetConfig";
import ITableCardsConfig from "../cards/interface/ITableCardsConfig";

export default interface ITableConfig {
    bet: IBetConfig,
    card: ITableCardsConfig,
  }