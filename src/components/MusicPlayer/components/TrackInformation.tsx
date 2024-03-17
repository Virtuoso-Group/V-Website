import { memo, useContext } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { MotionCoverArt } from "../../Atoms/CoverArt";
import { BeatLoader } from "react-spinners";
import Marquee from "react-fast-marquee";
import { PlayerContext } from "../PlayerContext";
import { PlayerState } from "../hooks/useMusicPlayer";

interface Props
{
    className?: string, 
    showCoverArt: boolean,
    mode: "mobile" | "desktop",

}

const TrackInformation = memo((props: Props) =>
{
    const { track, artist, release, playerState, overlay } = useContext(PlayerContext);

    const 
    { 
        className,
        showCoverArt,         
        mode
    } = props;
    
    const isLoading = playerState ===  PlayerState.LOADING;

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
                        {" "+track.title+" "}
                    </span>
                </Marquee>
                
                <span className="flex SD:hidden text-sm font-light align-middle text-slate-300">{artist.name}</span>

                <span className='hidden SD:flex gap-1 text-sm font-light align-middle text-slate-300'>
                    <Link to={`/artist/${artist._id}`} onClick={overlay.hide}>{artist.name}</Link>

                    <span className="hidden SD:flex">•</span> 
                    
                    <Link className="hidden SD:flex" to={`/album/${release._id}`} onClick={overlay.hide}>{release.title}</Link>
                </span>
            </p>
        </div>
    )
})

export default TrackInformation