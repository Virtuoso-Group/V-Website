import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import WebsiteHeader from "./WebsiteHeader";
import { useEffect, useState } from "react";
import TrackControls from "../Pages/MusicPlayer/Components/TrackOverlay";
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
type WebsiteContext = { selectTrack: (trackID: string) => void }

// TODO: what should the semantic html tag be for this component?
const WebsiteLayout = () =>
{
    const track = useTrack();

    const [areLyricsVisible, setLyricsVisibility] = useState(false);

    const toggleLyrics = () => setLyricsVisibility(value => !value);
    
    useEffect(() => 
    { 
       const root =  document.documentElement;

       root.style.setProperty(
        "--base-font-size",
        "16px",
    )
       
        return () => { track.reset() }
    }, []);

    
    return (
        <main 
            className="relative min-h-screen w-screen bg-primary pb-[8rem]"
        >
            <WebsiteHeader className="z-[50] self-start fixed" start={<WebsiteLogo />} />

            <div className="z-[10] min-h-screen min-w-screen ">
                <Outlet context={{ selectTrack: track.selectTrack } satisfies WebsiteContext} />
            </div>

            {
                track.value 
            && 
                <TrackControls 
                    track={track.value} 
                    close={track.reset} 

                    areLyricsVisible={areLyricsVisible}
                    toggleLyrics={toggleLyrics}
                />

                // <audio 
                //     key={track.value._id}
                //     src={`${baseURL.local}/music/track/play/${track.value.release._id}/${track.value._id}`} 
                //     controls={true}
                //     controlsList="nodownload noplaybackrate"
                // />
            }
        </main>
    )
}

export default WebsiteLayout;


export const useWebsiteContext = () => 
{
    return useOutletContext<WebsiteContext>();
}
