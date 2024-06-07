import React, { useRef, useImperativeHandle } from 'react';
import "./CSS/Background.css";

const LoadingGame = React.forwardRef((props, ref) => {
    const backgroundScreenRef = useRef(null);

    return (
        <div id="background-container" ref={backgroundScreenRef}>
            <img id="background-image" src="\assets\images\loading_background.png" alt="Loading_icon" />
        </div>
    );
});

export default LoadingGame;
// background-image: url('/assets/images/loading_icon.gif');