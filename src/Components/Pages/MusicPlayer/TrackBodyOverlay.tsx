import CoverArt from '../../Atoms/CoverArt'
import { SeekFunctionType } from '../../../Utils/types'

import { MdLyrics } from 'react-icons/md'

import { AnimatePresence, motion } from 'framer-motion'

import { memo, useEffect, useRef } from 'react'
import { Track } from '../../../Utils/types/track'
import LyricsView from '../../Organisms/Lyrics/LyricsView'
import ButtonIcon from '../../Atoms/ButtonIcon'
import { PlayerState } from '../../../Utils/hooks/useMusicPlayer'
import { releaseURL } from '../../../config/config'
import { LyricsObject } from '../../../Utils/types/lyrics'


const Background = memo((props: { coverArt: string, video?: string }) =>
{
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
        className=
        {`
            absolute SD:relative 
            w-screen SD:w-fit 
            SD:h-full 
            SD:flex justify-center aspect-square object-fit drop-shadow-2xl
        `}
    >
        <CoverArt 
            className={`z-[40] absolute h-full SD:rounded-lg `}
            name={release.title}
            coverArt={coverArt?? ""} 
            loading={"eager"}
        />
    </motion.div>
    )
})

interface Props
{       
    timestamp: number, 
    seek: (timestamp: number) => void,

    setSeekLine: (seekLineFunction: SeekFunctionType) => void,
    
    release:{ _id: string, title: string }

    lyrics:
    {
        _id: string,
        value: LyricsObject,
        areVisible: boolean,
        
        toggle: () => void
    }
}

const TrackBodyOverlay = memo((props: Props) => 
{
    const 
    { 
        timestamp, release, lyrics,  

        seek, setSeekLine 
    } = props;
    
    const coverArt = `${releaseURL}/${release._id}/cover_art.jpeg`;

    return (
        <motion.div 
            className={`bg-blue-600  z-[49] fixed grid w-screen bottom-10 min-h-screen SD:jutsfiy-center SD:items-center`}
            initial={{  opacity: 0 }}
            animate={{  opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
        >
            <Background coverArt={coverArt} />

            <section 
                className=
                {`
                    z-[99]
                    mt-[6.5rem] SD:mt-[4rem]  
                    h-full SD:h-[23rem] XGA:h-[30rem]  
                    
                    SD:flex SD:justify-center SD:items-center 

                    gap-10
                `}
            >
                <CoverArtContainer 
                    release={release} 
                    areLyricsUnavailable={true}
                    toggleLyrics={lyrics.toggle} 
                />

                <AnimatePresence>
                    { 
                        lyrics.value.status !== "Unavailable" && lyrics.areVisible
                    && 
                        <LyricsView 
                            timestamp={timestamp}
                            
                            id={lyrics._id}
                            lyrics={lyrics.value}

                            seek={seek}
                            setSeekLine={setSeekLine}
                        />
                    }
                </AnimatePresence>

                <div className='z-[99] flex absolute top-[6rem] SD:top-[7.125rem] right-0'>
                    {
                        lyrics.value.status !== "Unavailable"
                    &&
                        <ButtonIcon 
                            className=
                            {`  
                                z-[99]
                                flex items-center justify-center

                                h-[2.1875rem] aspect-square
                                m-4
                                 
                                rounded-full bg-slate-300
                            `}
                            name='showLyrics'
                            icon={<MdLyrics size={"1rem"}/>}

                            onClick={lyrics.toggle}
                        />
                    }
                </div>
            </section>
        </motion.div>       
    )
})

export default TrackBodyOverlay