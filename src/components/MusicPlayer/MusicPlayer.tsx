import { Track } from "../../Utils/types/track";
import {  useCallback, useState } from "react";

import  { Overlay } from "../../Utils/hooks/useOverlay";
import PlayerOverlay from "./components/MusicPlayerOverlay/MusicPlayerOverlay";
import { AnimatePresence } from "framer-motion";
import { PlayerContextProvider } from "./PlayerContext";
import ResponsiveMusicPlayer from "./responsive/ResponsiveMusicPlayer";


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

    const { track, overlay } = props

    return (
        <PlayerContextProvider {...props}>
            <div className="z-[80] fixed h-screen min-w-[375px] w-full pointer-events-none">
                <ResponsiveMusicPlayer />

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
