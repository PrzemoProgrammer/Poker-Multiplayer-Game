export const TURN_OVER_PLAYER_CARD_DELAY = 1000
export const CARD_AUDIO_CONFIG = {
    deal: "deal_card",
    slide: "slide_card",
    turn: "turn_card",
} 
export const CROUPIER_CARD_DEAL_CONFIG = {
    nextAnimDelay: 200,
    nextCardDeal: 100,
    cardScale: {
        owner: 1.2,
        other:0.5
    }
}
export const TURN_OVER_ANIM_CONFIG = {
    duration: 0.1,
    ease: "none",
    yoyo: true,
    repeat: 1,
}
export const DEAL_ANIM_CONFIG = {
    duration: 0.5,
    ease: "circ.out",
    angle: 360,
    scaleOnStart: 0.5,
}
export const LAY_OF_ANIM_CONFIG = {
    duration: 0.3,
    ease: "none",
}
export const SCALE_UP_ANIM_CONFIG = {
    duration: 0.3,
    ease: "none",
    scale: 1.5,
}

