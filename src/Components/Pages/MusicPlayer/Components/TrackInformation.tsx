import { memo } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { MotionCoverArt } from "../../../motion/MotionCoverArt";

interface SongInfoProps
{
    showCoverArt: boolean,
    className?: string, 
    trackName: string, 
    release: { _id: string, title: string, coverArt: string },  
    artist: { _id: string, name: string }

    onClick: () => void
}

// const MotionCoverArt = motion(CoverArt)


const TrackInformation = memo((props: SongInfoProps) =>
{
    const { showCoverArt, className, trackName, artist, release } = props;
    
    return (
        <div className={`flex items-center whitespace-nowrap ${className}`}>

            <div className="h-[3.125rem] aspect-square">
                <AnimatePresence>
                    {
                        showCoverArt 
                    &&
                        <MotionCoverArt
                            id={release._id}
                            className={` h-full bg-blue-800 rounded-sm`}
                            name={release.title}
                            coverArt={release.coverArt} 
                        /> 
                    }
                </AnimatePresence>
            </div>

            <p className='flex flex-col'>
                <span className='font-bold text-white text-lg'>
                    {trackName}
                </span>

                <span className='flex gap-1 text-sm font-light align-middle text-slate-300'>
                    <Link to={`/artist/${artist._id}`} onClick={props.onClick}>{artist.name}</Link>

                    <span className="">•</span> 
                    
                    <Link to={`/album/${release._id}`} onClick={props.onClick}>{release.title}</Link>
                </span>
            </p>
        </div>
    )
})

export default TrackInformation