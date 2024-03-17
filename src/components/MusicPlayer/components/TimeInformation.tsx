import {  memo } from "react";

import useTimeInformation from "../hooks/useTimeInformation";
interface Props
{
    className?: string, 
}

const TimeInformation = memo((props: Props) =>
{
    const { className } = props;

    const { currentTime, duration } = useTimeInformation();

    return (
        <p className={`${className}`}>
            <span>{currentTime}/{duration}</span>
        </p>
    )
})

export default TimeInformation