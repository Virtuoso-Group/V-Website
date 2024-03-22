import { memo, useCallback, useContext, useRef, useState } from "react";
import Ball from "./Ball";

import { motion } from "framer-motion";
import { PlayerContext } from "../../../PlayerContext";
import { useTrackTimestamp } from "../../../hooks/useTrackTimestamp";
import useTrackPercentage from "../../../hooks/useTrackPercentage";


interface SeekBarProps
{
    className?:string,
}

const SeekBar = memo((props: SeekBarProps) =>
{
    const { controls } = useContext(PlayerContext);

    const barContainerRef = useRef<HTMLDivElement>(null);
    const barWidth = barContainerRef.current?.getBoundingClientRect().width??1;

    const [isDragging, setIsDragging] = useState<boolean>(false);

    const percentage = useTrackPercentage();

    
    const seekWrapper = useCallback((clientX: number) =>
    {
        const boundingRect = barContainerRef.current?.getBoundingClientRect();

        if (boundingRect) 
        {
            const { x, width } = boundingRect;

            const actualClientX =  clientX - x ;

            const percentage = (actualClientX / width);
                                    
            controls.seek(percentage)
        }     
    }, [controls.seek])

    const hold = useCallback(() =>
    {        
        setIsDragging(true);

        controls.pause();
    }, [controls.pause])

    const release = useCallback((xPoint: number) =>
    {        
        setIsDragging(false)
        seekWrapper(xPoint)
    }, [seekWrapper])

    
    return (
        <div 
            ref={barContainerRef}
            className={`relative w-full h-[0.21875rem] bg-slate-400 cursor-pointer flex items-center ${props.className}`}
            onClick={e => seekWrapper(e.clientX)}
        >
            <motion.div 
                className='absolute h-full bg-white'
                animate={{ width: `${percentage}%` }}
                transition={{  duration: 0.01, type: "tween", bounce: 0.25 }}
            />
        
            <Ball 
                isDragging={isDragging}
                currentPercentage={percentage}
                containerWidth={barWidth}

                hold={hold}
                release={release}
            />
        </div>
    )
})

export default SeekBar;