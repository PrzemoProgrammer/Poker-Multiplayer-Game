import React, { useRef,  useState, useImperativeHandle } from 'react';
import "./CSS/Pages.css";
import LoadingScreen from "./loadingScreen/LoadingScreen";
import LoginScreen from "./loginScreen/LoginScreen";
import LoadingGame from "./loadingGame/LoadingGame";
import LobbyScreen from "./lobby/LobbyScreen";
import GameSignals from "../gameSignals/GameSignals";
import ComponentsContextRefsStorage from "../componentsContextRefs/ComponentsContextRefsStorage";
// import RoomsScreen from "./rooms/RoomsScreen";
import Background from "./background/Background";

const Pages = React.forwardRef((props, ref) => {
    const [responsiveState, setResponsiveState] = useState({
        width: '0px',
        height: '0px',
        left: '0px',
        top: '0px',
        transform: 'none',
        display: 'none'
    });
    const [active, setActive] = useState(true);
    const [loadingScreenVisible, setLoadingScreenVisible] = useState(false);
    const [loginScreenVisible, setLoginScreenVisible] = useState(false);
    const [loadingGameVisible, setLoadingGameVisible] = useState(true);
    const [lobbyScreenVisible, setLobbyScreenVisible] = useState(false);
    // const [roomsScreenVisible, setRoomsScreenVisible] = useState(false);
    const loadingScreenRef = useRef(null);
    const loginScreenRef = useRef(null);
    const loadingGameRef = useRef(null);
    const lobbyScreenRef = useRef(null);
    ComponentsContextRefsStorage.add("lobbyScreen", lobbyScreenRef)

    // const roomsScreenRef = useRef(null);

    const handleLoadingPageVisible =(value) => {
        setLoadingScreenVisible(value);
    }

    const handleLoginPageVisible = (value) => {
        setLoginScreenVisible(value);
    }

    const handleLoadingGameVisible = (value) => {
        setLoadingGameVisible(value)
    }

    const handleLobbyPageVisible = (value) => {
        if(value === false) lobbyScreenRef.current.removeListeners()
        setLobbyScreenVisible(value)
    }

    const resize = (resizeData) => {
        setResponsiveState(resizeData);
    }

    const setPointerEventActive = (value) => {
        // console.log(ref.current)
        setActive(value)
    }

    // const handleRoomsPageVisible = (value) => {
    //     if(value === false) roomsScreenRef.current.removeListeners()
    //     setRoomsScreenVisible(value)
    // }

    useImperativeHandle(ref, () => ({
        handleLoadingPageVisible,
        handleLoginPageVisible,
        handleLoadingGameVisible,
        handleLobbyPageVisible,
        setPointerEventActive,
        resize
        // handleRoomsPageVisible
    }));
    const { width, height, left, top, transform, display } = responsiveState
    const style = { width, height, left, top, transform, display };

    return (
        <div id={active === true ? "pages" :"pages-not-active"} ref={ref} style={style}>
           {loadingGameVisible &&  <LoadingGame ref={loadingGameRef}/>}
            {loginScreenVisible && <LoginScreen ref={loginScreenRef}/>}
            {lobbyScreenVisible && <LobbyScreen ref={lobbyScreenRef}/>}
            {/* {roomsScreenVisible && <RoomsScreen ref={roomsScreenRef}/>} */}
           {loadingScreenVisible &&  <LoadingScreen ref={loadingScreenRef}/>}
        </div>
    );
});

export default Pages;