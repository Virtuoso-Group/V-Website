
import { useContext, useEffect, useState } from 'react'
import tracksArray from '../../../Utils/dummyData';
import { Track } from '../../../Utils/types';
import { TrackContext } from '../../SongContext';
import TrackCard from '../../Molecules/TrackCard';


const TracksPage = () => 
{
    const { track } = useContext(TrackContext);

    const [songs, setSongs] = useState<Track[]>([]);
    
    useEffect(() => 
    {
        setSongs(tracksArray);

        return () => { }
    }, [tracksArray])

    const selectSong = (song: Track) => track.setTrack(song)
    
    return (
        <div className='min-h-screen w-screen flex justify-center px-20 bg-blue-400'>
            <div className='flex w-full gap-8 h-full mt-[calc(64px+25px)] '>
                {songs.map(song => <TrackCard key={song.id} song={song} select={selectSong} /> )}
            </div>
        </div>
    )
}

export default TracksPage