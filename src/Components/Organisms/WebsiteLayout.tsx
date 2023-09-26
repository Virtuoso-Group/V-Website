import { Outlet, useOutletContext } from "react-router-dom";
import WebsiteHeader from "./WebsiteHeader";
import { useCallback, useEffect, useState } from "react";
import TrackControls from "../Pages/MusicPlayer/Components/TrackControls";
import useTrack from "../../Utils/hooks/useTrack";
import { SeekLineFunctionType } from "../../Utils/types";
import { Track } from "../../Utils/types/track";


type WebsiteContext = { selectTrack: (track: Track) => void }

// TODO: what should the semantic html tag be for this component?
const WebsiteLayout = () =>
{
    const track = useTrack();

    useEffect(() => { return () => { track.reset() }}, []);
    
    return (
        <main className="relative min-h-screen w-screen bg-[#11B4D4] pb-[64px]">
            <WebsiteHeader 
                className="z-[50] self-start fixed"
                start=
                {
                    <p className='flex items-center gap-1 text-center italic select-none'>
                        <span className='text-white self-end text-2xl'>
                            Project
                        </span>

                        <span className='cursor-pointer text-white'> 
                            <span className="text-5xl font-semibold text-[#11B4D4]">V</span>
                            <span className="text-3xl">irtuoso</span>
                        </span>
                    </p>
                }
            />

            <div className="z-[10] min-h-screen min-w-screen">
                <Outlet context={{ selectTrack: track.selectTrack } satisfies WebsiteContext} />
            </div>

            {
                track.value
            &&
                <TrackControls 
                    track={track.value}
                    close={track.reset}
                />
            }
        </main>
    )
}

export default WebsiteLayout;


export const useWebsiteContext = () => 
{
    return useOutletContext<WebsiteContext>();
}