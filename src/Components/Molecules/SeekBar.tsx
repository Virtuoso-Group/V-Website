import { useCallback, useEffect, useRef, useState } from "react";
import Ball from "../Atoms/Ball";

import { motion } from "framer-motion";

type TimeInfo =
{
    duration: number, 
    timestamp: number 
}

type Controls = 
{
    seek: (percentage: number) => void
    pause: () => void,
}

interface SeekBarProps
{
    trackID: string,
    timeInfo: TimeInfo,
    controls: Controls,
}

const SeekBar = (props: SeekBarProps) =>
{
    const barContainerRef = useRef<HTMLDivElement>(null);
    const { duration, timestamp: current } = props.timeInfo;
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [ballPosition, setBallPosition] = useState<number>(0);
    const [currentPercentage, setCurrentPercentage] = useState<number>(0)

    const barWidth = barContainerRef.current?.getBoundingClientRect().width??1;

    useEffect(() => 
    {
        // 0 divided by 0 causes NAN, which causes the ball not to initially move
        if (duration) 
        {
            setCurrentPercentage((current / duration) * 100)
        }
    
    }, [current, duration])

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
                                    
            props.controls.seek(percentage)
        }     
    }, [props.controls.seek])

    const hold = useCallback(() =>
    {        
        setIsDragging(true);
        props.controls.pause();
    }, [props.controls])

    const release = useCallback((xPoint: number) =>
    {
        console.log("xPoint: ", xPoint);
        
        setIsDragging(false)
        seekWrapper(xPoint)
    }, [seekWrapper])
    
    return (
    <div 
        ref={barContainerRef}
        className='relative w-full h-[0.21875rem] bg-slate-400 cursor-pointer flex items-center'
        onClick={e => seekWrapper(e.clientX)}
    >
        <motion.div 
            className='z-[1] absolute h-full bg-white'
            animate={{ width: currentPercentage? `${currentPercentage}%`: "0%"}}
            transition={{  duration: 0.25, type: "spring", bounce: 0.25 }}
        />
       
        <Ball 
            isDragging={isDragging}
            ballPosition={ballPosition?? 0}
            hold={hold}
            release={release}
        />
    </div>
    )
}

export default SeekBar;