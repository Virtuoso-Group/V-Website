import { useEffect, useRef, useState } from "react";
import Ball from "../Atoms/Ball";

type TimeInfoProps =
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
    timeInfo: TimeInfoProps,
    controls: Controls,

    changeToSeeking: () => void
}

const Bar = (props: SeekBarProps) =>
{
    const { changeToSeeking } = props;

    const barContainerRef = useRef<HTMLDivElement>(null);
    const { duration, timestamp: current } = props.timeInfo;
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const currentPercentage = (current / duration) * 100;
    const barWidth = barContainerRef.current?.getBoundingClientRect().width??0;
    const ballPosition = currentPercentage/100 * barWidth

    const seekWrapper = (clientX: number) =>
    {
        const boundingRect = barContainerRef.current?.getBoundingClientRect();

        if (boundingRect) 
        {
            const { x, width } = boundingRect;

            const actualClientX =  clientX - x ;

            const percentage = (actualClientX / width);
            
            props.controls.seek(percentage)
        }     
    }

    const hold = () =>
    {        
        setIsDragging(true);
        props.controls.pause();
    }

    const release = (xPoint: number) =>
    {
        setIsDragging(false)
        seekWrapper(xPoint)
    }


    console.log("ballPosition: ", ballPosition);
    

    useEffect(() =>
    {
        if (isDragging) 
        {
            changeToSeeking()
        }
    }, [isDragging, changeToSeeking])

    return (
    <div 
        ref={barContainerRef}
        className='relative w-full h-[3.5px] bg-slate-400 cursor-pointer flex items-center'
        onClick={e => 
        {
            seekWrapper(e.clientX)
        }}
    >
        {/* TODO: we can animate this part as well, that would be cool */}
        <div 
            className='z-[1] absolute h-full bg-white'
            style={{ width: `${currentPercentage}%` }}
        />

        <Ball 
            isDragging={isDragging}
            ballPosition={ballPosition}
            hold={hold}
            release={release}
        />
    </div>
    )
}

const TimeInfo = (props: TimeInfoProps) =>
{
    const convertMilliToTimeStamp = (milliseconds: number): string =>
    {
        const minutes = ""+(Math.floor(milliseconds / 60000));
        const seconds = ""+Math.floor((milliseconds % 60000) / 1000);
        
        return `${minutes}:${seconds.padStart(2, "0")}`
    }
    
    const currentTime = convertMilliToTimeStamp(props.timestamp);
    
    const duration = convertMilliToTimeStamp(props.duration);

    return (
    <p 
        className=
        {`
            flex justify-between
            w-full 

            px-2
            font-light text-gray-300
            text-xs
        `}
    >
        <span>{currentTime}</span>

        <span>{duration}</span>
    </p>
    )
}

const SeekBar = (props: SeekBarProps) =>
{
    return (
        <div className='flex flex-col w-full gap-2'>
            <Bar {...props} />

            <TimeInfo {...props.timeInfo} />
        </div>
    )
}

export default SeekBar;