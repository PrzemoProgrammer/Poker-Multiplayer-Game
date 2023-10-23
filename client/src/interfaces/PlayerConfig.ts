import TextConfig from "../interfaces/TextConfig";
import Card from "../interfaces/Card";
import SpriteConfig from "../interfaces/SpriteConfig";
import BetConfig from "../interfaces/BetConfig";

export default interface PlayerConfig {
    x: number,
    y: number,
    id: string,
    sit: number,
    position: string,
    cards: Card[]
    sprite: SpriteConfig,
    nickname: TextConfig,
    money: TextConfig,
    bet: BetConfig
  }


