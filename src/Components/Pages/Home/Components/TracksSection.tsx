import { useEffect, useState } from 'react'
import TrackCard from '../../../Molecules/TrackCard';
import { useWebsiteContext } from '../../../Organisms/WebsiteLayout';
import tracksArray from '../../../../Utils/dummyData/tracks';
import { AnimatePresence, motion } from 'framer-motion';
import { Track } from '../../../../Utils/types/track';

const MotionTrackCard = motion(TrackCard);

const TracksSection = () => 
{
    const { selectTrack } = useWebsiteContext();

    const [tracks, setTracks] = useState<Track[]>([]);

    useEffect(() => 
    {
      
        const sortedTracks = tracksArray.sort((trackA, trackB) => 
        {
            if (trackA.artistID === trackB.artistID) 
            {
                if (trackA.albumID === trackB.albumID) 
                {
                    return trackA.name.localeCompare(trackB.name) 
                } 

                return trackA.albumID - trackB.albumID
            }

            return trackA.artistID - trackB.artistID
        })
    
        setTracks(sortedTracks)
    }, []);
    
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