import { useEffect, useState } from 'react'
import TrackCard from '../../../Molecules/TrackCard';
import { useWebsiteContext } from '../../../Organisms/WebsiteLayout';
import tracksArray from '../../../../Utils/dummyData/tracks';
import { AnimatePresence, motion } from 'framer-motion';
import { Track } from '../../../../Utils/types/track';
import axios from 'axios';

const MotionTrackCard = motion(TrackCard);

const TracksSection = () => 
{
    const { selectTrack } = useWebsiteContext();

    const [tracks, setTracks] = useState<Track[]>([]);

    const fetchTracks= async () =>
    {
        try 
        {
            const res = await axios.get(`http://localhost:4000/music/track/getAll`);

            if (res.data && res.data.tracks) 
            {
                const sortedTracks = res.data.tracks.sort((trackA: Track, trackB: Track) => 
                {
                    if (trackA.artist._id === trackB.artist._id) 
                    {
                        if (trackA.release._id === trackB.release._id) 
                        {
                            return trackA.title.localeCompare(trackB.title) 
                        } 
        
                        return trackA.release._id.localeCompare(trackB.release._id)
                    }
        
                    return trackA.artist._id.localeCompare(trackB.artist._id)
                })
    
                setTracks(sortedTracks)
            }
        } 
        catch (error) 
        {
            console.error(error)
        }
    }

    useEffect(() => { fetchTracks()}, []);
    
    return (
        <AnimatePresence>
            {tracks.map((track, index) => 
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