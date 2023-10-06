const Colyseus = require("colyseus.js");

const client = new Colyseus.Client("ws://localhost:3000");

client.join("game").then((room) => {
  console.log("Connected to game room:", room.roomId);

  // Tutaj możesz zaimplementować logikę gry po stronie klienta
  // oraz nasłuchiwać na zmiany stanu gry
  room.state.players.onAdd = (player, sessionId) => {
    console.log(`Player ${sessionId} joined the game.`);
  };

  room.state.players.onRemove = (player, sessionId) => {
    console.log(`Player ${sessionId} left the game.`);
  };
});

//! /////////////////////////////////////////////////////////////////////////////////////////

import * as PIXI from "pixi.js";
import CreateSprite from "../components/CreateSprite";
import SpriteConfig from "../interfaces/SpriteConfig";
import DefaultSpriteConfig from "../interfaces/DefaultSpriteConfig";

class CreateComponents{
    constructor() {

    }

    public create(config: SpriteConfig): PIXI.Sprite | null{
        const defaultConfig: DefaultSpriteConfig = {
            x: 0,
            y: 0,
            anchorX: 0.5,
            anchorY: 0.5,
            visible: true,
            ...config 
        };
        const {type} = defaultConfig
        let sprite: PIXI.Sprite | null = null
    
        switch (type) {
            case "sprite":
                sprite = new CreateSprite(defaultConfig);
                break;
            case "spritesheet":
                // Create spritesheet
                break;
            case "spine":
                // Create spine
                break;
            default:
                break;
        }

        return sprite
    }
  }

  export default new CreateComponents()

