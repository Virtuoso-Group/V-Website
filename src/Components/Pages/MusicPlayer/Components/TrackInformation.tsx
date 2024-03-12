import { memo } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { MotionCoverArt } from "../../../Atoms/CoverArt";
import { BeatLoader, BounceLoader, FadeLoader, GridLoader, HashLoader, MoonLoader, PuffLoader, PulseLoader, RingLoader } from "react-spinners";
import Marquee from "react-fast-marquee";

interface Props
{
    showCoverArt: boolean,
    className?: string, 
    trackTitle: string, 
    release: { _id: string, title: string, coverArt: string },  
    artist: { _id: string, name: string }

    mode: "mobile" | "desktop",

    isLoading?: boolean,
    hideOverlay: () => void
}


const TrackInformation = memo((props: Props) =>
{
    const 
    { 
        className,
        showCoverArt, 
        trackTitle, 
        artist, 
        release,
        
        mode
    } = props;
    
    const isLoading = mode === "mobile" && props.isLoading;

    return (
        <div className={`flex whitespace-nowrap ${className} w-full`}>
            <div className="z-[99] relative aspect-square size-[3.125rem] flex items-center justify-center ">
                <AnimatePresence>
                    {
                        showCoverArt 
                    &&
                        <MotionCoverArt
                            id={`${release._id}${mode}`}
                            className={` relative h-full bg-blue-800 rounded-sm ${isLoading && "brightness-50"}`}
                            name={release.title}
                            coverArt={release.coverArt} 
                        /> 
                    }
                </AnimatePresence>

                {
                    isLoading
                &&
                    <BeatLoader 
                        className="size-full absolute aspect-square flex justify-center items-center"
                        
                        color={"#dc143c"} 
                        loading={true} 
                        size={"0.5rem"}
                    />
                } 
            </div>

            <p className='flex flex-col overflow-hidden w-fill'>
                <Marquee 
                    // key={""+isHover}
                    play={mode === "mobile"}
                    autoFill={false}
                    speed={30}
                >
                    <span className='font-bold text-white text-lg'>
                        {" "+trackTitle+" "}
                    </span>
                </Marquee>
                
                <span className="flex SD:hidden text-sm font-light align-middle text-slate-300">{artist.name}</span>

                <span className='hidden SD:flex gap-1 text-sm font-light align-middle text-slate-300'>
                    <Link to={`/artist/${artist._id}`} onClick={props.hideOverlay}>{artist.name}</Link>

                    <span className="hidden SD:flex">•</span> 
                    
                    <Link className="hidden SD:flex" to={`/album/${release._id}`} onClick={props.hideOverlay}>{release.title}</Link>
                </span>
            </p>
        </div>
    )
})

export default TrackInformation