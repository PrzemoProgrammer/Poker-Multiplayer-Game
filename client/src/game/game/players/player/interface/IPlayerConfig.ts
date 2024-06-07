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
    inLobby: boolean,
    position: string,
    background: ISpriteConfig,
    backgroundLight: ISpriteConfig,
    avatar: ISpriteConfig,
    nickname: ITextConfig,
    moneyContainer: {money: ITextConfig, moneyIcon:ISpriteConfig},
    bet: IBetConfig
    dealerSign: ISpriteConfig,
    actionSign: ISpriteConfig,
    blindSign: ISpriteConfig,
    avatarMask: ISpriteConfig,
    winImage: ISpriteConfig,
    cards: IDefaultSpriteConfig[],
    cardsAnimPositions: {
        animStartPosition: {x: number, y:number }[],
        animEndPosition: {x: number, y:number }[],        
    }
    timer: ITimerConfig
  }