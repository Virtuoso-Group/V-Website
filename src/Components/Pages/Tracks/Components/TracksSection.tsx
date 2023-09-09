import { useState } from 'react'
import { Track } from '../../../../Utils/types';
import TrackCard from '../../../Molecules/TrackCard';
import { useWebsiteContext } from '../../../Organisms/WebsiteLayout';
import tracksArray from '../../../../Utils/dummyData/tracks';
import { AnimatePresence, motion } from 'framer-motion';

const MotionTrackCard = motion(TrackCard);

const TracksSection = () => 
{
    const { selectTrack } = useWebsiteContext();

    const [tracks, setTracks] = useState<Track[]>(tracksArray);

    return (
        <AnimatePresence>
            {tracks.map((track, index) => 
                {
                    return (
                        <MotionTrackCard 
                            key={"track/"+track.id}
                            initial={{ opacity: 0}}

                            animate={{ opacity: 1 }}

                            transition={{ duration: 0.05 * (index + 1)}}
                            song={track} 
                            select={selectTrack} 
                        />
                    )
                })
            }
        </AnimatePresence>
    )
}

export default TracksSection