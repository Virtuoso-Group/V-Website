import { useState } from "react";
import { convertMillisecondsToTimestamp } from "../helper";
import { useTrackTimestamp } from "./useMusicPlayer";

const useTimeInformation = (trackID: string, duration: number) =>
{
    const [currentTime, setCurrentTime] = useState<string>(convertMillisecondsToTimestamp(0));

    const updateCurrentTime = (timestamp: number) =>
    {
        const formattedCurrentTime = convertMillisecondsToTimestamp(timestamp);

        setCurrentTime(formattedCurrentTime);
    }

    useTrackTimestamp(trackID, 1000, updateCurrentTime);

    const formattedDuration = convertMillisecondsToTimestamp(duration);

    return { currentTime, duration: formattedDuration }
}

export default useTimeInformation;