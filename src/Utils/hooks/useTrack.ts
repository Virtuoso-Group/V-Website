import { useState } from "react";
import { Track } from "../types/track";

const useTrack = () =>
{
    const [value, setValue] = useState<Track | null>(null);

    const selectTrack = (track: Track) => setValue(track);

    const reset = () => setValue(null);

    // const fetchSong = async () =>
    // {
    //   try 
    //   {
    //     const res = await axios.get(`${baseURL.local}/music/track/get/asiducbascib`);
        
    //     if (res.data) 
    //     {
    //         track.selectTrack(res.data.track)
    //     }
    //   } 
    //   catch (error) 
    //   {
    //     console.error(error)
    //   }
    // }

    // useEffect(() => 
    // {
    //     if (value) 
    //     {
            
    //     }
    //   return () => {}
    // }, [value])
    
    return {
        value,

        selectTrack, reset
    }
}

export default useTrack;