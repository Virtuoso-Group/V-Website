import { Link, Outlet, useOutletContext } from "react-router-dom";
import WebsiteHeader from "./WebsiteHeader";
import { useEffect } from "react";
// import TrackControls from "../Pages/MusicPlayer/MusicPlayer";

// import { MusicPlayer } from "../Pages/MusicPlayer/MusicPlayer";
import { MusicPlayer } from "../../domains/streaming/MusicPlayer/MusicPlayer";

import useTrack from "../../Utils/hooks/useTrack";
import useOverlay from "../../Utils/hooks/useOverlay";
import { websitePadding } from "../../config/style";
import useTrackList from "../../Utils/hooks/useTrackList";

interface Props
{
    onClick?: () => void
}

const WebsiteLogo = (props: Props) =>
{
    return (
        <Link 
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

            to={"/home"}
            onClick={props.onClick}
        >
            <span className='text-white SD:self-end text-xl SD:text-2xl'>
                Project
            </span>

            <span className='ps-5 SD:ps-0 self-end text-white'> 
                <span className="text-2xl SD:text-5xl font-semibold text-primary">V</span>
                
                <span className="text-xl SD:text-2xl">irtuoso</span>
            </span>
        </Link>
    )
}
type WebsiteContext = 
{ 
    selectedtrack?:
    {
        trackID: string,
        albumID: string,
        artistID: string
    },

    createPlaylist: (trackIDs: string[], index: number) => void,
}

// TODO: what should the semantic html tag be for this component?
const WebsiteLayout = () =>
{
    const { selectedTrackID, createPlaylist, goNext, goPrevious } = useTrackList();

    const track = useTrack(selectedTrackID);

    const musicPlayerOverlay = useOverlay();
    
    useEffect(() => 
    { 
        const root =  document.documentElement;

        root.style.setProperty("--base-font-size","16px")
       
        return () => { track.reset() }
    }, []);

    const trackInfo = 
        track.value
    ?
        {
            trackID: track.value.track._id,
            albumID: track.value.release._id,
            artistID: track.value.artist._id
        }
    : 
        undefined;
    
    return (
        <main className={`min-h-screen min-w-[375px] w-screen flex flex-col`}>
            <WebsiteHeader 
                className={`z-[99] top-0 sticky ${track.value && musicPlayerOverlay.isOn? "SD:bg-menuBackground": "bg-menuBackground"} ${websitePadding}`} 
                start={<WebsiteLogo onClick={musicPlayerOverlay.hide}/>} 
            />

            <div className={`min-h-full w-full  ${track.value? "pb-[9rem]": "pb-[2rem]"} `}>
                <Outlet 
                    context=
                    {
                        { 
                            selectedtrack: trackInfo,
                            createPlaylist 
                        } satisfies WebsiteContext
                    } 
                />
            </div>
            
            {
                track.value 
            && 
                <MusicPlayer 
                    publishedTrack={track.value} 
                    
                    overlay={musicPlayerOverlay}
                    close={track.reset} 

                    goNext={goNext} 
                    goPrevious={goPrevious}
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
