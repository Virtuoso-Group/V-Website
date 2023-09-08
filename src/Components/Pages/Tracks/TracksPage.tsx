
import { useEffect, useState } from 'react'
import tracksArray from '../../../Utils/dummyData/tracks';
import { Track } from '../../../Utils/types';
import TrackCard from '../../Molecules/TrackCard';
import { useWebsiteContext } from '../../Organisms/WebsiteLayout';


const TracksPage = () => 
{
    // const { track } = useContext(TrackContext);

    const { selectTrack } = useWebsiteContext();

    const [tracks, setTracks] = useState<Track[]>([]);
    
    useEffect(() => 
    {
        setTracks(tracksArray);

        return () => { }
    }, [tracksArray])

    
    return (
        <div className='min-h-screen w-screen flex  justify-center px-20 bg-blue-400'>
            <div className='flex flex-wrap w-full gap-8 h-full mt-[calc(64px+25px)] '>
                {tracks.map(song => <TrackCard key={song.id} song={song} select={selectTrack} /> )}
            </div>
        </div>
    )
}

export default TracksPage