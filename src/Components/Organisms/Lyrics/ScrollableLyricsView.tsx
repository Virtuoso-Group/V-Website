import { useEffect, useRef } from "react";
import { useLyricsReader } from "../../../Utils/hooks/lyricsHooks";
import { SeekFunctionType } from "../../../Utils/types";
import { Lyrics } from "../../../Utils/types/lyrics";

interface Props 
{ 
    trackID: string,
    lyrics: Lyrics,
    timestamp: number,

    seek: (timestamp: number) => void,
    setSeekLine: (seekLineFunction: SeekFunctionType) => void
}


const Line = (props: {  value: string, isSelected: boolean,  onClick: () => void }) =>
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
                    "font-bold drop-shadow-5xl py-[18px] text-white text-2xl XGA:text-5xl"
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
}

const ScrollableLyricsView = (props: Props) =>
{
    const { trackID, timestamp, lyrics, seek, setSeekLine } = props

    const { line: highlightedLine, seekLine } = useLyricsReader(trackID, timestamp, lyrics);

    useEffect(() => 
    {               
        console.log("lyrics: ", lyrics);
                         
        setSeekLine(() => seekLine);
        
        return () => { }
    }, [])
    
    return (
        <div className="z-[50] h-full w-full overflow-scroll flex flex-col items-center gap-10 py-10">
            {
                lyrics.map((line, index) =>
                {
                    const isSelected = JSON.stringify(highlightedLine) === JSON.stringify(line);

                    console.log("isSelected: ", index, isSelected);
                    
                    // console.log("value.index : ", value.index );
                    
                    // const isSelected = value.index === index && value.isVisible;

                    return (
                        <Line 
                            key={index}
                            isSelected={isSelected}
                            value={line.value} 
                            onClick={() => seek(line.interval.start)}
                        />
                    )
                })
            }
            
        </div> 
    )
}

export default ScrollableLyricsView