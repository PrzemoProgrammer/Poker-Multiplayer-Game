import { PLAYER_POSITIONS_CONFIG} from "../../config/gameConfig";
import PlayerPositionsConfig from "../../interfaces/PlayerPositionsConfig";
// import PlayerPositionsConfig from "../interfaces/PlayerPositionsConfig";

class SitPositionManager {
    positionsConfig: PlayerPositionsConfig[]
    constructor() {

    this.positionsConfig = this.convertConfigToArray()
    }

    private convertConfigToArray(): PlayerPositionsConfig[] {
        return Object.values(PLAYER_POSITIONS_CONFIG);
      }

    public setupConfigPositions(playerPosition: number) {
      for(let i = 0; i < playerPosition -1 ; i++ ) {
        const lastPosition = this.positionsConfig.pop()
        if(lastPosition)
        this.positionsConfig.unshift(lastPosition)
      }
    }

    public getConfigPositions(positionNumber: number): PlayerPositionsConfig {
        return  this.positionsConfig[positionNumber-1]
    }

  }
  
  export default new SitPositionManager();