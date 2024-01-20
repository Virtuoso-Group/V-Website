import CoverArt from '../../Atoms/CoverArt'

import { MdLyrics } from 'react-icons/md'

import { AnimatePresence, motion } from 'framer-motion'

import { memo } from 'react'
import LyricsView from '../../Organisms/Lyrics/LyricsView'
import ButtonIcon from '../../Atoms/ButtonIcon'
import { releaseURL } from '../../../config/config'
import { LyricsObject } from '../../../Utils/types/lyrics'
import { SelectedLine } from '../../../Utils/hooks/lyricsHooks'


const Background = memo((props: { coverArt: string }) =>
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

const CoverArtContainer = memo((props: { _id: string, title: string }) =>
{
    const { _id } = props;
    
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
                name={props.title}
                coverArt={`${releaseURL}/${_id}/cover_art.jpeg`?? ""} 
                loading={"eager"}
            />
        </motion.div>
    )
})

interface Props
{       
    release: { _id: string, title: string }

    selectedLine: SelectedLine,
    value: LyricsObject,
    _id: string,
        
        areVisible: boolean,
        
        
    toggle: () => void
    

    seek: (timestamp: number) => void,
}

const PlayerOverlay = memo((props: Props) => 
{
    const { release, seek } = props;
            
    return (
        <motion.div 
            className={`bg-blue-600  z-[49] fixed grid w-screen bottom-10 min-h-screen SD:jutsfiy-center SD:items-center`}
            initial={{  opacity: 0 }}
            animate={{  opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
        >
            <Background coverArt={`${releaseURL}/${release._id}/cover_art.jpeg`} />

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
                <CoverArtContainer {...release} />

                <AnimatePresence>
                    { 
                        props.value.status !== "Unavailable" && props.areVisible
                    && 
                        <LyricsView 
                            id={props._id} 
                            lyrics={props.value} 
                            selectedLine={props.selectedLine}
                            seek={seek} 
                        />
                    }
                </AnimatePresence>

                <div className='z-[99] flex absolute top-[6rem] SD:top-[7.125rem] right-0'>
                    {
                        props.value.status !== "Unavailable"
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

                            onClick={props.toggle}
                        />
                    }
                </div>
            </section>
        </motion.div>       
    )
})

export default PlayerOverlay