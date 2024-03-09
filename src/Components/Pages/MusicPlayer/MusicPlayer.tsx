import { IoIosClose } from "react-icons/io";
import useMusicPlayer from "../../../Utils/hooks/useMusicPlayer";
import { Track } from "../../../Utils/types/track";
import { baseURL } from '../../../config/config'
import SeekBar from "../../Molecules/SeekBar";
import { RefObject, createContext, createRef, memo, useCallback, useState } from "react";
import TimeInformation from "./Components/TimeInformation";
import TrackInformation from "./Components/TrackInformation";
import PlayerControls from "./Components/PlayerControls";
import ToggleTriangle from "../../Atoms/ToggleTriangle";

import useOverlay, { Overlay } from "../../../Utils/hooks/useOverlay";
import PlayerOverlay from "./Components/TrackBodyOverlay/TrackBodyOverlay";
import { AnimatePresence } from "framer-motion";

type PlayerContextType = 
{
    websitePadding: string,

    audioRef: RefObject<HTMLAudioElement>,
    track:
    {
        id: string,
        title: string,
        duration: number
    }

    artist:
    {
        id: string,
        name: string
    }

    pause: () => void,
    seek: (percentage: number) => void,

    hideOverlay: () => void
}

export const PlayerContext = createContext<PlayerContextType>(
{
    websitePadding: "",
    audioRef: createRef<HTMLAudioElement>(),
    track:
    {
        id: "",
        title: "",
        duration: 0
    },

    artist:
    {
        id: "",
        name: ""
    },
    
    pause: () => {},
    seek: (percentage: number) => {},
    hideOverlay: () => {}
})

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

    const 
    { 
        playerState, audioControls, duration, 

        initialize, seekPercentage, seekTimestamp, reset, 
    } = useMusicPlayer(track._id);
    

    const stepBackwards = useCallback(() => { reset() }, [])

    const stepForwards = useCallback(() => { console.log("Forwards!")  }, [])

    return (
        <PlayerContext.Provider 
            value=
            {{ 
                websitePadding: `${websitePadding}`, 
                audioRef: audioControls.ref,
                track:
                {
                    id: track._id,
                    title: track.title,
                    duration: duration.value,
                },

                artist:
                {
                    id: track.artist._id,
                    name: track.artist.name
                },

                pause: audioControls.pause, 
                seek: seekPercentage,
                hideOverlay: overlay.hide,
            }}
        >
            <div className="z-[55] fixed h-screen min-w-[375px] w-full pointer-events-none">
                <audio 
                    key={track._id}
                    title={track.title}
                    ref={audioControls.ref}
                    controlsList="nodownload noplaybackrate"
                    src={`${baseURL}/music/track/play/${track._id}`}
                    onLoadedMetadata={e => 
                    {
                        const showMediaSession = () =>
                        {
                            overlay.show();

                            navigator.mediaSession.metadata = new MediaMetadata
                            ({
                                title: track.title,
                                artist: track.artist.name,
                                album: track.release.title,
                                artwork: [{ src: track.release.coverArt }],
                            });
                        }

                        initialize(showMediaSession) 
                    }}
                />

                <div 
                    className=
                    {`
                        ${overlay.isOn? "SD:bg-black": "bg-black"}
                        
                        z-[99] fixed bottom-0 flex w-full pointer-events-auto
                    `}
                >
                    <div className={`w-full`}>
                        <SeekBar
                            className="hidden SD:flex"
                            trackID={track._id}
                            duration={duration.value}
                            controls=
                            {{ 
                                pause: audioControls.pause, 
                                seek: seekPercentage 
                            }}
                        />

                        <div className={`${websitePadding} w-full flex items-center justify-between h-[4rem] py-[2.5rem]`}>
                            <ToggleTriangle {...overlay} />

                            <div className="grid grid-cols-3 content-center w-full h-full  px-20">
                                <TrackInformation 
                                    className="invisible SD:visible justify-self-start flex gap-5"
                                    release={track.release}
                                    trackTitle={track.title} 
                                    artist={track.artist}

                                    showCoverArt={!overlay.isOn}

                                    hideOverlay={overlay.hide}
                                />

                                <PlayerControls 
                                    className="flex items-center gap-10  justify-self-center h-full"
                                    playerState={playerState.value}

                                    stepBackwards={stepBackwards}
                                    togglePlay={audioControls.togglePlay}
                                    stepForwards={stepForwards}
                                />
                            
                                <TimeInformation 
                                    trackID={track._id}
                                    className=
                                    {`
                                        hidden SD:flex items-center justify-center
                                        justify-self-end
                                        font-light text-gray-300
                                        text-xs
                                    `}     
                                    
                                    duration={duration.value}
                                />
                            </div>

                            <CloseButton className="right-0" onClick={close}/>
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {overlay.isOn &&
                        <PlayerOverlay 
                            _id={track._id}
                            release={track.release}
                            value={track.lyrics}
                            
                            areVisible={areLyricsVisible}
                            toggle={toggleLyrics}

                            seek={seekTimestamp}
                        />
                    }
                    
                </AnimatePresence>
            </div>
        </PlayerContext.Provider>
    )
}
