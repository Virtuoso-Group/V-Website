import { useContext } from 'react'

import LyricsView from '../../Organisms/LyricsView'

import CoverArt from '../../Atoms/CoverArt'

import { TrackContext } from '../../SongContext'
import { useNavigate } from 'react-router-dom'

const MusicPlayerPage = () => 
{
    /* TODO: 
        maybe I can send a copy of the song instead of the song itself? 
        I only need to update the timestamp anyways
    */
    const { track, timestamp } = useContext(TrackContext)

    const navigate = useNavigate();

    // TODO: I need fallbacks here
    return (
        <div className={`z-[1] relative grid min-h-screen w-screen`}>
            <div className='z-[-1] absolute h-full w-full'>
                <img 
                    className='z-[1] absolute  h-full w-full object-cover'
                    src={track.value? track.value.album.coverArt: ""}
                    title={"Background"}
                    alt={"Background"}
                />

                <div className='z-[2] absolute h-full w-full backdrop-blur-sm' />
            </div>

            <section className={`grid grid-cols-2  auto-cols-max w-full items-center`}>
                <div className='flex justify-center'>
                    <CoverArt 
                        className={`border min-w-[300px] w-[550px] rounded-lg`}
                        name={track.value? track.value.album.name: ""}
                        coverArt={track.value? track.value.album.coverArt: ""} 
                    />
                </div>

                <div className='flex justify-center h-[700px]'>
                   {
                        track.value
                    && 
                        <LyricsView  
                            track={track.value} 
                            timestamp={timestamp.value}
                        />
                    } 

                    <button 
                        className='h-[50px] w-[80px] rounded-md bg-orange-600 text-white'
                        value='Songs'
                         
                        onClick={() => navigate("/")} 
                    >
                        Go to Songs
                    </button>
                </div>
            </section>   
        </div>       
    )
}

export default MusicPlayerPage