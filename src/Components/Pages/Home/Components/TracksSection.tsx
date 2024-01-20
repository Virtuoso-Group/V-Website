import TrackCard from '../../../Molecules/TrackCard';
import { useWebsiteContext } from '../../../Organisms/WebsiteLayout';
import { AnimatePresence, motion } from 'framer-motion';
import { Track } from '../../../../Utils/types/track';
import { useState } from 'react';

const MotionTrackCard = motion(TrackCard);

const TracksSection = (props: { data: Track[] }) => 
{
    const { selectTrack } = useWebsiteContext();

    const [hoveredID, setHoveredID] = useState<string>("")

    const selectHoverTrack = (trackID: string) => setHoveredID(trackID);

    const resetHoverTrack = () => setHoveredID("");
    
    return (
        <AnimatePresence>
            {props.data.map((track, index) => 
                {
                    const hoverObj = 
                    {
                        isHover: hoveredID === track._id,
                        onStart: () => selectHoverTrack(track._id),
                        onEnd: resetHoverTrack
                    }

                    const trackObj = 
                    {
                        value: track,
                        select: () => selectTrack(track._id)
                    }

                    return (
                        <MotionTrackCard 
                            key={"track/"+track._id}
                            initial={{ opacity: 0}}

                            animate={{ opacity: 1 }}

                            transition={{ duration: 0.05 * (index + 1)}}

                            track={trackObj}

                            hover={hoverObj}
                        />
                    )
                })
            }
        </AnimatePresence>
    )
}

export default TracksSection