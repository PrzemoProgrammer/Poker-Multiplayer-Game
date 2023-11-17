import ITextConfig from "../../../../components/text/interface/ITextConfig";
import ISpriteConfig from "../../../../components/sprite/interface/ISpriteConfig";
import IDefaultSpriteConfig from "../../../../components/sprite/interface/IDefaultSpriteConfig";
import IBetConfig from "../../../bet/interface/IBetConfig";
import ITimerConfig from "../timer/interface/ITimerConfig";

export default interface IPlayerConfig {
    x: number,
    y: number,
    id: string,
    sit: number,
    position: string,
    avatar: ISpriteConfig,
    nickname: ITextConfig,
    money: ITextConfig,
    bet: IBetConfig
    dealerSign: ISpriteConfig,
    actionSign: ISpriteConfig,
    cards: IDefaultSpriteConfig[],
    cardsAnimPositions: {
        animStartPosition: {x: number, y:number }[],
        animEndPosition: {x: number, y:number }[],        
    }
    timer: ITimerConfig
  }