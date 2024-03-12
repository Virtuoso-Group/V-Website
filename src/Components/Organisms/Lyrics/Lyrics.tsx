import { LyricsObject, LyricsStatus, SyncedLyrics, UnsyncedLyrics } from '../../../Utils/types/lyrics'
import Synced from './LyricTypes/Synced';
import FormattedLyrics from './LyricTypes/Formatted';
import { motion } from 'framer-motion';
import { Instrumental } from './LyricTypes/Instrumental';
import { ReactElement } from 'react';

type Props = 
{
    lyrics: LyricsObject,

    seek: (timestamp: number) => void,
}

const Lyrics = (props: Props) => 
{
    const { lyrics, seek } = props;

    const LyricsObj: { [index in LyricsStatus]: ReactElement } =
    {
        "Synced": <Synced lines={(lyrics as SyncedLyrics).value} seek={seek} />,

        "Unsynced": <FormattedLyrics lyrics={(lyrics as UnsyncedLyrics).value} />,

        "Instrumental": <Instrumental />,

        "Unavailable": <></>
    }

    return (
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
            {LyricsObj[lyrics.status]}
        </motion.div>
    )
}

export default Lyrics