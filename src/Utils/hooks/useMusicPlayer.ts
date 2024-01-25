import { RefObject, useCallback, useContext, useEffect, useRef, useState } from "react"
import { PlayerContext } from "../../Components/Pages/MusicPlayer/MusicPlayer";

export enum PlayerState 
{
    LOADING = "LOADING",
    PLAYING = "PLAYING",
    PAUSED = "PAUSED",
    STOPPED = "STOPPED"
}


const usePlayerState = () =>
{
    const [value, setValue] = useState<PlayerState>(PlayerState.STOPPED)

    console.log("PlayerState: ", value);
    
    const setToPlay = useCallback(() => setValue(PlayerState.PLAYING), []);

    const setToLoading = useCallback(() => setValue(PlayerState.LOADING), []);

    const setToPause = useCallback(() => setValue(PlayerState.PAUSED), [])

    const reset = useCallback(() =>  setValue(PlayerState.STOPPED), []);

    return {
        value,

        setToLoading,

        setToPlay,

        setToPause,

        reset
    }
}

const useDuration = () =>
{
    const [value, setValue] = useState<number>(0);

    const initialize = useCallback((trackDuration: number) =>
    {   
        setValue(trackDuration * 1000);
    }, [])

    return { value, initialize }
}

export const useTrackTimestamp = 
(
    trackID: string, 
    tick: number, 
    update: (timestamp: number) => void,
    seek?: (timestamp: number) => void,
) =>
{
    const { audioRef } = useContext(PlayerContext);

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

    useEffect(() => 
    {
        seekedWrapper()
    }, [])
    
    useEffect(() => 
    {
        const updateWrapper = (e: Event) => 
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
        }

        const reset = () => 
        {
            prevTimestamp.current = 0;

            update(0)
        }

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
    }, [trackID, update, seek])    
}

const useAudioControls = (playerState: PlayerState) =>
{
    const ref = useRef<HTMLAudioElement>(null);

    const play = useCallback(() => ref.current?.play(), []);

    const pause = useCallback(() => ref.current?.pause(),[]);
    
    const togglePlay =  useCallback(() => 
    {
        playerState === PlayerState.PLAYING? pause() : play()
    },[playerState, play, pause]);

    const seek = useCallback((newTimeStamp: number) =>
    {
        if (ref.current) 
        {
            ref.current.currentTime = newTimeStamp / 1000;
        }
    }, [])

    return {
        ref,

        play, pause, togglePlay, seek
    }
}

const useMusicPlayer = () =>
{
    const metaDataLoaded = useRef<boolean>(false);

    const playerState = usePlayerState();

    const audioControls = useAudioControls(playerState.value)

    const duration = useDuration();

    const initialize = (callback: () => void) =>
    {
        if (audioControls.ref.current?.duration) 
        {            
            playerState.reset() 

            metaDataLoaded.current = true;
            
            duration.initialize(audioControls.ref.current?.duration)

            audioControls.play()

            callback()
        }
    }

    const seekPercentage = useCallback((percentage: number) =>
    {         
        const clipPercentage = (percentage: number): number =>
        {
            if (percentage < 0) 
            {
                return 0
            }
            else if (percentage > 1) 
            {
                return 1
            }
            else
            {
                return percentage
            }
        }

        const clippedPercentage = clipPercentage(percentage);

        if (audioControls.ref.current && metaDataLoaded.current) 
        {
            const newTimeStamp = (duration.value * clippedPercentage);
                                   
            audioControls.seek(newTimeStamp)

            audioControls.play()
        }
    }, [duration.value])

    const seekTimestamp = useCallback((timestamp: number) => seekPercentage((timestamp/duration.value)), [seekPercentage])
    
    const reset = () => 
    {        
        playerState.reset();

        audioControls.seek(0)
    }

    return {
        playerState,
        audioControls,
        duration,

        initialize, 
        seekPercentage, 
        seekTimestamp,
        reset
    }
}

export default useMusicPlayer;