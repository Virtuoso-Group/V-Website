import { IoIosClose } from "react-icons/io";
import { Track } from "../../Utils/types/track";
import SeekBar from "./components/Bars/SeekBar/SeekBar";
import {  memo, useCallback, useState } from "react";
import TimeInformation from "./components/TimeInformation";
import TrackInformation from "./components/TrackInformation";
import PlayerControls from "./components/PlayerControls";
import ToggleTriangle from "../Atoms/ToggleTriangle";

import  { Overlay } from "../../Utils/hooks/useOverlay";
import PlayerOverlay from "./components/MusicPlayerOverlay/TrackBodyOverlay";
import { AnimatePresence } from "framer-motion";
import ProgressBar from "./components/Bars/ProgressBar";
import { PlayerContextProvider } from "./PlayerContext";

const CloseButton = memo((props: { className?: string, onClick: () => void}) =>
{
    // "right-0 flex items-center"
    const { className, onClick } = props;

    return (
        <div className={`w-fit h-fit flex items-center justify-center cursor-pointer ${className}`}>
            <IoIosClose 
                className={`fill-white`} 
                size={"2.25rem"} 
                onClick={onClick}
            />
        </div>
    )
})

interface Props
{
    websitePadding?: string,
    track: Track,

    overlay: Overlay,
    close: () => void
}

export const MusicPlayer = (props: Props) => 
{
    const [areLyricsVisible, setLyricsVisibility] = useState(false);

    const toggleLyrics = useCallback(() => setLyricsVisibility(value => !value), []);

    const { websitePadding, track, overlay, close } = props

    return (
        <PlayerContextProvider {...props}>
            <div className="z-[80] fixed h-screen min-w-[375px] w-full pointer-events-none">
                <div 
                    className=
                    {`
                        ${overlay.isOn? "SD:bg-black": "bg-black"}
                        
                        z-[80] fixed bottom-0 flex w-full pointer-events-auto
                    `}
                >
                    <div className={`w-full`}>
                        <SeekBar className={`hidden SD:flex`} />

                        {
                            !overlay.isOn 
                        &&
                            <ProgressBar className="flex SD:hidden" />
                        }

                        <div className={`${websitePadding} w-full flex items-center justify-between h-[4rem] py-[2.5rem]`}>
                            <div className="flex gap-2 w-[70%] SD:w-fit">
                                <ToggleTriangle {...overlay} />
                                
                                {
                                    !overlay.isOn 
                                && 
                                    <TrackInformation
                                        className="gap-5 SD:hidden"
                                        mode={"mobile"}
                                        showCoverArt={true}
                                    />
                                }
                            </div>
                            

                            <div className="hidden SD:grid grid-cols-3 content-center w-full h-full  px-20">
                                <TrackInformation 
                                    className="justify-self-start flex gap-5 items-center"
                                    mode={"desktop"}
                                    showCoverArt={!overlay.isOn}
                                />

                                <PlayerControls 
                                    className="flex items-center justify-self-center h-full gap-10"
                                    
                                    middleButtonSize="2rem"
                                    sideButtonsSize="1.25rem"
                                />
                            
                                <TimeInformation 
                                    className=
                                    {`
                                        flex items-center justify-center
                                        justify-self-end
                                        font-light text-gray-300
                                        text-xs
                                    `}
                                />
                            </div>

                            <CloseButton onClick={close}/>
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {
                        overlay.isOn 
                    &&
                        <PlayerOverlay 
                            lyrics={track.lyrics}
                            
                            areVisible={areLyricsVisible}
                            toggle={toggleLyrics}
                        />
                    }
                </AnimatePresence>
            </div>
        </PlayerContextProvider>
    )
}
