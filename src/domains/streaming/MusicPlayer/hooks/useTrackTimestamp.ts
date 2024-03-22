import { useCallback, useContext, useEffect, useRef } from "react";
import { PlayerContext } from "../PlayerContext";

// TODO: this could use a better name
export const useTrackTimestamp = 
(
    tick: number, 
    update: (timestamp: number) => void,
    seek?: (timestamp: number) => void,
) =>
{
    
    const { audioRef, track } = useContext(PlayerContext);

    const prevTimestamp = useRef<number>(0);

    const seekedWrapper = () =>
    {   
        if (audioRef.current && seek) 
        {
            const currentTimestamp = audioRef.current.currentTime * 1000;

            prevTimestamp.current = -1;

            seek(currentTimestamp)   
        }
    }

    const updateWrapper = useCallback((e: Event) => 
    {
        if (audioRef.current) 
        {         
            const currentTimestamp = audioRef.current.currentTime * 1000;

            const diff = prevTimestamp.current  - currentTimestamp;

            if (Math.abs(diff) >= tick) 
            {
                prevTimestamp.current = currentTimestamp;

                update(currentTimestamp)
            }                       
        }
    }, [tick, update])

    const reset = useCallback(() => 
    {
        prevTimestamp.current = 0;

        if (update) 
            update(0)
    }, [update])

    useEffect(() => { seekedWrapper() }, [])
    
    useEffect(() => 
    {
        if (audioRef.current) 
        {
            audioRef.current.addEventListener("seeked", seekedWrapper)
            audioRef.current.addEventListener("timeupdate", updateWrapper)
            audioRef.current.addEventListener("ended", reset)
        }
    
        return () => 
        {            
            if (audioRef.current) 
            {
                audioRef.current.removeEventListener("seeked", seekedWrapper)
                audioRef.current.removeEventListener("timeupdate", updateWrapper)
                audioRef.current.removeEventListener("ended", reset)
            }  
        }
    }, [track._id, updateWrapper, seekedWrapper, reset])    
}