
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SoulSeeker, Harridan, HotelCalifornia } from '../../../Utils/dummyData';
import { Track } from '../../../Utils/types';
import CoverArt from '../../Atoms/CoverArt';
import { TrackContext } from '../../SongContext';


type Props = {}

const TracksPage = (props: Props) => 
{
    const { track } = useContext(TrackContext);

    const navigate = useNavigate();

    const [songs, setSongs] = useState<Track[]>([]);
    
    useEffect(() => {
      
    setSongs([SoulSeeker, Harridan, HotelCalifornia]);

      return () => { }
    }, [])
    
    return (
        <div className='min-h-screen w-screen bg-purple-600 flex justify-center px-20'>
            <div className='flex w-full gap-8 h-full mt-[calc(64px+25px)] '>
                {songs.map(song =>
                    {
                        return (
                        <article 
                            key={song.id}
                            className='flex justify-center cursor-pointer'
                            onClick={() =>
                            {
                                track.setTrack(song);

                                navigate("player")
                            }}
                        >
                            <CoverArt 
                                className={`w-[150px] rounded-lg`}
                                name={song.album.name}
                                coverArt={song.album.coverArt} 
                            />
                        </article>
                    )
                    })
                }
            </div>
        </div>
    )
}

export default TracksPage