import { GAME_HEIGHT, GAME_WIDTH } from "../../config/gameConfig";
import { Application, Container } from "pixi.js";
import BaseScene from "../../abstraction/BaseScene";


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

    public removeChild(gameInstance: BaseScene | undefined): void{
        if(gameInstance)
        this.game.stage.removeChild(gameInstance); 
    }

    public addChild(gameInstance: BaseScene): void{
        this.game.stage.addChild(gameInstance);  
    }

    public getChildren(){
        return this.game.stage.children
    }
  }
  

  export default new GameStorage();
  