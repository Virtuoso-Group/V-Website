import { Outlet } from "react-router-dom";
import WebsiteHeader from "./WebsiteHeader";
import { useContext, useEffect } from "react";
import { TrackContext } from "../SongContext";
import usePlayerState from "../../Utils/hooks/usePlayerState";
import TrackControls from "../Pages/MusicPlayer/Components/TrackControls";


const WebsiteLayout = () =>
{
    // TODO: what should the semantic html tag be for this component?

    const playerStatus = usePlayerState();
    const { track, timestamp, lyrics } = useContext(TrackContext);

    useEffect(() => {
    
      return () => 
      {
        track.reset()
      }
    }, [])
    

    console.log("lyrics: ", lyrics);
    
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

                        {/* TODO: 
                            I chose the font from the King Crimson album "Red".
                            It doesn't seem to look good with the word "Virtuoso".
                        */}
                        <span className='cursor-pointer text-5xl text-[#EE4B2B]'> 
                            Virtuoso
                        </span>
                    </p>
                }
            />

            <Outlet />

            {
                track.value
            &&
                <TrackControls 
                    playerState={playerStatus}
                    track={track.value}
                    timestamp={timestamp}

                    lyrics={{ seekLine: lyrics.seekLine }}            
                />
            }
        </main>
    )
}

export default WebsiteLayout;