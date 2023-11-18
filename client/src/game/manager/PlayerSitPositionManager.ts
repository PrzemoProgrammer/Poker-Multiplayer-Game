import { PLAYER_POSITIONS_CONFIG } from "../config/gameConfig";
import IPlayerPositionsConfig from "../../interfaces/IPlayerPositionsConfig";

export default  class PlayerSitPositionManager {
  private static positionsConfig: IPlayerPositionsConfig[] = this.convertConfigToArray();

  private static convertConfigToArray(): IPlayerPositionsConfig[] {
    return Object.values(PLAYER_POSITIONS_CONFIG);
  }

  public static setupConfigPositions(playerPosition: number) {
    for (let i = 0; i < playerPosition - 1; i++) {
      const lastPosition = this.positionsConfig.pop();
      if (lastPosition) {
        this.positionsConfig.unshift(lastPosition);
      }
    }
  }

  public static getPositionsConfig(positionNumber: number): IPlayerPositionsConfig {
    return this.positionsConfig[positionNumber - 1];
  }
}