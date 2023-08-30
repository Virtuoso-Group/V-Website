import { useEffect, useState } from "react";
import { PlayerState } from "../types";

const usePlayerState = () =>
{
    const [playerState, setPlayerState] = useState<PlayerState>(PlayerState.STOPPED);

    useEffect(() => { console.log("playerState: ", playerState) }, [playerState])
    
    return {
        value: playerState,

        play: () => setPlayerState(PlayerState.PLAYING),
        pause: () => setPlayerState(PlayerState.PAUSED),
        seek: () => setPlayerState(PlayerState.SEEKING),
        stop: () => setPlayerState(PlayerState.STOPPED),
    }
}

export default usePlayerState