import { useContext, useEffect } from "react";
import { useLyricsReader } from "../../Utils/hooks/lyricsHooks";
import { Lyrics, LyricsObject, SeekLineFunctionType, Track } from "../../Utils/types";
import { TrackContext } from "../SongContext";

interface Props 
{ 
    trackID: number,
    lyricsObject: LyricsObject,
    timestamp: number,
}

const LyricsView = (props: Props) =>
{
    const { trackID, timestamp, lyricsObject } = props

    const { lyrics: lyricsLogic } = useContext(TrackContext)
    const { line, seekLine } = useLyricsReader(trackID, timestamp, lyricsObject);

    useEffect(() => 
    {                
        if (seekLine) 
        {
            lyricsLogic.setSeekLine(seekLine);
        }
        
        return () => 
        {
            
        }
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