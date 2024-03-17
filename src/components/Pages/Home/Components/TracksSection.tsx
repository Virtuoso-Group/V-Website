import TrackCard from '../../../Molecules/TrackCard';
import { useWebsiteContext } from '../../../Organisms/WebsiteLayout';
import {  motion } from 'framer-motion';
import { Track } from '../../../../Utils/types/track';

const MotionTrackCard = motion(TrackCard);

const TracksSection = (props: { data: Track[] }) => 
{
    const { selectTrack } = useWebsiteContext();
    
    return (
        <>
            {props.data.map((track, index) => 
                {
                    return (
                        <MotionTrackCard 
                            key={"track/"+track._id}
                            initial={{ opacity: 0}}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.05 * (index + 1)}}

                            trackID={track._id}
                            title={track.title}
                            artistName={track.artist.name}
                            coverArt={track.release.coverArt}

                            select={selectTrack}
                        />
                    )
                })
            }
        </>
    )
}

export default TracksSection