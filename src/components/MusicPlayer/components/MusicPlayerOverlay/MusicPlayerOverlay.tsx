import { motion } from 'framer-motion'

import { memo, useContext } from 'react'
import { LyricsObject } from '../../../../Utils/types/lyrics'
import { RemoveScroll } from 'react-remove-scroll'

import { PlayerContext } from '../../PlayerContext'
import DesktopView from './responsive/DesktopView'
import MobileView from './responsive/MobileView'


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


interface Props
{       
    lyrics: LyricsObject,
            
    areVisible: boolean,
        
    toggle: () => void
}

const PlayerOverlay = memo((props: Props) => 
{            
    const { release } = useContext(PlayerContext);
    
    return (
        <RemoveScroll>
            <motion.div 
                layout
                className=
                {`  
                    z-[50] pointer-events-auto 
                    fixed grid min-w-[375px] w-full h-full bg-blue-300 jutsfiy-center items-center pt-[4rem] pb-[5.25rem]
                `}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
            >
                <Background coverArt={release.coverArt} />

                <DesktopView {...props}/>

                <MobileView {...props} />
            </motion.div>   
        </RemoveScroll>    
    )
})

export default PlayerOverlay