import { PLAYER_POSITIONS} from "../config/gameConfig";

class SitPositionManager {
    positions: { x: number; y: number }[] 
    constructor() {

    this.positions = PLAYER_POSITIONS
    }

    setupPositions(playerPosition: number) {
      for(let i = 0; i < playerPosition -1 ; i++ ) {
        const lastPosition = this.positions.pop()
        if(lastPosition)
        this.positions.unshift(lastPosition)
      }
    }

    getPosition(positionNumber: number): { x: number; y: number } {
        return  this.positions[positionNumber-1]
    }

  }
  

  export default new SitPositionManager();
  