import React, { useRef, useState, useImperativeHandle, useEffect } from 'react';
import "./CSS/RoomsScreen.css";
import PagesManager from '../../pages/manager/PagesManager.js'; 
import UIManager from '../../UI/manager/UIManager.js'; 
import GameManager from '../../game/manager/GameManager.ts'; 
import GameSignals from "../../gameSignals/GameSignals";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import UISvgButton from '../../components/UISvgButton/UISvgButton.jsx'; 
import Cookies from "js-cookie";

const RoomsScreen = React.forwardRef((props, ref) => {
    const [areListenersListening, setAreListenersListening] = useState(false);
    const [data, setData] = useState(null);
    const roomScreenRef = useRef(null);
    if(!areListenersListening) setupListeners()

    useEffect(() => {
        GameSignals.getRoomsState.dispatch() 
      }, []);

    function setupListeners(){
        setAreListenersListening(true)
        GameSignals.onRoomsState.add((roomsState) => {
            console.log(roomsState)
            setData(roomsState);
            PagesManager.handleLoadingPageVisible(false)
        });
        GameSignals.onGetPlayers.add((playersData) => startGameScene(playersData));
        GameSignals.onAnnouncement.add((data)=> {
            toast.warning(data);
            PagesManager.handleLoadingPageVisible(false)
          })
    }

    const handleRoomClick = (roomID) => {
        PagesManager.handleLoadingPageVisible(true)
        const authToken = Cookies.get("authToken")
        GameSignals.getRoomData.dispatch({roomID, authToken})    
    };

    function startGameScene(playersData){
        PagesManager.handleRoomsPageVisible(false)
        UIManager.handleVisible(true)
        GameManager.startGame(playersData)  
    }

    const handleBackButton = () => {
        PagesManager.handleRoomsPageVisible(false)
        PagesManager.handleLobbyPageVisible(true)
    };

    const removeListeners = () => {
        GameSignals.onRoomsState.detachAll()
        GameSignals.onGetPlayers.detachAll()
        GameSignals.onAnnouncement.detachAll()
    }

    useImperativeHandle(ref, () => ({
        removeListeners
    }));

    return (
        <div id="rooms-screen-container" ref={roomScreenRef}>
            <div id="back-button-container" >
                {/* <UISvgButton  onClick={handleBackButton} /> */}
            </div>
            <div id="rooms-container" ref={roomScreenRef}>
                <div id="rooms-wrapper" > 
                    {data && Object.entries(data).map(([roomId, roomData]) => (
                        <div id ="room" key={roomId} onClick={() => handleRoomClick(roomData.roomID)}>
                            <p>Room ID: {roomData.roomID}</p>
                            <p>Entry Fee: {roomData.entryFee}</p>
                            <p>Player Count: {roomData.playerCount}/{roomData.max_players}</p>
                        </div>
                    ))}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
});

export default RoomsScreen;



