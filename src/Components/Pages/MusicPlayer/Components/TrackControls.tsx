import { IconType } from "react-icons";
import ButtonIcon from "../../../Atoms/ButtonIcon"
import { FaPause, FaPlay, FaStepBackward, FaStepForward } from "react-icons/fa";
import SeekBar from "../../../Molecules/SeekBar";
import { memo, useCallback, useRef, useState } from "react";
import { Album, SeekLineFunctionType, Track } from "../../../../Utils/types";
import CoverArt from "../../../Atoms/CoverArt";
import useOverlay from "../../../../Utils/hooks/useOverlay";
import TrackOverlay from "../TrackOverlay";
import { AnimatePresence } from "framer-motion";
import ToggleTriangle from "../../../Atoms/ToggleTriangle";
import AlbumsObj from "../../../../Utils/dummyData/albums";
import useTimestamp from "../../../../Utils/hooks/useTimestamp";

import ArtistsObject from "../../../../Utils/dummyData/artists";

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
    lyrics:
    {
        seekLine: SeekLineFunctionType | null,
        setSeekLine: (seekLineFunction: SeekLineFunctionType) => void
    }
}

interface SongInfoProps
{
    className?: string, 

    songName: string, 
    album: Album,  
    artistName: string,
}


const SongInformation = memo((props: SongInfoProps) =>
{
    const { className, songName, artistName: bandName, album } = props;

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
                    {bandName} <span className="">•</span> {album.name}
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
    console.log("PlayerControls", object);
    
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
    const { track, lyrics } = props;

    const timestamp = useTimestamp();

    const songOverlayControls = useOverlay();

    const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
    const metaDataLoaded = useRef<boolean>(false);

    // TODO: We probably don't need this to be state, because it updates once and only once.
    const [duration, setDuration] = useState<number>(0);
    const [playerState, setPlayerState] = useState<PlayerState>(PlayerState.STOPPED)


    const timeInfo = { duration, timestamp: timestamp.value }    

    const play = useCallback(() => audioPlayerRef.current?.play(), []);

    const pause = useCallback(() => audioPlayerRef.current?.pause(),[]);

    const togglePlay =  useCallback(() => playerState === PlayerState.PLAYING? pause() : play(),[playerState, play, pause]);


    const stepBackwards = useCallback(() =>
    {
        console.log("Backwards!") 
    }, [])

    const stepForwards = useCallback(() =>
    {
        console.log("Forwards!") 
    }, [])

    const reset = useCallback(() => 
    {
        setPlayerState(PlayerState.STOPPED)
        timestamp.reset();
        // setDuration(0)
    }, [timestamp])

    const seek = useCallback((percentage: number) =>
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
    }, [duration, lyrics])


    return (
        <>
            <audio 
                key={track.id}
                ref={audioPlayerRef}
                src={track.src}
                onLoadedMetadata={e =>
                {
                    if (audioPlayerRef.current?.duration) 
                    {
                        reset() 
                        songOverlayControls.show();
                        metaDataLoaded.current = true;
                        const songDuration = audioPlayerRef.current?.duration;
                        const adjustedDuration = songDuration? songDuration * 1000:0;
                        
                        setDuration(adjustedDuration);

                        play()
                    }
                }}
                onTimeUpdate={e => timestamp.update(e.currentTarget.currentTime)}
                onPlay={() => setPlayerState(PlayerState.PLAYING)}
                onPause={() => setPlayerState(PlayerState.PAUSED)}
                onEnded={reset}
            />

            <div className="flex w-full">
                <AnimatePresence>
                    {
                        songOverlayControls.isShown
                    && 
                        <TrackOverlay 
                            timestamp={timestamp.value} 
                            track={track} 
                            setSeekLine={lyrics.setSeekLine}
                        />
                    }
                </AnimatePresence>

                <div className={`z-[50] fixed bottom-0 w-full bg-black`} >
                    <SeekBar
                        trackID={track.id}
                        timeInfo={timeInfo}
                        controls={{ pause, seek }}
                    />

                    <div className="w-full flex items-center justify-between h-[75px]  py-[25px]">
                        {/* TODO: Memoize */}
                        <ToggleTriangle 
                            isOn={songOverlayControls.isShown}

                            toggle={songOverlayControls.toggle}
                        />

                        <div className="grid grid-cols-3 content-center w-full h-full  px-20">
                            {/* TODO: Memoize */}
                            <SongInformation 
                                className="justify-self-start flex gap-5"
                                album={AlbumsObj[track.albumID]}
                                songName={track.name} 
                                artistName={ArtistsObject[track.artistID].name} 
                            />

                            {/* TODO: Memoize */}
                            <PlayerControls 
                                className="flex items-center gap-10  justify-self-center h-full"
                                isPlaying={playerState === PlayerState.PLAYING} 

                                stepBackwards={stepBackwards}
                                togglePlay={togglePlay}
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default TrackControls;