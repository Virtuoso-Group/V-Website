import { useEffect } from 'react'
import TrackCard from '../../../Molecules/TrackCard';
import { useWebsiteContext } from '../../../Organisms/WebsiteLayout';
import { AnimatePresence, motion } from 'framer-motion';
import { Track } from '../../../../Utils/types/track';
import useAPI from '../../../../Utils/hooks/useAPI';

const MotionTrackCard = motion(TrackCard);

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