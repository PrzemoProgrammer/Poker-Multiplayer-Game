import React, { useRef, useImperativeHandle } from 'react';
import "./CSS/LoadingGame.css";

const LoadingGame = React.forwardRef((props, ref) => {
    const loadingScreenRef = useRef(null);

    return (
        <div id="loading-game" ref={loadingScreenRef}>
            <img id="logo" src="https://blockspingaming.com/img/blockspin-logo.7e3e1a95.webp" alt="Loading_logo" />
            <img id="loading-icon" src="\assets\images\loading_game_anim.svg" alt="Loading_icon" />
        </div>
    );
});

export default LoadingGame;
// background-image: url('/assets/images/loading_icon.gif');