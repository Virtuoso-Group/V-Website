import { useCallback, useRef, useState } from "react"

export enum PlayerState 
{
    PLAYING = "Playing",
    PAUSED = "PAUSED",
    STOPPED = "STOPPED"
}

const useAudioPlayer = () =>
{
    const ref = useRef<HTMLAudioElement | null>(null);
    const metaDataLoaded = useRef<boolean>(false);
    const [playerState, setPlayerState] = useState<PlayerState>(PlayerState.STOPPED)

    const setToPlay = () => setPlayerState(PlayerState.PLAYING);

    const setToPause = () => setPlayerState(PlayerState.PAUSED)

    const play = useCallback(() => ref.current?.play(), []);

    const pause = useCallback(() => ref.current?.pause(),[]);

    const reset = () =>  setPlayerState(PlayerState.STOPPED);

    const togglePlay =  useCallback(() => playerState === PlayerState.PLAYING? pause() : play(),[playerState, play, pause]);


    return {
        playerState,
        setToPlay,
        setToPause,

        ref,
        metaDataLoaded,

        play,
        pause,
        reset,
        togglePlay
    }
}

export default useAudioPlayer;