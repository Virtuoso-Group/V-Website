import { useCallback, useContext } from "react";
import { Lyrics } from "../../../Utils/types/lyrics";
import {  useLyrics } from "../../../Utils/hooks/lyricsHooks";
import Line from "../../Molecules/Line";
import { PlayerContext } from "../../Pages/MusicPlayer/MusicPlayer";

interface Props 
{ 
    lines: Lyrics,

    seek: (timestamp: number) => void,
}

const ScrollableLyrics = (props: Props) =>
{
    const { trackID } = useContext(PlayerContext);

    const { lines, seek } = props;
      
    const lyrics = useLyrics(trackID, lines);

    const seekWrapper = useCallback((timestamp: number) => seek(timestamp), [])
    
    return (
        <div 
            className=
            {`
                z-[50] 
                SD:h-full w-full overflow-scroll 
                flex flex-col items-center 
                gap-10 
                pt-[5rem] SD:pt-0 
                pb-[calc(6.5rem+5rem)] SD:pb-0
                SD:py-10
            `}
        >
            {
                lines.map((line, index) =>
                {
                    let isSelected = false;

                    if (lyrics.selectedLine) 
                    {
                        isSelected = index === lyrics.selectedLine.index
                    }

                    // seekWrapper(line.interval.start)
                    return (
                        <Line 
                            key={index}
                            isSelected={isSelected}
                            value={line.value}
                            
                            timestamp={line.interval.start}
                            seek={seekWrapper}
                        />
                    )
                })
            }
        </div> 
    )
}

export default ScrollableLyrics