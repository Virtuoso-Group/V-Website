import { RefObject } from 'react';
import { LyricsObject } from '../../../Utils/types/lyrics'
import ScrollableLyrics from './ScrollableLyricsView';
import UnsyncedLyricsView from './UnsyncedLyricsView';
import { motion } from 'framer-motion';

type Props = 
{
    audioRef: RefObject<HTMLAudioElement>,
    id: string,
    lyrics: LyricsObject,

    seek: (timestamp: number) => void,
}

const LyricsView = (props: Props) => 
{
    const { audioRef, id, lyrics, seek } = props;

    return (
        <motion.div 
            layout
            className=
            {`
                absolute SD:relative
                w-full SD:w-fit
                
                SD:flex SD:justify-center SD:items-center
                h-full SD:aspect-square
                px-4
                
                bg-black/50 SD:rounded-lg overflow-y-scroll
                
                select-none

                backdrop-blur-sm	
            `}

            initial={{  opacity: 0 }}
            animate={{  opacity: [0, 1] }}

            exit={{  opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            {
                lyrics.status === "Synced"
            ?
                <ScrollableLyrics audioRef={audioRef} trackID={id} lines={lyrics.value} seek={seek} />
            :
                lyrics.status === "Unsynced"
            ?
                <UnsyncedLyricsView lyrics={lyrics.value} />
            :
                lyrics.status === "Instrumental"
            &&
                <div className=
                    {`
                        z-[50]
                        flex justify-center items-center

                        gap-10 
                        pt-[5rem] SD:pt-0 
                        pb-[calc(6.5rem+5rem)] SD:pb-0
                        SD:py-10
                        h-full w-full  
                    `}
                >
                    <pre 
                        className=
                        {`
                            
                             font-bold 
                            text-white text-xl XGA:text-3xl text-center  drop-shadow-5xl
                        `}
                    >
                        ♪ Instrumental Track ♪
                    </pre>
                </div>
            }
        </motion.div>
    )
}

export default LyricsView