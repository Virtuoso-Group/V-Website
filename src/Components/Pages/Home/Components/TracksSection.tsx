import TrackCard from '../../../Molecules/TrackCard';
import { useWebsiteContext } from '../../../Organisms/WebsiteLayout';
import { AnimatePresence, motion } from 'framer-motion';
import { Track } from '../../../../Utils/types/track';

const MotionTrackCard = motion(TrackCard);

const TracksSection = (props: { data: Track[] }) => 
{
    const { selectTrack } = useWebsiteContext();

    return (
        <AnimatePresence>
            {props.data.map((track, index) => 
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