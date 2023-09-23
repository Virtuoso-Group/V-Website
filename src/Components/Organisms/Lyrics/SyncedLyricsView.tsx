import { useEffect } from "react";
import { useLyricsReader } from "../../../Utils/hooks/lyricsHooks";
import { SeekLineFunctionType } from "../../../Utils/types";
import { Lyrics } from "../../../Utils/types/lyrics";

interface Props 
{ 
    trackID: number,
    lyrics: Lyrics,
    timestamp: number,

    setSeekLine: (seekLineFunction: SeekLineFunctionType) => void
}

const SyncedLyricsView = (props: Props) =>
{
    const { trackID, timestamp, lyrics, setSeekLine } = props

    const { line, seekLine } = useLyricsReader(trackID, timestamp, lyrics);

    useEffect(() => 
    {                
        if (seekLine) 
        {
            seekLine(timestamp)
            setSeekLine(seekLine);
        }
        
        return () => { }
    }, [])
    
    return (
        <p className="font-bold text-white text-5xl h-fit text-center drop-shadow-5xl">
            {line}
        </p>
    )
}

export default SyncedLyricsView