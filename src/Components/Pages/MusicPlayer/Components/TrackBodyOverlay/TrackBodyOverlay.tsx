import { MotionCoverArt } from '../../../../Atoms/CoverArt'

import { MdLyrics } from 'react-icons/md'

import { AnimatePresence, motion } from 'framer-motion'

import { memo, useContext } from 'react'
import Lyrics from '../../../../Organisms/Lyrics/Lyrics'
import ButtonIcon from '../../../../Atoms/ButtonIcon'
import { LyricsObject } from '../../../../../Utils/types/lyrics'
import { RemoveScroll } from 'react-remove-scroll'
import { PlayerContext } from '../../MusicPlayer'

import TrackInformation from './components/TrackInformation'

type Release =
{ 
    _id: string, 
    title: string, 
    coverArt: string 
}

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

            <div className='z-[2] absolute h-full w-full brightness-50 SD:brightness-100 backdrop-blur-sm' />    
        </div>
    )
})



interface ControlsProps 
{
    areLyricsAvailable: boolean,
    toggleLyrics: () => void
}

const Controls = (props: ControlsProps) =>
{
    const { areLyricsAvailable, toggleLyrics } = props;

    return (
        <div className='absolute top-0 flex right-0'>
            {
                areLyricsAvailable
            &&
                <ButtonIcon 
                    className=
                    {`  
                        z-[99]
                        flex items-center justify-center

                        size-[2.1875rem]
                        m-4
                        
                        rounded-full bg-slate-300
                    `}
                    name='showLyrics'
                    icon={<MdLyrics size={"1rem"}/>}

                    onClick={toggleLyrics}
                />
            }
        </div>
    )
}




interface Props
{       
    release: Release

    value: LyricsObject,
    _id: string,
            
    areVisible: boolean,
        
    toggle: () => void
    
    seek: (timestamp: number) => void,
}

const PlayerOverlay = memo((props: Props) => 
{
    const { release } = props;
            
    const { websitePadding, seek } = useContext(PlayerContext);
    
    return (
        <RemoveScroll>
            <motion.div 
                layout
                className={`pointer-events-auto z-[49] fixed grid min-w-[375px] w-full  h-full bg-blue-300 jutsfiy-center items-center pt-[4rem] pb-[5.25rem]`}
                initial={{  opacity: 0 }}
                animate={{  opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
            >
                <Background coverArt={release.coverArt} />

                <section 
                    className=
                    {`
                        relative
                        z-[40]
                        h-full SD:h-[80%]
                        ${websitePadding}
                        flex
                        
                        justify-center SD:items-center 

                        gap-10
                    `}
                >
                    
                    <TrackInformation release={release} />

                    <AnimatePresence>
                        { 
                            props.value.status !== "Unavailable" && props.areVisible
                        && 
                            <Lyrics lyrics={props.value} seek={seek} />
                        }
                    </AnimatePresence>

                    <Controls 
                        areLyricsAvailable={props.value.status !== "Unavailable"} 
                        toggleLyrics={props.toggle}
                    />
                </section>
            </motion.div>   
        </RemoveScroll>    
    )
})

export default PlayerOverlay