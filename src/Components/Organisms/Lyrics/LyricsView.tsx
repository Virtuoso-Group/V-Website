import { SeekFunctionType } from '../../../Utils/types';
import { LyricsObject } from '../../../Utils/types/lyrics'
import ScrollableLyricsView from './ScrollableLyricsView';
import SyncedLyricsView from './SyncedLyricsView';
import UnsyncedLyricsView from './UnsyncedLyricsView';
import { motion } from 'framer-motion';

type Props = 
{
    timestamp: number,
    id: string,
    lyrics: LyricsObject,

    seek: (timestamp: number) => void,
    setSeekLine: (seekLineFunction: SeekFunctionType) => void
}

const LyricsView = (props: Props) => 
{
    const { timestamp, id, lyrics, seek, setSeekLine } = props;

    return (
        <motion.div 
            layout
            className=
            {`
                flex justify-center items-center
                h-full aspect-square
                px-4
                
                bg-black/50 rounded-lg overflow-y-scroll

                select-none
            `}

            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100%", opacity: [0, 1] }}

            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            {
                lyrics.status === "Synced"
            ?
                <ScrollableLyricsView 
                    timestamp={timestamp} 
                    trackID={id} 
                    lyrics={lyrics.value} 
                    seek={seek}
                    setSeekLine={setSeekLine}
                />
            :
                lyrics.status === "Unsynced"
            ?
                <UnsyncedLyricsView lyrics={lyrics.value} />
            :
                lyrics.status === "Instrumental"
            &&
                <pre className="w-fit font-bold text-white text-5xl h-fit text-center  drop-shadow-5xl">
                    ♪ Instrumental Track ♪
                </pre>
            }
        </motion.div>
    )
}

export default LyricsView