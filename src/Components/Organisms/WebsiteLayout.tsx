import { Outlet, useOutletContext } from "react-router-dom";
import WebsiteHeader from "./WebsiteHeader";
import { useEffect, useState } from "react";
import TrackControls from "../Pages/MusicPlayer/Components/TrackControls";
import useTrack from "../../Utils/hooks/useTrack";
import { SeekLineFunctionType, Track } from "../../Utils/types";


type WebsiteContext = { selectTrack: (track: Track) => void }

// TODO: what should the semantic html tag be for this component?
const WebsiteLayout = () =>
{
    const track = useTrack();

    /* 
        TODO: useTimestamp() was here, but I moved it down to TrackControls component.
        When the hook was here, it seemed to have caused the entire website to constantly rerender,
        I got this information from the React profiler.

        As soon as I moved the useTimestamp() hook down to the TrackControls component, only its children rerendered,
        including the child components that have nothing to do with the timestamp.

        I moved the useTimestamp hook down because it is exclusively used in the TrackControls.
    */

    const [seekLine, setSeekLine] = useState<SeekLineFunctionType | null>(null)

    const setSeekLineWrapper = (seekLineFunction: SeekLineFunctionType) => setSeekLine(seekLineFunction);

    useEffect(() => { return () => { track.reset() }}, []);
    
    return (
        <main className="relative min-h-screen w-screen">
            <WebsiteHeader 
                className="z-[50] self-start fixed"
                start=
                {
                    <p className='flex items-center gap-1 text-center italic select-none'>
                        <span className='text-white self-end text-2xl'>
                            Project
                        </span>

                        <span className='cursor-pointer'> 
                            <span className="text-5xl font-semibold text-[#EE4B2B]">V</span>
                            <span className="text-3xl text-[#11B4D4]">irtuoso</span>
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
                    lyrics={{ seekLine, setSeekLine: setSeekLineWrapper }}            
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