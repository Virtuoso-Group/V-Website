// import { useState } from "react";
import { useState } from "react";
import { Track } from "../types/track";
import useAPI from "./useAPI";
import { PlayerState } from "./useMusicPlayer";

const useTrack = () =>
{
    const track = useAPI<Track | null>("music/track/", 'get', null);

    const selectTrack = (trackID: string) => track.execute(trackID);
    

    const reset = () => 
    {        
        track.reset()
    }
    
    return {
        value: track.data,

        selectTrack, reset
    }
}

export default useTrack;