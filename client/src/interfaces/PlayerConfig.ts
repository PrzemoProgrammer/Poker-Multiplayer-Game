import TextConfig from "../interfaces/TextConfig";

export default interface PlayerConfig {
    x: number,
    y: number,
    id: string,
    sprite: {
        path: string,
        key: string,
        type: string,
        x: number,
        y: number,
        anchorX: number,
        anchorY: number,
        visible: boolean
    },
    nickname: TextConfig
    bets: TextConfig
  }


