import { IconType } from "react-icons";
import ButtonIcon from "../../../Atoms/ButtonIcon"
import { FaPause, FaPlay, FaStepBackward, FaStepForward } from "react-icons/fa";
import { IoIosClose } from 'react-icons/io'
import SeekBar from "../../../Molecules/SeekBar";
import { memo, useCallback, useRef, useState } from "react";
import { SeekLineFunctionType } from "../../../../Utils/types";
import CoverArt from "../../../Atoms/CoverArt";
import useOverlay from "../../../../Utils/hooks/useOverlay";
import TrackOverlay from "../TrackOverlay";
import { AnimatePresence } from "framer-motion";
import ToggleTriangle from "../../../Atoms/ToggleTriangle";
import useTimestamp from "../../../../Utils/hooks/useTimestamp";

import { Track } from "../../../../Utils/types/track";
import useAudioPlayer from "../../../../Utils/hooks/usePlayerControls";
import { baseURL, releaseURL } from "../../../../API/config";

interface TimeInfoProps
{
    className?: string,
    timeInfo: 
    {
        duration: number, 
        timestamp: number 
    }
}

const TimeInfo = (props: TimeInfoProps) =>
{
    const { className, timeInfo} = props;

    const convertMilliToTimeStamp = (milliseconds: number): string =>
    {
        const minutes = ""+(Math.floor(milliseconds / 60000));
        const seconds = ""+Math.floor((milliseconds % 60000) / 1000);
        
        return `${minutes}:${seconds.padStart(2, "0")}`
    }
    
    const currentTime = convertMilliToTimeStamp(timeInfo.timestamp);
    
    const duration = convertMilliToTimeStamp(timeInfo.duration);

    return (
        <div className={`${className}`}>
            <p >{currentTime}/{duration}</p>
        </div>
    )
}

interface Props
{
    track: Track,
    close: () => void,

    areLyricsVisible: boolean,
    toggleLyrics: () => void
}

interface SongInfoProps
{
    className?: string, 

    songName: string, 
    release: 
    {
        _id: string
       title: string,
    },  
    artistName: string,
}


const SongInformation = memo((props: SongInfoProps) =>
{
    const { className, songName, artistName, release } = props;

    const coverArt = `${releaseURL}/${release._id}/cover_art.jpeg`

    return (
        <div className={`flex items-center whitespace-nowrap ${className}`}>
            <CoverArt
                className={`h-[50px] bg-blue-800 rounded-sm`}
                name={release.title}
                coverArt={coverArt??""} 
            />

            <p className='flex flex-col'>
                <span className='font-bold text-white text-lg'>
                    {songName}
                </span>

                <span className='text-sm font-light text-gray-300 align-middle text-slate-300'>
                    {artistName} <span className="">•</span> {release.title}
                </span>
            </p>
        </div>
    )
})

interface PlayerControlsProps 
{
    className?: string,
    isPlaying: boolean,

    stepBackwards: () => void,
    togglePlay: () => void,
    stepForwards: () => void,
}


const PlayerControls = memo((props: PlayerControlsProps) =>
{
    const { className, isPlaying, stepBackwards, togglePlay, stepForwards } = props;

    const PlayPauseIcon: IconType = isPlaying? FaPause: FaPlay;


    const object = 
    {
        className, isPlaying, stepBackwards, togglePlay, stepForwards
    }
        
    return (
        <div className={`${className}`}>
            <ButtonIcon 
                className=
                {`
                    h-[35px] 
                    aspect-square 
                    rounded-full bg-slate-300

                    flex items-center justify-center
                `}
                name="Step Forward"
                icon={<FaStepBackward size={15}/>}

                onClick={stepBackwards}
            />

            <ButtonIcon 
                className=
                {`
                    h-[50px] 
                    aspect-square 
                    rounded-full bg-slate-300

                    flex items-center justify-center
                `}
                name="Play"
                icon={<PlayPauseIcon size={25}/>}

                onClick={togglePlay}
            />

            <ButtonIcon 
                className=
                {`
                    h-[35px]  
                    aspect-square 
                    rounded-full bg-slate-300

                    flex items-center justify-center
                `}
                name="Step Forward"
                icon={<FaStepForward size={15}/>}

                onClick={stepForwards}
            />
        </div>
    )
})


enum PlayerState 
{
    PLAYING = "Playing",
    PAUSED = "PAUSED",
    STOPPED = "STOPPED"
}

const TrackControls = (props: Props) =>
{
    const { track } = props;

    // TODO: we need to find a cleaner way to handle propagating functions upwards
    const [seekLine, setSeekLine] = useState<SeekLineFunctionType | null>(null)
    
    const songOverlayControls = useOverlay();

    const audioPlayer = useAudioPlayer();
    // TODO: We probably don't need this to be state, because it updates only once.
    const [duration, setDuration] = useState<number>(0);
    const timestamp = useTimestamp();
    const timeInfo = { duration, timestamp: timestamp.value }    

    const stepBackwards = useCallback(() => { console.log("Backwards!")  }, [])

    const stepForwards = useCallback(() => { console.log("Forwards!")  }, [])

    const seek = (percentage: number) =>
    { 
        const clipPercentage = (percentage: number): number =>
        {
            if (percentage < 0) 
            {
                return 0
            }
            else if (percentage > 1) 
            {
                return 1
            }
            else
            {
                return percentage
            }
        }

        const clippedPercentage = clipPercentage(percentage);

        if (audioPlayer.ref.current  && audioPlayer.metaDataLoaded.current) 
        {
            const newTimeStamp = (duration * clippedPercentage);

            audioPlayer.ref.current.currentTime = newTimeStamp / 1000;

            /* 
                Due to the absence of this line, a race condition was caused in the lyrics reader
                Between the timestamp and index, causing the lyrics reader to be buggy.
            */
            timestamp.update(newTimeStamp / 1000)

            if (seekLine)
            {
                seekLine(newTimeStamp)
            }    

            audioPlayer.play()
        }
    }

    const reset = () => 
    {        
        audioPlayer.reset();

        timestamp.reset();
    }

    return (
        <>
            <audio 
                key={track._id}
                ref={audioPlayer.ref}
                controlsList="nodownload noplaybackrate"
                src={`${baseURL.local}/music/track/play/${track.release._id}/${track._id}`}
                onLoadedMetadata={e =>
                {
                    if (audioPlayer.ref.current?.duration) 
                    {
                        reset() 

                        songOverlayControls.show();

                        audioPlayer.metaDataLoaded.current = true;
                        
                        const songDuration = audioPlayer.ref.current?.duration;
                        const adjustedDuration = songDuration? songDuration * 1000:0;
                        
                        setDuration(adjustedDuration);

                        audioPlayer.play()
                    }
                }}
                onTimeUpdate={e => timestamp.update(e.currentTarget.currentTime)}
                onPlay={audioPlayer.setToPlay}
                onPause={audioPlayer.setToPause}
                onEnded={reset}
            />

            <div className="flex w-full">
                <AnimatePresence>
                    {
                        songOverlayControls.isShown
                    && 
                        <TrackOverlay 
                            playerState={audioPlayer.playerState}
                            timestamp={timestamp.value} 
                            track={track} 
                            setSeekLine={setSeekLine}
                            seek={(timestamp: number) => seek(timestamp/duration)}

                            areLyricsVisible={props.areLyricsVisible}
                            toggleLyrics={props.toggleLyrics}

                        />
                    }
                </AnimatePresence>

                <div className={`z-[50] fixed bottom-0 w-full bg-black`} >
                    <SeekBar
                        trackID={track._id}
                        timeInfo={timeInfo}
                        controls={{ pause: audioPlayer.pause, seek }}
                    />

                    <div className="w-full flex items-center justify-between h-[75px]  py-[25px]">
                        <ToggleTriangle 
                            isOn={songOverlayControls.isShown}

                            toggle={songOverlayControls.toggle}
                        />

                        <div className="grid grid-cols-3 content-center w-full h-full  px-20">
                            <SongInformation 
                                className="justify-self-start flex gap-5"
                                release={track.release}
                                songName={track.title} 
                                artistName={track.artist.name} 
                            />

                            <PlayerControls 
                                className="flex items-center gap-10  justify-self-center h-full"
                                isPlaying={audioPlayer.playerState === PlayerState.PLAYING} 

                                stepBackwards={stepBackwards}
                                togglePlay={audioPlayer.togglePlay}
                                stepForwards={stepForwards}
                            />
                        
                            <TimeInfo 
                                className=
                                {`
                                    flex items-center justify-center
                                    justify-self-end
                                    font-light text-gray-300
                                    text-xs
                                `}                                
                                timeInfo={timeInfo} 
                            />
                        </div>

                        <div className="right-0 absolute flex items-center cursor-pointer">
                            <div
                                className='me-5 w-fit h-fit flex items-center justify-center'
                                onClick={props.close}
                            >
                                <IoIosClose 
                                    className={`fill-white`}
                                    size={35}
                                />
                            </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TrackControls;