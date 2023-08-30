import { IconType } from "react-icons";
import ButtonIcon from "../../../Atoms/ButtonIcon"
import { FaPause, FaPlay, FaStepBackward, FaStepForward } from "react-icons/fa";
import SeekBar from "../../../Molecules/SeekBar";
import { useEffect, useRef, useState } from "react";
import { Album, PlayerState, SeekLineFunctionType, Track } from "../../../../Utils/types";
import CoverArt from "../../../Atoms/CoverArt";

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
    playerState:
    {
        value: PlayerState,
        play: () => void,
        pause: () => void,
        seek: () => void,
        stop: () => void,
    },

    track: Track,
    timestamp:
    {
        value: number,
        update: (targetTimestamp: number) => void,
        reset: () => void
    },

    lyrics:
    {
        seekLine: SeekLineFunctionType | null,
    }
}


const SongInformation = (props: { className?: string, songName: string, album: Album,  bandName: string }) =>
{
    const { className, songName, bandName, album } = props;

    return (
        <div className={className}>
             <CoverArt 
                className={`h-[50px] bg-blue-800 rounded-sm`}
                name={album.name}
                coverArt={album.coverArt} 
            />

            <p className='flex flex-col'>
                <span className='font-bold text-white text-lg'>
                    {songName}
                </span>

                
            
                <span className='text-sm font-light text-gray-300 align-middle text-slate-300'>
                    {bandName} <span className="">.</span> {album.name}
                </span>
            </p>
        </div>
    )
}

interface PlayerControlsProps 
{
    className?: string,
    isPlaying: boolean,

    stepBackwards: () => void,
    togglePlay: () => void,
    stepForwards: () => void,
}


const PlayerControls = (props: PlayerControlsProps) =>
{
    const { className, isPlaying, stepBackwards, togglePlay, stepForwards } = props;

    const PlayPauseIcon: IconType = isPlaying? FaPause: FaPlay;

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
}

const TrackControls = (props: Props) =>
{
    const { playerState, track, lyrics, timestamp } = props;

    const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
    const metaDataLoaded = useRef<boolean>(false);

    // TODO: We probably don't need this to be state, because it updates once and only once.
    const [duration, setDuration] = useState<number>(0);

    const play = () => audioPlayerRef.current?.play();

    const pause = () => audioPlayerRef.current?.pause();

    const togglePlay = () => playerState.value === PlayerState.PLAYING? pause() : play();

    const reset = () => 
    {
        playerState.stop();
        timestamp.reset();
        setDuration(0)
    }

    const seek = (percentage: number) =>
    { 
        const canSeek = metaDataLoaded.current && 0 <= percentage && percentage <= 1;

        if (audioPlayerRef.current  && canSeek) 
        {
            const newTimeStamp = (duration * percentage);

            if (lyrics.seekLine)
            {
                lyrics.seekLine(newTimeStamp)
            }

            audioPlayerRef.current.currentTime = newTimeStamp / 1000;

            play()
        }
    }

    const timeInfo = { duration, timestamp: timestamp.value }

    useEffect(() => 
    {
        reset()
    
      return () => 
      {
      }
    }, [track.id])


    useEffect(() =>
    {
        if (duration) 
        {
            play()
        }
    }, [duration])
    

    return (
        <>
            <audio 
                ref={audioPlayerRef}
                src={track.src}
                onLoadedMetadata={e =>
                {
                    if (audioPlayerRef.current?.duration) 
                    {
                        metaDataLoaded.current = true;
                        const songDuration = audioPlayerRef.current?.duration;
                        const adjustedDuration = songDuration? songDuration * 1000:0;
                        
                        setDuration(adjustedDuration);

                        // play()
                    }
                }}
                /* TODO: 
                        Maybe it's not a good idea to use this function, 
                        it's best to unify the player timer and lyrics timer.
                */
                onTimeUpdate={e => 
                {
                    console.log("time delta: ", e.currentTarget.currentTime * 1000);
                    
                    timestamp.update(e.currentTarget.currentTime)
                }}
                onPlay={playerState.play}
                onPause={playerState.pause}
                onEnded={reset}
            />
        
            <div className={`z-[50] fixed bottom-0 w-full bg-black`} >
                <SeekBar
                    isPlaying={playerState.value === PlayerState.PLAYING}
                    timeInfo={timeInfo}
                    changeToSeeking={playerState.seek}
                    controls={{ pause, seek }}
                />

                <div className="grid grid-cols-3 content-center w-full h-[75px] py-[25px] px-20">
                    <SongInformation 
                        className="justify-self-start flex gap-5"
                        album={track.album}
                        songName={track.name} 
                        bandName={track.band} 
                    />

                    <PlayerControls 
                        className="flex items-center gap-10  justify-self-center h-full"
                        isPlaying={playerState.value === PlayerState.PLAYING} 

                        stepBackwards={() => { console.log("Backwards!") }}
                        togglePlay={togglePlay}
                        stepForwards={() => { console.log("Forwards!") }}
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
            </div>
        </>
    )
}

export default TrackControls;