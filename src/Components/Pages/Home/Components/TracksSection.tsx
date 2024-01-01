import { useEffect, useState } from 'react'
import TrackCard from '../../../Molecules/TrackCard';
import { useWebsiteContext } from '../../../Organisms/WebsiteLayout';
import { AnimatePresence, motion } from 'framer-motion';
import { Track } from '../../../../Utils/types/track';
import axios from 'axios';
import { baseURL } from '../../../../config/config';
import useAPI from '../../../../Utils/hooks/useAPI';

const MotionTrackCard = motion(TrackCard);


// const sortedTracks = res.data.tracks.sort((trackA: Track, trackB: Track) => 
// {
//     if (trackA.artist._id === trackB.artist._id) 
//     {
//         if (trackA.release._id === trackB.release._id) 
//         {
//             return trackA.title.localeCompare(trackB.title) 
//         } 

//         return trackA.release._id.localeCompare(trackB.release._id)
//     }

//     return trackA.artist._id.localeCompare(trackB.artist._id)
// })
const TracksSection = () => 
{
    const { selectTrack } = useWebsiteContext();

    const tracksAPI = useAPI<Track[]>("music/track/getAll", 'get', [])

    useEffect(() => 
    { 
        tracksAPI.execute();
    }, []);
       
    return (
        <AnimatePresence>
            {tracksAPI.data?.map((track, index) => 
                {
                    return (
                        <MotionTrackCard 
                            key={"track/"+track._id}
                            initial={{ opacity: 0}}

                            animate={{ opacity: 1 }}

                            transition={{ duration: 0.05 * (index + 1)}}
                            track={track} 
                            select={selectTrack} 
                        />
                    )
                })
            }
        </AnimatePresence>
    )
}

export default TracksSection