import { useContext, useState } from "react";
import { convertMillisecondsToTimestamp } from "../../../Utils/helper";
import { useTrackTimestamp } from "./useTrackTimestamp";
import { PlayerContext } from "../PlayerContext";

// TODO: this could use a better name
const useTimeInformation = () =>
{
    const { track } = useContext(PlayerContext)
    const [currentTime, setCurrentTime] = useState<string>(convertMillisecondsToTimestamp(0));

    const updateCurrentTime = (timestamp: number) =>
    {
        const formattedCurrentTime = convertMillisecondsToTimestamp(timestamp);

        setCurrentTime(formattedCurrentTime);
    }

    useTrackTimestamp(1000, updateCurrentTime);

    const formattedDuration = convertMillisecondsToTimestamp(track.duration);

    return { currentTime, duration: formattedDuration }
}

export default useTimeInformation;