import { SelectedLine } from '../../../Utils/hooks/lyricsHooks';
import { LyricsObject } from '../../../Utils/types/lyrics'
import ScrollableLyricsView from './ScrollableLyricsView';
import UnsyncedLyricsView from './UnsyncedLyricsView';
import { motion } from 'framer-motion';

type Props = 
{
    id: string,
    lyrics: LyricsObject,
    selectedLine: SelectedLine,

    seek: (timestamp: number) => void,
}

const LyricsView = (props: Props) => 
{
    const { id, lyrics, seek } = props;

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
            `}

            initial={{  opacity: 0 }}
            animate={{  opacity: [0, 1] }}

            exit={{  opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            {
                lyrics.status === "Synced"
            ?
                <ScrollableLyricsView 
                    trackID={id} 
                    lyrics={lyrics.value} 
                    selectedLine={props.selectedLine}
                    seek={seek}
                />
            :
                lyrics.status === "Unsynced"
            ?
                <UnsyncedLyricsView lyrics={lyrics.value} />
            :
                lyrics.status === "Instrumental"
            &&
                <div className='mt-[25%] h-1/2 w-full flex justify-center items-center'>
                    <pre 
                        className=
                        {`
                            w-fit h-fit font-bold 
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