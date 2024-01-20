import { IoIosClose } from "react-icons/io";
import useMusicPlayer from "../../../Utils/hooks/useMusicPlayer";
import { Track } from "../../../Utils/types/track";
import { baseURL, releaseURL } from "../../../config/config";
import SeekBar from "../../Molecules/SeekBar";
import { memo, useCallback, useEffect } from "react";
import TimeInformation from "./Components/TimeInformation";
import TrackInformation from "./Components/TrackInformation";
import PlayerControls from "./Components/PlayerControls";
import ToggleTriangle from "../../Atoms/ToggleTriangle";

import useOverlay from "../../../Utils/hooks/useOverlay";
import PlayerOverlay from "./TrackBodyOverlay";
import { AnimatePresence } from "framer-motion";

import { useLyrics } from "../../../Utils/hooks/lyricsHooks";

const CloseButton = memo((props: { onClick: () => void}) =>
{
    return (
        <div
            className='w-fit h-fit flex items-center justify-center cursor-pointer'
        >
            <IoIosClose  className={`fill-white me-5 `} size={"2.25rem"} onClick={props.onClick}/>
        </div>
    )
})

interface Props
{
    track: Track,

    areLyricsVisible: boolean,
    toggleLyrics: () => void

    close: () => void
}

export const MusicPlayer = (props: Props) => 
{
    const { track, close } = props

    const lyrics = useLyrics(track._id, track.lyrics)

    const 
    { 
        playerState, audioControls, duration, 

        initialize, seekPercentage, seekTimestamp, reset, 
    } = useMusicPlayer(lyrics.seek);
    
    const overlay = useOverlay();

    const stepBackwards = useCallback(() => { console.log("Backwards!")  }, [])

    const stepForwards = useCallback(() => { console.log("Forwards!")  }, [])

    useEffect(() => 
    {        
        reset() 
    }, [track._id])


    useEffect(() => 
    {
        return () =>
        {

        }
    }, [])
    
        
    return (
        <>
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
                            artwork: [{ src: `${releaseURL}/${track.release._id}/cover_art.jpeg` }],
                        });
                    }

                    initialize(showMediaSession) 
                }}
                
                onTimeUpdate=
                {e => 
                {                    
                    lyrics.update(e.currentTarget.currentTime * 1000);
                }}
                onPlay={playerState.setToPlay}
                onPause={playerState.setToPause}
                onLoadStart={playerState.setToLoading}

                onWaiting={playerState.setToLoading}
                // onProgress={playerState.setToPlay}
                onPlaying={playerState.setToPlay}
                
                onEnded={reset}
            />

            <AnimatePresence>
                {
                    overlay.isOn
                && 
                    <PlayerOverlay 
                        release={track.release}
                        selectedLine={lyrics.selectedLine}
                        value={track.lyrics}
                        _id={track._id}
                        areVisible={props.areLyricsVisible}
                        toggle={props.toggleLyrics}

                        seek={seekTimestamp}
                    />
                }
            </AnimatePresence>

            <div className="flex w-full">
                <div className={`z-[50] fixed bottom-0 w-full bg-black`}>
                    <SeekBar
                        audioRef={audioControls.ref}
                        trackID={track._id}
                        duration={duration.value}
                        controls=
                        {{ 
                            pause: audioControls.pause, 
                            seek: seekPercentage 
                        }}
                    />

                    <div className="w-full flex items-center justify-between h-[4.6875rem] py-[1.5625rem]">
                        <ToggleTriangle {...overlay} />

                        <div className="grid grid-cols-3 content-center w-full h-full  px-20">
                            <TrackInformation 
                                className="invisible SD:visible justify-self-start flex gap-5"
                                release={track.release}
                                trackName={track.title} 
                                artist={track.artist}

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
                                audioRef={audioControls.ref}
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

                        <div className="right-0 absolute flex items-center">
                            <CloseButton onClick={close}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
