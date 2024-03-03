import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import WebsiteHeader from "./WebsiteHeader";
import { useEffect } from "react";
// import TrackControls from "../Pages/MusicPlayer/MusicPlayer";

// import { MusicPlayer } from "../Pages/MusicPlayer/MusicPlayer";
import { MusicPlayer } from "../Pages/MusicPlayer/MusicPlayer";

import useTrack from "../../Utils/hooks/useTrack";


const WebsiteLogo = () =>
{
    const navigate = useNavigate();

    return (
        <p 
            className=
            {`
                flex 
                flex-col SD:flex-row

                items-start
                cursor-pointer 
                SD:items-center 
                SD:gap-1 
                text-center italic select-none
            `}

            onClick={() => navigate("/")}
        >
            <span className='text-white SD:self-end text-xl SD:text-2xl'>
                Project
            </span>

            <span className='ps-5 SD:ps-0 self-end text-white'> 
                <span className="text-2xl SD:text-5xl font-semibold text-primary">V</span>
                
                <span className="text-xl SD:text-2xl">irtuoso</span>
            </span>
        </p>
    )
}
type WebsiteContext = 
{ 
    websitePadding: string,
    selectTrack: (trackID: string) => void 
}

// TODO: what should the semantic html tag be for this component?
const WebsiteLayout = () =>
{
    const track = useTrack();
    
    useEffect(() => 
    { 
       const root =  document.documentElement;

       root.style.setProperty("--base-font-size","16px")
       
        return () => { track.reset() }
    }, []);

    const websitePadding = "px-5 SD:px-10 HD:px-20";

    return (
        <main className={`min-h-screen min-w-[375px] w-screen flex flex-col bg-primary`}>
            <WebsiteHeader className={`z-[99] top-0 sticky ${websitePadding}`} start={<WebsiteLogo />} />

            {/* mt-[5.2rem] */}
            <div className={`min-h-full w-full bg-primary  ${track.value? "pb-[9rem]": "pb-[0rem]"} `}>
                <Outlet context={{ websitePadding: websitePadding, selectTrack: track.selectTrack } satisfies WebsiteContext} />
            </div>

            {track.value && <MusicPlayer websitePadding={websitePadding} track={track.value} close={track.reset} />}
        </main>
    )
}

export default WebsiteLayout;


export const useWebsiteContext = () => 
{
    return useOutletContext<WebsiteContext>();
}
