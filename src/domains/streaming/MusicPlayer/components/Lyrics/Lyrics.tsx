import { useContext } from 'react';

import Synced from './components/Synced/Synced';
import FormattedLyrics from './components/Formatted';
import { AnimatePresence, motion } from 'framer-motion';
import { Instrumental } from './components/Instrumental';

import { PlayerContext } from '../../PlayerContext';
import { websitePadding } from '../../../../../config/style';


interface Props
{
    className?: string
}

const Lyrics = (props: Props) => 
{
    const { track, lyricsObj } = useContext(PlayerContext);

    return (
        <AnimatePresence>
            {
                lyricsObj.areVisible 
            &&
                <motion.div 
                    layout
                    className=
                    {`
                        z-[90]
                        ${websitePadding}
                        no-scrollbar
                        bg-black/50 overflow-y-scroll
                        
                        select-none

                        backdrop-blur-sm
                        
                        ${props.className}
                    `}

                    initial={{  opacity: 0 }}
                    animate={{  opacity: [0, 1] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >

                    {/* TODO: I need to refactor the hell outta this. It's ugly */}
                    {
                        track.type === "instrumental"
                    ?
                        <Instrumental />
                    :
                        lyricsObj.lyrics
                    ?
                        lyricsObj.lyrics.status === "Synced"
                    ?
                        <Synced lines={lyricsObj.lyrics.value} />
                    :
                        lyricsObj.lyrics.status === "Unsynced"
                    ? 
                        <FormattedLyrics lyrics={lyricsObj.lyrics.value} />
                    :
                        <></>
                    :
                        <></>
                    }
                </motion.div>
            }
        </AnimatePresence>
    )
}

export default Lyrics