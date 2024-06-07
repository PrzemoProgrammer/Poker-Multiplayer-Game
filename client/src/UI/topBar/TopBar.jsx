import React, { useRef, useImperativeHandle, useState, useEffect} from 'react';
import "./CSS/TopBar.css";
import PagesManager from '../../pages/manager/PagesManager.js'; 
import UIManager from '../../UI/manager/UIManager.js'; 
import GameManager from '../../game/manager/GameManager.ts'; 
import GameSignals from "../../gameSignals/GameSignals";
import TextureButton from '../../components/textureButton/TextureButton.jsx'; 
import  gsap  from 'gsap';


const TopBar = React.forwardRef((props, ref) => {
    const [isPortrait, setIsPortrait] = useState(false);
    const [isMuted, setIsMuted] = useState(false); 
    const [state, setState] = useState({
        // bottom: '0px',
    });
    const topBarRef = useRef(null);
    const [profileInformation, setProfileInformation] = useState({
        nickname: localStorage.getItem("nickname") || "",
        money: localStorage.getItem("money") || 0,
        profileImage: localStorage.getItem("profileImage") || "\assets\images\game\avatar\default_avatar.png",
    });

    useEffect(() => {
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    useEffect(() => {
        onResize()
    }, []);

    const onResize = () => {
        if(window.innerHeight > window.innerWidth) {
            setIsPortrait(true)
        } else {
            setIsPortrait(false)
        }
    }

    const handleBackButton = () => {
        GameSignals.onBackButtonClick.dispatch()
        PagesManager.handleLoadingPageVisible(true)
    };

    const handleSoundButtonClick = () => {
        setIsMuted(!isMuted)
        GameManager.handleSounds(isMuted)
    };

    const startOpenTween = () => {
        gsap.fromTo(
            topBarRef.current,
            { scale: 0,  x: "-=1000"},
            { scale: 1, x: "+=1000", ease: "back.out", duration: 0.6 } )
    }

    const resize = (resizeData) => {
        setState((prevState) => ({
            ...prevState,
            ...resizeData
        }));
    };

    const update = (newData) =>{
        setProfileInformation(newData)
        // setBalanceValue(newData)
    }

    useImperativeHandle(ref, () => ({
        resize,
        startOpenTween,
        update
    }));

    return (
        <div id="top-bar" style={state} ref={topBarRef}>
            <div id="left-side-buttons-container">
                <div id="left-side-buttons-wrapper">
                    <TextureButton onClick={handleBackButton} default="quit_to_lobby_button" hover="quit_to_lobby_button_hover" push="quit_to_lobby_button_push" svg="true" />
                    <TextureButton onClick={()=>{}} default="stand_button" hover="stand_button_hover" push="stand_button_push" svg="true" />
                </div>
            </div>
            <div id="right-side-buttons-container">
                <div id="right-side-buttons-wrapper">
                    <TextureButton onClick={()=>{}}  default="emoticons_button" hover="emoticons_button_hover" push="emoticons_button_push" svg="true" />
                    <TextureButton onClick={()=>{}}  default="info_button" hover="info_button_hover" push="info_button_push" svg="true" />
                    <TextureButton onClick={handleSoundButtonClick} default= {isMuted ? "sound_off_button": "sound_on_button"} hover= {isMuted ? "sound_off_button_hover": "sound_on_button_hover"}  push= {isMuted ? "sound_off_button_push": "sound_on_button_push"} svg="true"  />
                </div>
            </div>
            {isPortrait && <div id="profile-container">
                <img id="profile-image" src={profileInformation.profileImage} alt="home-button" />
                <div id="player-information-container">
                    <h2>{profileInformation.nickname}</h2>
                    <div id="chips-container"> 
                        <div id="background"></div>
                        <img id="chips-image" src="\assets\images\player_chips_icon.png" alt="home-button" />
                        <h1 id="chips">{profileInformation.money.toLocaleString("en")}</h1>
                    </div>
                </div>
            </div> }
        </div>
    );
});

export default TopBar;