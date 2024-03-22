import { useCallback, useEffect, useRef, useState } from "react"

export enum PlayerState 
{
    LOADING = "LOADING",
    PLAYING = "PLAYING",
    PAUSED = "PAUSED",
    STOPPED = "STOPPED"
}

export type PlayerStateHook =
{
    value: PlayerState;
    setToLoading: () => void;
    setToPlay: () => void;
    setToPause: () => void;
    reset: () => void;
}

const usePlayerState = (): PlayerStateHook =>
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

    const initialize = useCallback((trackDuration: number) =>
    {   
        setValue(trackDuration * 1000);
    }, [])

    return { value, initialize }
}

const useAudioControls = (trackID: string, playerState: PlayerStateHook) =>
{
    const ref = useRef<HTMLAudioElement>(null);

    const currentTimestamp = useRef<number>(0);

    const updateTimestamp = () =>
    {
        if (!ref.current) 
            return
        
        const newTimestamp = ref.current.currentTime * 1000;

        currentTimestamp.current = newTimestamp;
    }

    const play = useCallback(() => ref.current?.play(), []);

    const pause = useCallback(() => ref.current?.pause(),[]);
    
    const togglePlay =  useCallback(() => 
    {
        playerState.value === PlayerState.PLAYING? pause() : play()
    },[playerState, play, pause]);

    const seek = useCallback((newTimeStamp: number) =>
    {
        if (ref.current) 
        {
            ref.current.currentTime = newTimeStamp / 1000;
        }
    }, [])

    const reset = () => 
    {        
        playerState.reset();

        seek(0)
    }

    useEffect(() => 
    {
        const audioRef = ref.current;

        if (audioRef) 
        {
            audioRef.addEventListener("play", playerState.setToPlay)
            audioRef.addEventListener("playing", playerState.setToPlay)
            audioRef.addEventListener("pause", playerState.setToPause)

            audioRef.addEventListener("loadstart", playerState.setToLoading)
            audioRef.addEventListener("timeupdate", updateTimestamp)

            audioRef.addEventListener("waiting", playerState.setToLoading)

            audioRef.addEventListener("ended", reset)
        }
        
        return () => {
            audioRef?.removeEventListener("play", playerState.setToPlay)
            audioRef?.removeEventListener("playing", playerState.setToPlay)
            audioRef?.removeEventListener("pause", playerState.setToPause)

            audioRef?.removeEventListener("loadstart", playerState.setToLoading)
            audioRef?.removeEventListener("timeupdate", updateTimestamp)

            audioRef?.removeEventListener("waiting", playerState.setToLoading)

            audioRef?.removeEventListener("ended", reset)
        }
    }, [trackID])
    
    return {
        ref,
        timestamp: currentTimestamp.current,

        play, pause, togglePlay, seek, reset
    }
}

const useMusicPlayer = (trackID: string) =>
{
    const metaDataLoaded = useRef<boolean>(false);

    const playerState = usePlayerState();

    const audioControls = useAudioControls(trackID, playerState)

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
    
    return {
        playerState,
        audioControls,
        
        duration,

        initialize, 
        seekPercentage, 
        seekTimestamp,
        reset: audioControls.reset
    }
}

export default useMusicPlayer;