import { memo, useCallback, useContext, useEffect, useRef, useState } from "react";
import Ball from "./Ball";

import { motion } from "framer-motion";
import { PlayerContext } from "../../../PlayerContext";
import { useTrackTimestamp } from "../../../hooks/useTrackTimestamp";


interface SeekBarProps
{
    className?:string,
}

const SeekBar = memo((props: SeekBarProps) =>
{
    const { track, seek, pause } = useContext(PlayerContext);

    const barContainerRef = useRef<HTMLDivElement>(null);
    
    const barWidth = barContainerRef.current?.getBoundingClientRect().width??1;

    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [currentPercentage, setCurrentPercentage] = useState<number>(0)
    const [ballPosition, setBallPosition] = useState<number>(currentPercentage/100 * barWidth??0);
    

    // TODO: put a useCallback, you don't want the useCurrentTimestamp to redefine itself
    const updatePercentage = useCallback((timestamp: number) =>
    {        
        if (track.duration) 
            setCurrentPercentage((timestamp / track.duration) * 100)
    }, [track.duration])
    
    useEffect(() => 
    {
        const ballPosition = currentPercentage/100 * barWidth??0
        
        setBallPosition(ballPosition)
    }, [currentPercentage, barWidth])
    
    const seekWrapper = useCallback((clientX: number) =>
    {
        const boundingRect = barContainerRef.current?.getBoundingClientRect();

        if (boundingRect) 
        {
            const { x, width } = boundingRect;

            const actualClientX =  clientX - x ;

            const percentage = (actualClientX / width);
                                    
            seek(percentage)
        }     
    }, [seek])

    const hold = useCallback(() =>
    {        
        setIsDragging(true);

        pause();
    }, [pause])

    const release = useCallback((xPoint: number) =>
    {        
        setIsDragging(false)
        seekWrapper(xPoint)
    }, [seekWrapper])


    useTrackTimestamp(750, updatePercentage);
    
    return (
        <div 
            ref={barContainerRef}
            className={`relative w-full h-[0.21875rem] bg-slate-400 cursor-pointer flex items-center ${props.className}`}
            onClick={e => seekWrapper(e.clientX)}
        >
            <motion.div 
                className='absolute h-full bg-white'
                animate={{ width: `${currentPercentage?? "0"}%` }}
                transition={{  duration: 0.01, type: "tween", bounce: 0.25 }}
            />
        
            <Ball 
                isDragging={isDragging}
                ballPosition={ballPosition?? 0}
                hold={hold}
                release={release}
            />
        </div>
    )
})

export default SeekBar;