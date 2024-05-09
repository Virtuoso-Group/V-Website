import { memo, useContext } from "react";
import { AnimatePresence } from "framer-motion";
import { MotionCoverArt } from "../../../../components/Atoms/CoverArt";
import { BeatLoader } from "react-spinners";
import { PlayerContext } from "../PlayerContext";
import { PlayerState } from "../hooks/useMusicPlayer";
import Link from "../../../../components/Atoms/Text/Link";
import VMarquee from "../../../../components/Atoms/Text/VMarquee";

interface Props
{
    className?: string, 
    showCoverArt: boolean,
    mode: "mobile" | "desktop",

}

const TrackInformation = memo((props: Props) =>
{
    const { track, artist, release, playerState, overlay } = useContext(PlayerContext);

    const { className, showCoverArt, mode } = props;
    
    const isLoading = playerState ===  PlayerState.LOADING;

    return (
        <div className={`flex whitespace-nowrap ${className} w-full`}>
            <div 
                className=
                {`
                    z-[99] relative 
                    aspect-square size-[3.125rem] 
                    flex items-center justify-center 
                `}
            >

                {/* 
                    I made this to look like a slot/depression. 
                    This gives the impression that you can plug something in it.

                    In this case, it's the album cover.
                */}
                <div 
                    className=
                    {`
                        absolute  size-full 
                        rounded-sm border border-primary bg-primary/25
                    `} 
                />
                  
                <AnimatePresence>
                    {
                        showCoverArt 
                    &&
                        <MotionCoverArt
                            id={`${release._id}${mode}`}
                            className={` relative h-full rounded-sm ${isLoading && "brightness-50"}`}
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

            <section className='flex flex-col overflow-hidden w-fill'>
                {/* <AutoMarquee 
                    className='font-bold text-white text-lg'
                    text={track.title}
                /> */}

                <VMarquee 
                    containerStyle='font-bold text-white text-lg'
                    text={track.title}
                />
                
                <p className="flex SD:hidden text-sm font-light align-middle text-slate-300">{artist.name}</p>

                <section className='hidden SD:flex gap-1 text-sm font-light align-middle text-slate-300'>
                    <Link 
                        to={`/artist/${artist._id}`} 
                        text={artist.name}
                        onClick={overlay.hide}  
                    />

                    <span>•</span> 
                    
                    <Link 
                        to={`/album/${release._id}`}
                        text={release.title}
                        onClick={overlay.hide}  
                    />
                </section>
            </section>
        </div>
    )
})

export default TrackInformation