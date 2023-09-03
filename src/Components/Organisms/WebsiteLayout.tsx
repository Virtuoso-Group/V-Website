import { Outlet } from "react-router-dom";
import WebsiteHeader from "./WebsiteHeader";
import { useContext, useEffect } from "react";
import { TrackContext } from "../SongContext";
import TrackControls from "../Pages/MusicPlayer/Components/TrackControls";


const WebsiteLayout = () =>
{
    // TODO: what should the semantic html tag be for this component?
    const { track, timestamp, lyrics } = useContext(TrackContext);

    useEffect(() => {
    
      return () => 
      {
        track.reset()
      }
    }, [])
    
    return (
        <main className="relative min-h-screen w-screen">
            <WebsiteHeader 
                className="z-[50] self-start fixed"
                start=
                {
                    <p className='flex items-center gap-2 text-center'>
                        <span className='text-white self-end text-2xl'>
                            Project
                        </span>

                        <span className='cursor-pointer text-5xl text-[#EE4B2B]'> 
                            Virtuoso
                        </span>
                    </p>
                }
            />

            <div className="z-[10] min-h-screen min-w-screen">
                <Outlet />
            </div>


            {
                track.value
            &&
                <TrackControls 
                    track={track.value}
                    timestamp={timestamp}

                    lyrics={{ seekLine: lyrics.seekLine }}            
                />
            }
        </main>
    )
}

export default WebsiteLayout;