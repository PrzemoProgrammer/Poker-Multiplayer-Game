export const BETTING_AUDIO_CONFIG = {
    buttonClick: "swipe_button"
};
export const FACTORY_CONFIG = {
    x: 1640,
    y: 300,
    background: {
        key: "betting_background",
        type: "sprite",
        x: 10,
        y: 40,
        scaleX: 1,
        scaleY: 1,
        angle: 0,
        anchorX: 0,
        anchorY: 0,
        visible: true,
    },
    button: {
        spritePush: "betting_hide_button",
        scaleValue: 1,
        spriteConfig: {
            key: "betting_show_button",
            type: "sprite",
            x: 10,
            y: 40,
            scaleX: 1,
            scaleY: 1,
            angle: 0,
            anchorX: 0,
            anchorY: 1,
            visible: true,
        },
    },
    betText: {
        message: 1000,
        x: 125,
        y: 580,
        scaleX: 1,
        scaleY: 1,
        angle: 0,
        anchorX: 0.5,
        anchorY: 0,
        visible: true,
        textConfig: {
            fontFamily: "Arial",
            fontSize: 55,
            fill: 0xffffff,
        },
    },
    textFieldBackground: {
        key: "betting_text_field",
        type: "sprite",
        x: 10,
        y: 638,
        scaleX: 1,
        scaleY: 1,
        angle: 0,
        anchorX: 0,
        anchorY: 1,
        visible: true,
    },
    arrow: {
        key: "batting_arrow",
        type: "sprite",
        x: 10,
        y: 550,
        scaleX: 1,
        scaleY: 1,
        angle: 0,
        anchorX: 0,
        anchorY: 0,
        visible: true,
    }
};

export const SLIDE_ANIM_CONFIG = {
    shiftY: 590,
    duration: 0.5,
    ease: "power1.out",
};

export const ARROW_CONFIG = {
    minY:50,
    maxY:550 
};

export const MODIFY_NUMBER_CONFIG = {
    maxValue:501000,
    substrate: -50,
    increaseZeros: 1000
};

