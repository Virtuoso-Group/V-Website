import {  memo } from "react";

import useTimeInformation from "../../../../Utils/hooks/useTimeInformation";
interface Props
{
    className?: string,
    
    trackID: string,
    duration: number, 
}

const TimeInformation = memo((props: Props) =>
{
    const { className } = props;

    const { currentTime, duration } = useTimeInformation(props.trackID, props.duration)

    return (
        <p className={`${className}`}>
            <span>{currentTime}/{duration}</span>
        </p>
    )
})

export default TimeInformation