import { useContext, useEffect } from "react";
import { useLyricsReader } from "../../Utils/hooks/lyricsHooks";
import { SeekLineFunctionType, Track } from "../../Utils/types";
import { TrackContext } from "../SongContext";

interface Props 
{ 
    track: Track, 
    timestamp: number,
}

const LyricsView = (props: Props) =>
{
    const { track, timestamp } = props

    const { lyrics } = useContext(TrackContext)
    const { line, seekLine } = useLyricsReader(track.id, timestamp, track.lyrics);

    useEffect(() => 
    {        
        console.log("seekLine lyricsview: ", seekLine);
        
        if (seekLine) 
        {
            lyrics.setSeekLine(seekLine);
        }
        
        return () => 
        {
            
        }
    }, [])
    
    return (
        <div className='border min-w-[375px] w-[90%] h-full flex bg-slate-900 rounded-lg overflow-hidden'>
            <section className="bg-red select-none h-full w-full flex items-center justify-center p-4">
                <p className=" font-bold text-white text-5xl h-fit text-center">
                    {line}
                </p>
            </section>
        </div>
    )
}

export default LyricsView