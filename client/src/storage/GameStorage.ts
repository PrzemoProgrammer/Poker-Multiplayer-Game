import { GAME_HEIGHT, GAME_WIDTH } from "../config/config";
import { Application } from "pixi.js";
import BaseScene from "../abstraction/BaseScene";

export default class GameStorage {
   private static game: Application = new Application({
    // backgroundColor: 0xd3d3d3,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
});

    public static getGame(): Application{
        return this.game
    }

    public static removeChild(gameInstance: BaseScene | undefined): void{
        if(gameInstance)
        this.game.stage.removeChild(gameInstance); 
    }

    public static addChild(gameInstance: BaseScene): void{
        this.game.stage.addChild(gameInstance);  
    }

    public static getChildren(){
        return this.game.stage.children
    }
  }
