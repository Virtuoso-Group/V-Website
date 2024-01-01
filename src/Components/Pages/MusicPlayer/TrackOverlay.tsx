import CoverArt from '../../Atoms/CoverArt'
import { SeekLineFunctionType } from '../../../Utils/types'

import { MdLyrics } from 'react-icons/md'

import { AnimatePresence, motion } from 'framer-motion'

import { memo, useEffect, useRef, useState } from 'react'
import { Track } from '../../../Utils/types/track'
import LyricsView from '../../Organisms/Lyrics/LyricsView'
import ButtonIcon from '../../Atoms/ButtonIcon'
import { PlayerState } from '../../../Utils/hooks/usePlayerControls'
import { releaseURL } from '../../../API/config'


const Background = memo((props: {  playerState: PlayerState, timestamp: number, coverArt: string, video?: string }) =>
{
    const { playerState } = props;
    
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => 
    {        
        if (playerState === PlayerState.PLAYING) 
        {            
            videoRef.current?.play();
        }
        else if ([PlayerState.PAUSED, PlayerState.STOPPED].includes(playerState))
        {
            videoRef.current?.pause();
        }
    }, [playerState, videoRef.current?.duration])
    

    return (
        <div className='z-[30] absolute h-full w-full'>
            <img 
                className='z-[1] absolute  h-full w-full object-cover'
                src={props.coverArt}
                title={"Background"}
                alt={"Background"}
                loading='eager'
            />

            <div className='z-[2] absolute h-full w-full backdrop-blur-sm' />    
        </div>
    )
})

const CoverArtContainer = memo((props: 
    { 
        release: 
        {
            _id: string
            title: string,
        }, 
    areLyricsUnavailable: boolean , toggleLyrics: () => void }) =>
{
    const { release } = props;
    
    const coverArt = `${releaseURL}/${release._id}/cover_art.jpeg`;

    return ( 
        <motion.div 
            layout
            className='relative h-full flex justify-end aspect-square object-fit drop-shadow-2xl'
            transition={{ duration: 0.25 }}
        >
            <CoverArt 
                className={`z-[50] absolute h-full w-full rounded-lg `}
                name={release.title}
                coverArt={coverArt?? ""} 
                loading={"eager"}
            />
        </motion.div>
    )
})

interface Props
{   
    playerState: PlayerState,
    track: Track, 
    timestamp: number, 
    seek: (timestamp: number) => void,

    setSeekLine: (seekLineFunction: SeekLineFunctionType) => void,
    
    areLyricsVisible: boolean,
    toggleLyrics: () => void
}

const TrackOverlay = memo((props: Props) => 
{
    const { playerState, track, timestamp, seek, setSeekLine } = props;
    
    const coverArt = `${releaseURL}/${track.release._id}/cover_art.jpeg`;

    return (
        <motion.div 
            className={`bg-blue-600  z-[49] fixed grid w-screen bottom-10 min-h-screen jutsfiy-center items-center`}
            initial={{  opacity: 0 }}
            animate={{  opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
        >
            <Background 
                playerState={playerState}
                timestamp={timestamp}
                coverArt={coverArt} 
            />

            <section className={`z-[99] h-[550px] flex w-full justify-center items-center gap-10`}>
                <CoverArtContainer 
                    release={track.release} 
                    areLyricsUnavailable={true}
                    toggleLyrics={props.toggleLyrics} 
                />

                {/* <AnimatePresence>
                    {
                        track.lyrics.status !== "unavailable" && props.areLyricsVisible
                    && 
                        <LyricsView 
                            timestamp={timestamp}
                            trackID={track._id}
                            lyricsObj={track.lyrics}

                            seek={seek}
                            setSeekLine={setSeekLine}
                        />
                    }
                </AnimatePresence> */}

                {/* <div className='z-[50] flex absolute top-[calc(64px+50px)] right-0 mx-20'>
                    {
                        track.lyrics.status !== "unavailable"
                    &&
                        <ButtonIcon 
                            className=
                            {`  
                                z-[1]
                                h-[35px] 
                                m-4
                                aspect-square 
                                rounded-full bg-slate-300

                                flex items-center justify-center
                            `}
                            name='showLyrics'
                            icon={<MdLyrics />}

                            onClick={props.toggleLyrics}
                        />
                    }
                </div> */}
            </section>
        </motion.div>       
    )
})

export default TrackOverlay