import { GAME_HEIGHT, GAME_WIDTH } from "../config/gameConfig";
import { Application, Container } from "pixi.js";

class GameStorage {
    game: Application

    constructor() {
        this.game = this.createGame()
    }

    private createGame(): Application{
       return new Application({
            backgroundColor: 0xd3d3d3,
            width: GAME_WIDTH,
            height: GAME_HEIGHT,
        });
    }

    public getGame(): Application{
        return this.game
    }

   public removeChild(gameInstance: Container): void{
    (this.game as Application).stage.removeChild(gameInstance); 
    }

    public addChild(gameInstance: Container): void{
        (this.game as Application).stage.addChild(gameInstance);  
    }

    
  }
  

  export default new GameStorage();
  