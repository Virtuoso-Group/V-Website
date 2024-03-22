import { useCallback, useContext, useState } from "react";
import { PlayerContext } from "../PlayerContext";
import { useTrackTimestamp } from "./useTrackTimestamp";

const calculatePercentage = (numerator: number, denominator: number) =>
{
    if (denominator) 
    {
        return (numerator / denominator) * 100 
    }

    return 0
}

const useTrackPercentage = () =>
{
    const { track } = useContext(PlayerContext);
    
    const [percentage, setPercentage] = useState<number>(calculatePercentage(track.timestamp, track.duration))
    
    const updatePercentage = useCallback((timestamp: number) =>
    {        
        setPercentage(calculatePercentage(timestamp, track.duration))
    }, [track.duration])
    

    useTrackTimestamp(750, updatePercentage);

    return percentage
}

export default useTrackPercentage