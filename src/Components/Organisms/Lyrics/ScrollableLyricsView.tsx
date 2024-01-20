import { memo, useCallback, useEffect, useRef } from "react";
import { Lyrics } from "../../../Utils/types/lyrics";
import { SelectedLine } from "../../../Utils/hooks/lyricsHooks";

const Line = memo((props: {  value: string, isSelected: boolean,  onClick: () => void }) =>
{
    const ref = useRef<HTMLParagraphElement>(null);

    useEffect(() => 
    {        
        if (props.isSelected) 
        {
            ref.current?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        }
    }, [props.isSelected])
    
    const value = !!props.value.length? props.value: "♪";

    return (
        <p 
            ref={ref}
            className=
            {`
                 
                
                ${
                    props.isSelected
                ? 
                    "font-bold drop-shadow-5xl py-[1.125rem] text-white text-2xl XGA:text-5xl"
                : 
                    "text-xl XGA:text-3xl text-white/60"
                }

                cursor-pointer
                
                h-fit
                text-center 
            `}

            onClick={props.onClick}
        >
            {value}
        </p>
    )
})

interface Props 
{ 
    trackID: string,
    lyrics: Lyrics,
    selectedLine: SelectedLine,

    seek: (timestamp: number) => void,
}

const ScrollableLyricsView = (props: Props) =>
{
    const { selectedLine, lyrics, seek } = props;
      
    const seekLine = useCallback((timestamp: number) =>
    {
        seek(timestamp)
    }, [])

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
                lyrics.map((line, index) =>
                {
                    let isSelected = false;

                    if (selectedLine) 
                    {
                        isSelected = index === selectedLine.index
                    }

                    return (
                        <Line 
                            key={index}
                            isSelected={isSelected}
                            value={line.value} 
                            onClick={() => seekLine(line.interval.start)}
                        />
                    )
                })
            }
        </div> 
    )
}

export default ScrollableLyricsView