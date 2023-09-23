import { SeekLineFunctionType } from '../../../Utils/types';
import { LyricsObject } from '../../../Utils/types/lyrics'
import SyncedLyricsView from './SyncedLyricsView';
import UnsyncedLyricsView from './UnsyncedLyricsView';
import { motion } from 'framer-motion';

type Props = 
{
    timestamp: number,

    trackID: number,
    lyricsObj: LyricsObject,

    setSeekLine: (seekLineFunction: SeekLineFunctionType) => void
}

const LyricsView = (props: Props) => 
{
    const { timestamp, trackID,  lyricsObj, setSeekLine } = props;

    return (
        <motion.div 
            layout
            className=
            {`
                flex 
                h-full 
                w-[700px] px-4
                justify-center 

                items-center
                bg-black/50 rounded-lg overflow-y-scroll

                select-none
            `}

            initial=
            {{
                height: 0,
                opacity: 0
            }}
            animate=
            {{
                height: "100%",
                opacity: [0,1]
            }}

            exit=
            {{
                height: 0,
                opacity: 0
            }}
            transition=
            {{
                duration: 0.2
            }}
        >
            {
                lyricsObj.status === "available"
            ? 
                
                lyricsObj.isSynced
            ?
                <SyncedLyricsView 
                    timestamp={timestamp} 
                    trackID={trackID} 
                    lyrics={lyricsObj.lyrics} 
                    setSeekLine={setSeekLine}
                />
            :
                <UnsyncedLyricsView lyrics={lyricsObj.lyrics} />
            :
                lyricsObj.status === "instrumental"
            &&
                <pre className="w-fit font-bold text-white text-5xl h-fit text-center  drop-shadow-5xl">
                    ♪ Instrumental Track ♪
                </pre>
            }
        </motion.div>
    )
}

export default LyricsView