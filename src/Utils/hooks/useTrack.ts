import { useState } from "react";
import { Track } from "../types/track";
// import { Track } from "../types";


const useTrack = () =>
{
    const [value, setValue] = useState<Track | null>(null);

    const selectTrack = (track: Track) => setValue(track);

    const reset = () => setValue(null);

    return {
        value,

        selectTrack, reset
    }
}

export default useTrack;