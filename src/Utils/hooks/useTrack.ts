import { useState } from "react";
import { Track } from "../types";


const useTrack = () =>
{
    const [value, setValue] = useState<Track | null>(null);

    const setTrack = (track: Track) => setValue(track);

    const reset = () => setValue(null);

    return {
        value,

        setTrack,
        reset
    }
}

export default useTrack;