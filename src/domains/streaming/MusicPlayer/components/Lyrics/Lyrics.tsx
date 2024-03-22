import { LyricsStatus, SyncedLyrics, UnsyncedLyrics } from '../../../../../Utils/types/lyrics'
import Synced from './components/Synced/Synced';
import FormattedLyrics from './components/Formatted';
import { AnimatePresence, motion } from 'framer-motion';
import { Instrumental } from './components/Instrumental';
import { ReactElement, useContext } from 'react';
import { PlayerContext } from '../../PlayerContext';


const Lyrics = () => 
{
    const { lyrics } = useContext(PlayerContext)

    const LyricsObj: { [index in LyricsStatus]: ReactElement } =
    {
        "Synced": <Synced lines={(lyrics.value as SyncedLyrics).value} />,

        "Unsynced": <FormattedLyrics lyrics={(lyrics.value as UnsyncedLyrics).value} />,

        "Instrumental": <Instrumental />,

        "Unavailable": <></>
    }

    return (
        <AnimatePresence>
            {
                lyrics.value.status !== "Unavailable" && lyrics.areVisible 
            &&
                <motion.div 
                    layout
                    className=
                    {`
                        z-[90]
                        absolute SD:relative
                        w-full SD:w-[30rem]
                        
                        SD:flex SD:justify-center SD:items-center
                        h-full SD:aspect-square
                        px-4
                        
                        bg-black/50 SD:rounded-lg overflow-y-scroll
                        
                        select-none

                        backdrop-blur-sm	
                    `}

                    initial={{  opacity: 0 }}
                    animate={{  opacity: [0, 1] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {LyricsObj[lyrics.value.status]}
                </motion.div>
            }

        </AnimatePresence>
    )
}

export default Lyrics