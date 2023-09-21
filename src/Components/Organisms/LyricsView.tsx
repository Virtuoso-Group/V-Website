import { useEffect } from "react";
import { useLyricsReader } from "../../Utils/hooks/lyricsHooks";
import { SeekLineFunctionType } from "../../Utils/types";
import { LyricsObject, SyncedLyrics } from "../../Utils/types/lyrics";

interface Props 
{ 
    trackID: number,
    lyricsObject: SyncedLyrics,
    timestamp: number,

    setSeekLine: (seekLineFunction: SeekLineFunctionType) => void
}

const LyricsView = (props: Props) =>
{
    const { trackID, timestamp, lyricsObject, setSeekLine } = props

    const { line, seekLine } = useLyricsReader(trackID, timestamp, lyricsObject.lyrics);

    useEffect(() => 
    {                
        if (seekLine) 
        {
            setSeekLine(seekLine);
        }
        
        return () => { }
    }, [])
    
    return (
        <div className='min-w-[375px] w-[90%] h-full flex overflow-hidden'>
            <section className="bg-red select-none h-full w-full flex items-center justify-center p-4">
                <p className="font-bold text-white text-5xl h-fit text-center drop-shadow-5xl">
                    {line}
                </p>
            </section>
        </div>
    )
}

export default LyricsView