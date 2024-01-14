import { useCallback, useRef, useState } from "react"
import { SeekFunctionType } from "../types";

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

    const initialize = (trackDuration = 0) =>
    {   
        setValue(trackDuration * 1000);
    }

    return { value, initialize }
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

type Timestamp =
{
    update: (targetTimestamp: number) => void,
    reset: () => void;
}

const useMusicPlayer = (timestamp: Timestamp, seekLyric?: SeekFunctionType) =>
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

    const seek = useCallback((percentage: number) =>
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

            timestamp.update(newTimeStamp)

            if (seekLyric)
            {
                seekLyric(newTimeStamp)
            }    

            audioControls.play()
        }
    }, [duration.value, seekLyric])

    const reset = () => 
    {        
        playerState.reset();

        timestamp.reset();
    }

    return {
        playerState,
        audioControls,
        timestamp,
        duration,

        initialize, seek, reset
    }
}

export default useMusicPlayer;