import BetConfig from "../interfaces/BetConfig";
import TableCardsConfig from "../interfaces/TableCardsConfig";

export default interface TableConfig {
    bet: BetConfig,
    card: TableCardsConfig,
  }