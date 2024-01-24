import { RefObject, memo, useCallback, useEffect, useRef, useState } from "react";
import Ball from "../Atoms/Ball";

import { motion } from "framer-motion";
import { useTrackTimestamp } from "../../Utils/hooks/useMusicPlayer";


type Controls = 
{
    seek: (percentage: number) => void
    pause: () => void,
}

interface SeekBarProps
{
    audioRef: RefObject<HTMLAudioElement>
    trackID: string,
    duration: number, 
    controls: Controls,
}

const SeekBar = memo((props: SeekBarProps) =>
{
    const barContainerRef = useRef<HTMLDivElement>(null);
    const { duration } = props;
    
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [ballPosition, setBallPosition] = useState<number>(0);
    const [currentPercentage, setCurrentPercentage] = useState<number>(0)

    // TODO: put a useCallback, you don't want the useCurrentTimestamp to redefine itself
    const updatePercentage = (timestamp: number) =>
    {        
        if (duration) 
        {
            setCurrentPercentage((timestamp / duration) * 100)
        }
    }
    
    useTrackTimestamp(props.trackID, props.audioRef, 750, updatePercentage);

    const barWidth = barContainerRef.current?.getBoundingClientRect().width??1;

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