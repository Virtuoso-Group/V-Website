import { memo } from "react";
import useTimeInformation from "../../../hooks/useTimeInformation";
interface Props
{
    className?: string,
}

const TimeInformation = memo((props: Props) =>
{
    const { currentTime, duration } = useTimeInformation()

    return (
        <p className={`flex justify-between ${props.className}`}>
            <span>{currentTime}</span>

            <span>{duration}</span>
        </p>
    )
})

export default TimeInformation