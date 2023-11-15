import { PLAYER_POSITIONS_CONFIG} from "../config/gameConfig";
import IPlayerPositionsConfig from "../../interfaces/IPlayerPositionsConfig";

class PlayerSitPositionManager {
    positionsConfig: IPlayerPositionsConfig[]
    constructor() {

    this.positionsConfig = this.convertConfigToArray()
    }

    private convertConfigToArray(): IPlayerPositionsConfig[] {
        return Object.values(PLAYER_POSITIONS_CONFIG);
      }

    public setupConfigPositions(playerPosition: number) {
      for(let i = 0; i < playerPosition -1 ; i++ ) {
        const lastPosition = this.positionsConfig.pop()
        if(lastPosition)
        this.positionsConfig.unshift(lastPosition)
      }
    }

    public getPositionsConfig(positionNumber: number): IPlayerPositionsConfig {
        return  this.positionsConfig[positionNumber-1]
    }

  }
  
  export default new PlayerSitPositionManager();