import TrackCard from '../../../../../components/Molecules/TrackCard';
import { useWebsiteContext } from '../../../../../components/Organisms/WebsiteLayout';
import {  motion } from 'framer-motion';
import { Track } from '../../../../../Utils/types/track';
import { useEffect, useRef } from 'react';

const MotionTrackCard = motion(TrackCard);

const TracksSection = (props: { tracks: Track[] }) => 
{
    const { createPlaylist } = useWebsiteContext();

    const { tracks } = props;

    const trackIDs = useRef<string[]>([])

    useEffect(() => 
    {
        trackIDs.current = tracks.map(track => track._id);
    }, [tracks])


    const selectTrack = (index: number) =>
    {
        createPlaylist(trackIDs.current, index)
    }
    
    return (
        <>
            {tracks.map((track, index) => 
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

                            select={() => selectTrack(index)}
                        />
                    )
                })
            }
        </>
    )
}

export default TracksSection