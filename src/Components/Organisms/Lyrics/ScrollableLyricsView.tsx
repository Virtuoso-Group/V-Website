import { RefObject, memo, useEffect, useRef } from "react";
import { Lyrics } from "../../../Utils/types/lyrics";
import {  useLyrics } from "../../../Utils/hooks/lyricsHooks";
import { useTrackTimestamp } from "../../../Utils/hooks/useMusicPlayer";

const Line = memo((props: {  value: string, isSelected: boolean,  onClick: () => void }) =>
{
    const ref = useRef<HTMLParagraphElement>(null);
    const hasMounted = useRef<boolean>(false)

    const smoothScroll = () =>  ref.current?.scrollIntoView({ behavior: 'smooth', block: "center", inline: "center" });

    const instantScroll = () => ref.current?.scrollIntoView({ block: "center", inline: "center" });
    
    useEffect(() => 
    {
        if (props.isSelected) 
        {
            instantScroll()
        }
    
        hasMounted.current = true;
    }, [])
    
    useEffect(() => 
    {        
        if (hasMounted.current && props.isSelected) 
        {
            smoothScroll()
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
    audioRef: RefObject<HTMLAudioElement>,
    trackID: string,

    lines: Lyrics,

    seek: (timestamp: number) => void,
}

const ScrollableLyrics = (props: Props) =>
{
    const { audioRef, trackID, lines, seek } = props;
      
    const lyrics = useLyrics(trackID, lines);

    useTrackTimestamp(trackID, audioRef, 10, lyrics.update, lyrics.seek)
    
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

export default ScrollableLyrics