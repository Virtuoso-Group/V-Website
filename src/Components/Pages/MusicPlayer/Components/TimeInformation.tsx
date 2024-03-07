import {  memo, useState } from "react";
import { useTrackTimestamp } from "../../../../Utils/hooks/useMusicPlayer";
import { convertMillisecondsToTimestamp } from "../../../../Utils/helper";

interface Props
{
    trackID: string,
    className?: string,
    duration: number, 
}



const TimeInformation = memo((props: Props) =>
{
    const { className } = props;

    const [currentTime, setCurrentTime] = useState<string>(convertMillisecondsToTimestamp(0));

    const updateCurrentTime = (timestamp: number) =>
    {
        setCurrentTime(convertMillisecondsToTimestamp(timestamp));
    }

    useTrackTimestamp(props.trackID, 1000, updateCurrentTime);

    const duration = convertMillisecondsToTimestamp(props.duration);

    return (
        <div className={`${className}`}>
            <p>{currentTime}/{duration}</p>
        </div>
    )
})

export default TimeInformation