import {  memo, useState } from "react";
import { useTrackTimestamp } from "../../../../Utils/hooks/useMusicPlayer";

interface Props
{
    trackID: string,
    className?: string,
    duration: number, 
}

const convertMilliToTimeStamp = (milliseconds: number): string =>
{
    const minutes = ""+(Math.floor(milliseconds / 60000));
    const seconds = ""+Math.floor((milliseconds % 60000) / 1000);
    
    return `${minutes}:${seconds.padStart(2, "0")}`
}

const TimeInformation = memo((props: Props) =>
{
    const { className } = props;

    const [currentTime, setCurrentTime] = useState<string>(convertMilliToTimeStamp(0));

    const updateCurrentTime = (timestamp: number) =>
    {
        setCurrentTime(convertMilliToTimeStamp(timestamp));
    }

    useTrackTimestamp(props.trackID, 1000, updateCurrentTime);

    const duration = convertMilliToTimeStamp(props.duration);

    return (
        <div className={`${className}`}>
            <p>{currentTime}/{duration}</p>
        </div>
    )
})

export default TimeInformation