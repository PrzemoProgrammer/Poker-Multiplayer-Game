import TextConfig from "../interfaces/TextConfig";
import SpriteConfig from "../interfaces/SpriteConfig";
import DefaultSpriteConfig from "../interfaces/DefaultSpriteConfig";
import BetConfig from "../interfaces/BetConfig";
import TimerConfig from "../interfaces/TimerConfig";

export default interface PlayerConfig {
    x: number,
    y: number,
    id: string,
    sit: number,
    position: string,
    avatar: SpriteConfig,
    nickname: TextConfig,
    money: TextConfig,
    bet: BetConfig
    dealerSign: SpriteConfig,
    checkSign: SpriteConfig,
    cards: DefaultSpriteConfig[],
    cardsAnimPositions: {
        animStartPosition: {x: number, y:number }[],
        animEndPosition: {x: number, y:number }[],        
    }
    timer: TimerConfig
  }