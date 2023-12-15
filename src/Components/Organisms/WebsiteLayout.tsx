import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import WebsiteHeader from "./WebsiteHeader";
import { useCallback, useEffect, useState } from "react";
import TrackControls from "../Pages/MusicPlayer/Components/TrackControls";
import useTrack from "../../Utils/hooks/useTrack";
import { SeekLineFunctionType } from "../../Utils/types";
import { Track } from "../../Utils/types/track";


const WebsiteLogo = () =>
{
    const navigate = useNavigate();

    return (
        <p 
            className='cursor-pointer flex items-center gap-1 text-center italic select-none'

            onClick={() => navigate("/")}
        >
            <span className='text-white self-end text-2xl'>
                Project
            </span>

            <span className='text-white'> 
                <span className="text-5xl font-semibold text-primary">V</span>
                
                <span className="text-3xl">irtuoso</span>
            </span>
        </p>
    )
}
type WebsiteContext = { selectTrack: (track: Track) => void }

// TODO: what should the semantic html tag be for this component?
const WebsiteLayout = () =>
{
    const track = useTrack();

    useEffect(() => { return () => { track.reset() }}, []);
    
    return (
        <main className="relative min-h-screen w-screen bg-primary pb-[128px]">
            <WebsiteHeader 
                className="z-[50] self-start fixed"
                start={ <WebsiteLogo />}
            />

            <div className="z-[10] min-h-screen min-w-screen">
                <Outlet context={{ selectTrack: track.selectTrack } satisfies WebsiteContext} />
            </div>

            {track.value && <TrackControls track={track.value} close={track.reset} />}
        </main>
    )
}

export default WebsiteLayout;


export const useWebsiteContext = () => 
{
    return useOutletContext<WebsiteContext>();
}