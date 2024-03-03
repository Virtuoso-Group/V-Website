import { IoIosClose } from "react-icons/io";
import useMusicPlayer from "../../../Utils/hooks/useMusicPlayer";
import { Track } from "../../../Utils/types/track";
import { baseURL } from "../../../config/config";
import SeekBar from "../../Molecules/SeekBar";
import { RefObject, createContext, createRef, memo, useCallback, useState } from "react";
import TimeInformation from "./Components/TimeInformation";
import TrackInformation from "./Components/TrackInformation";
import PlayerControls from "./Components/PlayerControls";
import ToggleTriangle from "../../Atoms/ToggleTriangle";

import useOverlay from "../../../Utils/hooks/useOverlay";
import PlayerOverlay from "./TrackBodyOverlay";
import { AnimatePresence } from "framer-motion";

type PlayerContextType = 
{
    websitePadding: string,
    trackID: string,
    audioRef: RefObject<HTMLAudioElement>
}

export const PlayerContext = createContext<PlayerContextType>(
{
    websitePadding: "",
    trackID: "",
    audioRef: createRef<HTMLAudioElement>()
})

const CloseButton = memo((props: { onClick: () => void}) =>
{
    return (
        <div className='w-fit h-fit flex items-center justify-center cursor-pointer'>
            <IoIosClose  className={`fill-white`} size={"2.25rem"} onClick={props.onClick}/>
        </div>
    )
})

interface Props
{
    websitePadding?: string,
    track: Track,

    close: () => void
}

export const MusicPlayer = (props: Props) => 
{
    const [areLyricsVisible, setLyricsVisibility] = useState(false);

    const toggleLyrics = useCallback(() => setLyricsVisibility(value => !value), []);

    const { websitePadding, track, close } = props

    const 
    { 
        playerState, audioControls, duration, 

        initialize, seekPercentage, seekTimestamp, reset, 
    } = useMusicPlayer(track._id);
    
    const overlay = useOverlay();

    const stepBackwards = useCallback(() => { reset() }, [])

    const stepForwards = useCallback(() => { console.log("Forwards!")  }, [])

    return (
        <PlayerContext.Provider value={{ websitePadding: `${websitePadding}`, trackID: track._id, audioRef: audioControls.ref }}>
            <div className="z-[55] fixed h-screen min-w-[375px] w-full pointer-events-none">
                <audio 
                    key={track._id}
                    title={track.title}
                    ref={audioControls.ref}
                    controlsList="nodownload noplaybackrate"
                    src={`${baseURL}/music/track/play/${track.release._id}/${track._id}`}
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
                        bg-black
                        z-[99] fixed bottom-0 flex w-full pointer-events-auto
                    `}
                >
                    <div className={`w-full`}>
                        <SeekBar
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
                                    trackName={track.title} 
                                    artist={track.artist}

                                    showCoverArt={!overlay.isOn}

                                    onClick={overlay.hide}
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

                            <div className="right-0 flex items-center">
                                <CloseButton onClick={close}/>
                            </div>
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
