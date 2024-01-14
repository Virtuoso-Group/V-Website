import { IoIosClose } from "react-icons/io";
import useMusicPlayer, { PlayerState } from "../../../Utils/hooks/useMusicPlayer";
import { Track } from "../../../Utils/types/track";
import { baseURL, releaseURL } from "../../../config/config";
import SeekBar from "../../Molecules/SeekBar";
import { useCallback, useEffect } from "react";
import TimeInformation from "./Components/TimeInformation";
import TrackInformation from "./Components/TrackInformation";
import PlayerControls from "./Components/PlayerControls";
import ToggleTriangle from "../../Atoms/ToggleTriangle";
import { SeekFunctionType } from "../../../Utils/types";
import { Timestamp } from "../../../Utils/hooks/useTimestamp";
import { Overlay } from "../../../Utils/hooks/useOverlay";

const CloseSection = (props: { onClick: () => void}) =>
{
    return (
        <div
            className='w-fit h-fit flex items-center justify-center cursor-pointer'
        >
            <IoIosClose  className={`fill-white me-5 `} size={"2.25rem"} onClick={props.onClick}/>
        </div>
    )
}

interface Props
{
    timestamp: Timestamp,
    track: Track,
    overlay: Overlay,

    seekLyric?: SeekFunctionType,
    retrieveSeekFunction: (seekFunction: SeekFunctionType) => void,
    close: () => void
}

export const MusicPlayer = (props: Props) => 
{
    const { timestamp, track, overlay, close } = props

    const 
    { 
        playerState, audioControls, duration, 

        initialize, seek, reset
    } = useMusicPlayer(timestamp, props.seekLyric);

    const stepBackwards = useCallback(() => { console.log("Backwards!")  }, [])

    const stepForwards = useCallback(() => { console.log("Forwards!")  }, [])

    useEffect(() => { reset() }, [track._id])

    useEffect(() => {
      
        console.log("Seek function has changed!");
        
        if (duration.value > 0) 
        {
            const seekFunction = (timestamp: number) => 
            {
                console.log("timestamp: ", timestamp);
                
                seek(timestamp/duration.value)
            }

            props.retrieveSeekFunction(seekFunction)
        }
    }, [seek, duration.value])
    
    const timeInfo = { duration: duration.value, timestamp: timestamp.value }
    
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
                    const callback = () =>
                    {
                        overlay.show();

                        navigator.mediaSession.metadata = new MediaMetadata({
                            title: track.title,
                            artist: track.artist.name,
                            album: track.release.title,
                            artwork: [{ src: `${releaseURL}/${track.release._id}/cover_art.jpeg` }],
                          });
                    }

                    initialize(callback) 
                }}
                
                onTimeUpdate={e => timestamp.update(e.currentTarget.currentTime * 1000)}
                onPlay={playerState.setToPlay}
                onPause={playerState.setToPause}
                onLoadStart={playerState.setToLoading}
                
                onEnded={reset}
                onCanPlay={() => console.log("I can play!")}
            />

            <div className="flex w-full">
                <div className={`z-[50] fixed bottom-0 w-full bg-black`}>
                    <SeekBar
                        trackID={track._id}
                        timeInfo={timeInfo}
                        controls={{ pause: audioControls.pause, seek }}
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
                                className=
                                {`
                                    hidden SD:flex items-center justify-center
                                    justify-self-end
                                    font-light text-gray-300
                                    text-xs
                                `}                                
                                timeInfo={timeInfo} 
                            />
                        </div>

                        <div className="right-0 absolute flex items-center">
                            <CloseSection onClick={close}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
