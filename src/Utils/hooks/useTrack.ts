// import { useState } from "react";
import { useEffect } from "react";
import { Track } from "../types/track";
import useAPI from "./useAPI";

const useTrack = (selectedTrackID: string) =>
{
    const track = useAPI<Track | null>("music/track/", 'get', null);

    const selectTrack = (trackID: string) => track.execute(trackID);
    

    const reset = () => 
    {        
        track.reset()
    }

    useEffect(() =>
    {
        if (selectedTrackID) 
        {
            selectTrack(selectedTrackID)
        }
    }, [selectedTrackID])
    
    return {
        value: track.data,
        reset
    }
}

export default useTrack;