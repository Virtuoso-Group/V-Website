import { memo } from "react";
import useTimeInformation from "../../../../../../Utils/hooks/useTimeInformation";
interface Props
{
    className?: string,
    
    trackID: string,
    duration: number, 
}

const TimeInformation = memo((props: Props) =>
{
    const { currentTime, duration } = useTimeInformation(props.trackID, props.duration)

    return (
        <p className={`flex justify-between ${props.className}`}>
            <span>{currentTime}</span>

            <span>{duration}</span>
        </p>
    )
})

export default TimeInformation