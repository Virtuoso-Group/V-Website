import { useRef, useState } from "react";

import { motion } from "framer-motion";
import { IconType } from "react-icons";
import { MdOutlineLyrics } from 'react-icons/md'

import { FaPause, FaPlay } from 'react-icons/fa'

import SeekBar from "../Molecules/SeekBar";
import ButtonIcon from "../Atoms/ButtonIcon";
import { PlayerState, Track } from "../../Utils/types";

const CoverArt = (props: {  name: string, coverArt: string }) =>
{
    const { name, coverArt } = props;

    return (
        <motion.img
            layout="size"
            className=
            {`
                aspect-square 
                object-fit 
                
                min-w-[300px]
                w-[15%]
                rounded-lg
            `}
            title={name} alt={name}
            src={coverArt}
        />
)
}

const Name = (props: { songName: string, bandName: string}) =>
{
    const SongName = () =>
    {
        return (
            <span className='font-bold text-white text-2xl'>
                {props.songName}
            </span>
        )
    }
    
    const BandName = () =>
    {
        return (
            <span className='font-light text-gray-300'>
                {props.bandName}
            </span>
        )
    }

    return (
        <p className='flex flex-col'>
            <SongName />
        
            <BandName />
        </p>
    )
}


const ControlGroup = (props: {isPlaying: boolean, togglePlay: () => void }) =>
{
    const PlayPauseIcon: IconType = props.isPlaying? FaPause: FaPlay;

    return (
        <div className='w-full flex justify-center'>
            <button 
                className=
                {`
                    h-[50px] 
                    aspect-square 
                    rounded-full bg-slate-300

                    flex items-center justify-center
                `}
                name='Play'
                onClick={props.togglePlay}
            >
                <PlayPauseIcon size={18}/>
            </button>
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

    song: Track,
    timestamp:
    {
        value: number,
        update: (targetTimestamp: number) => void,
        reset: () => void
    },

    seekLine: (timestamp: number) => void,
    showLyrics: () => void,
}

const MiniMusicPlayer = (props: Props) =>
{
    const { playerState, timestamp, song, seekLine, showLyrics } = props;

    const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

    const metaDataLoaded = useRef<boolean>(false);
    // TODO: We probably don't need this to be state, because it updates once and only once.
    const [duration, setDuration] = useState<number>(0);

    const play = () => audioPlayerRef.current?.play();

    const pause = () => audioPlayerRef.current?.pause();

    const togglePlay = () => playerState.value === PlayerState.PLAYING? pause() : play();

    const seek = (percentage: number) =>
    { 
        const canSeek = metaDataLoaded.current && 0 <= percentage && percentage <= 1;

        if (audioPlayerRef.current  && canSeek) 
        {
            const newTimeStamp = (duration * percentage);

            seekLine(newTimeStamp)
            
            audioPlayerRef.current.currentTime = newTimeStamp / 1000;

            play()
        }
    }
        
    return (
    <>
        <audio 
            ref={audioPlayerRef}
            src={song.src}
            onLoadedMetadata={e =>
            {
                if (audioPlayerRef.current?.duration) 
                {
                    metaDataLoaded.current = true;
                    const songDuration = audioPlayerRef.current?.duration;
                    const adjustedDuration = songDuration? songDuration * 1000:0;
                    
                    setDuration(adjustedDuration);
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
            onEnded={() =>
            {
                playerState.stop();
                timestamp.reset();
            }}
        />

        <div
            className=
            {`
                bg-black
                h-full
                w-[375px]                    
                
                rounded-lg
                overflow-hidden
                flex flex-col gap-5 pb-10
            `}

        >
            <header 
                className='h-[50px] mt-2 px-4 w-full  flex items-center justify-end overflow-hidden'
            >
                <ButtonIcon 
                    className=
                    {`
                        h-[40px] 
                        aspect-square 
                        bg-blue-300
                        rounded-full 
                        flex items-center justify-center
                    `}
                    onClick={showLyrics}
                    icon=
                    {
                        <MdOutlineLyrics 
                            className={"fill-blue-600"} 
                            size={18}
                        />
                    }
                />
            </header>

            <section className='w-full flex flex-col items-center justify-center gap-7'>
                <CoverArt name={song.album.name} coverArt={song.album.coverArt} />

                <Name songName={song.name} bandName={song.band} />

                <SeekBar
                    timeInfo={{ duration, timestamp: timestamp.value }}
                    changeToSeeking={playerState.seek}
                    controls={{ pause, seek }}
                />

                <ControlGroup 
                    isPlaying={playerState.value === PlayerState.PLAYING} 
                    togglePlay={togglePlay} 
                />
            </section>
        </div>
    </>)
}

export default MiniMusicPlayer;