import { IoIosClose } from "react-icons/io";
import useMusicPlayer, { PlayerState } from "../../../Utils/hooks/useMusicPlayer";
import { Track } from "../../../Utils/types/track";
import { baseURL } from '../../../config/config'
import SeekBar from "../../Molecules/SeekBar";
import { RefObject, createContext, createRef, memo, useCallback, useState } from "react";
import TimeInformation from "./Components/TimeInformation";
import TrackInformation from "./Components/TrackInformation";
import PlayerControls from "./Components/PlayerControls";
import ToggleTriangle from "../../Atoms/ToggleTriangle";

import  { Overlay } from "../../../Utils/hooks/useOverlay";
import PlayerOverlay from "./Components/TrackBodyOverlay/TrackBodyOverlay";
import { AnimatePresence } from "framer-motion";
import ProgressBar from "../../Molecules/ProgressBar";

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

    hideOverlay: () => void,


    playerState: PlayerState,

    stepBackwards: () => void,

    togglePlay: () => void,

    stepForwards: () => void
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
    hideOverlay: () => {},


    playerState: PlayerState.STOPPED,

    togglePlay: () => {},
    stepBackwards: () => {},
    stepForwards: () => {}
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
        // TODO: create a component for this. It's getting larger over time.
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


                playerState: playerState.value,

                stepBackwards,
                stepForwards,
                togglePlay: audioControls.togglePlay
            }}
        >
            <div className="z-[80] fixed h-screen min-w-[375px] w-full pointer-events-none">
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
                        
                        z-[80] fixed bottom-0 flex w-full pointer-events-auto
                    `}
                >
                    <div className={`w-full`}>
                        <SeekBar
                            className={`hidden SD:flex`}
                            trackID={track._id}
                            duration={duration.value}


                            controls=
                            {{ 
                                pause: audioControls.pause, 
                                seek: seekPercentage 
                            }}
                        />

                        {
                            !overlay.isOn 
                        &&
                            <ProgressBar 
                                className="flex SD:hidden"
                                trackID={track._id}
                                duration={duration.value}
                            />
                        }

                        <div className={`${websitePadding} w-full flex items-center justify-between h-[4rem] py-[2.5rem]`}>
                            <div className="flex gap-2 w-[80%] SD:w-fit">
                                <ToggleTriangle {...overlay} />
                                
                                {
                                    !overlay.isOn 
                                && 
                                    <TrackInformation
                                        className="gap-5 SD:hidden"
                                        mode={"mobile"}

                                        release={track.release}
                                        trackTitle={track.title} 
                                        artist={track.artist}

                                        showCoverArt={true}

                                        isLoading={playerState.value === PlayerState.LOADING}
                                        hideOverlay={overlay.hide}
                                    />
                                }
                            </div>
                            

                            <div className="hidden SD:grid grid-cols-3 content-center w-full h-full  px-20">
                                <TrackInformation 
                                    className="justify-self-start flex gap-5 items-center"
                                    mode={"desktop"}
                                    release={track.release}
                                    trackTitle={track.title} 
                                    artist={track.artist}

                                    
                                    showCoverArt={!overlay.isOn}

                                    hideOverlay={overlay.hide}
                                />

                                <PlayerControls 
                                    className="flex items-center justify-self-center h-full gap-10"
                                    
                                    middleButtonSize="2rem"
                                    sideButtonsSize="1.25rem"
                                />
                            
                                <TimeInformation 
                                    trackID={track._id}
                                    className=
                                    {`
                                        flex items-center justify-center
                                        justify-self-end
                                        font-light text-gray-300
                                        text-xs
                                    `}     
                                    
                                    duration={duration.value}
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
