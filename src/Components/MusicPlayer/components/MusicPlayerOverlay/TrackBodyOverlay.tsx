import { MotionCoverArt } from '../../../Atoms/CoverArt'

import { MdLyrics } from 'react-icons/md'

import { AnimatePresence, motion } from 'framer-motion'

import { memo, useContext } from 'react'
import Lyrics from '../Lyrics/Lyrics'
import ButtonIcon from '../../../Atoms/ButtonIcon'
import { LyricsObject } from '../../../../Utils/types/lyrics'
import { RemoveScroll } from 'react-remove-scroll'

import TrackInformation from './components/TrackInformation'
import { PlayerContext } from '../../PlayerContext'


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

const Buttons = (props: ControlsProps) =>
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
    lyrics: LyricsObject,
            
    areVisible: boolean,
        
    toggle: () => void
}

const PlayerOverlay = memo((props: Props) => 
{            
    const { websitePadding, release, seekTimestamp } = useContext(PlayerContext);
    
    return (
        <RemoveScroll>
            <motion.div 
                layout
                className=
                {`  
                    z-[50] pointer-events-auto 
                    fixed grid min-w-[375px] w-full  h-full bg-blue-300 jutsfiy-center items-center pt-[4rem] pb-[5.25rem]`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
            >
                <Background coverArt={release.coverArt} />

                <section 
                    className=
                    {`
                        z-[50]
                        ${websitePadding}
                        relative
                        h-full SD:h-[80%] 
                        gap-10
                        
                        flex
                        justify-center SD:items-center 
                    `}
                >
                    <MotionCoverArt
                        id={`${release._id}${"desktop"}`}
                        className={`hidden SD:flex SD:w-[30rem] rounded-md SD:rounded-lg `}                
                        name={release.title}
                        coverArt={release.coverArt} 
                        loading={"eager"}
                    />

                    <TrackInformation className={"flex SD:hidden"} />

                    <AnimatePresence>
                        { 
                            props.lyrics.status !== "Unavailable" && props.areVisible
                        && 
                            <Lyrics lyrics={props.lyrics} seek={seekTimestamp} />
                        }
                    </AnimatePresence>

                    <Buttons 
                        areLyricsAvailable={props.lyrics.status !== "Unavailable"} 
                        toggleLyrics={props.toggle}
                    />
                </section>
            </motion.div>   
        </RemoveScroll>    
    )
})

export default PlayerOverlay