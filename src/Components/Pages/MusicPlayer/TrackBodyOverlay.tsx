import CoverArt from '../../Atoms/CoverArt'

import { MdLyrics } from 'react-icons/md'

import { AnimatePresence, motion } from 'framer-motion'

import { memo, useContext } from 'react'
import Lyrics from '../../Organisms/Lyrics/Lyrics'
import ButtonIcon from '../../Atoms/ButtonIcon'
import { getCoverArt } from '../../../config/config'
import { LyricsObject } from '../../../Utils/types/lyrics'
import { RemoveScroll } from 'react-remove-scroll'
import { PlayerContext } from './MusicPlayer'
import { MotionCoverArt } from '../../motion/MotionCoverArt'

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

const CoverArtContainer = (props: { _id: string, title: string }) =>
{
    const { _id } = props;
    
    console.log(`release/${_id}`);
    return ( 
        <motion.div 
            layout layoutRoot
            className=
            {`
                relative 
                w-full SD:w-fit 
                SD:h-full 
                SD:flex justify-center aspect-square object-fit drop-shadow-2xl
            `}
        >
            <MotionCoverArt
                id={_id}
                className={`z-[40] absolute h-full rounded-md SD:rounded-lg `}                
                name={props.title}
                coverArt={getCoverArt(_id)} 
                loading={"eager"}
            />
        </motion.div>
    )
}

interface Props
{       
    release: { _id: string, title: string }

    value: LyricsObject,
    _id: string,
            
    areVisible: boolean,
        
    toggle: () => void
    
    seek: (timestamp: number) => void,
}

const PlayerOverlay = memo((props: Props) => 
{
    const { release, seek } = props;
            
    const { websitePadding } = useContext(PlayerContext);
    
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
                <Background coverArt={getCoverArt(release._id)} />

                <section 
                    className=
                    {`
                        relative
                        z-[40]
                        h-full SD:h-[80%]
                        ${websitePadding}
                        flex justify-center items-center 

                        gap-10
                    `}
                >
                    <CoverArtContainer {...release} />

                    <AnimatePresence>
                        { 
                            props.value.status !== "Unavailable" && props.areVisible
                        && 
                            <Lyrics lyrics={props.value} seek={seek} />
                        }
                    </AnimatePresence>

                    <div className='absolute top-0 flex right-0'>
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
        </RemoveScroll>    
    )
})

export default PlayerOverlay