import { useEffect } from "react";
import { useLyricsReader } from "../../../Utils/hooks/lyricsHooks";
import { SeekLineFunctionType } from "../../../Utils/types";
import { Lyrics } from "../../../Utils/types/lyrics";

interface Props 
{ 
    trackID: string,
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
        setSeekLine(() => seekLine);
        
        return () => { }
    }, [])
    
    return (
        <p className="z-[50] font-bold text-white text-5xl h-fit text-center drop-shadow-5xl">
            {line.value}
        </p>
    )
}

export default SyncedLyricsView