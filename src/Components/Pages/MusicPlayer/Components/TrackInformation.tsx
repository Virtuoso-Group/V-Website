import { memo } from "react";
import { getCoverArt, releaseURL } from "../../../../config/config";
import CoverArt from "../../../Atoms/CoverArt";
import { Link } from "react-router-dom";

interface SongInfoProps
{
    className?: string, 
    trackName: string, 
    release: { _id: string, title: string },  
    artist: { _id: string, name: string }

    onClick: () => void
}


const TrackInformation = memo((props: SongInfoProps) =>
{
    const { className, trackName, artist, release } = props;

    return (
        <div className={`flex items-center whitespace-nowrap ${className}`}>
            <CoverArt
                className={`h-[50px] bg-blue-800 rounded-sm`}
                name={release.title}
                coverArt={getCoverArt(release._id)??""} 
            />

            <p className='flex flex-col'>
                <span className='font-bold text-white text-lg'>
                    {trackName}
                </span>

                <span className='flex gap-1 text-sm font-light text-gray-300 align-middle text-slate-300'>
                    <Link to={`/artist/${artist._id}`} onClick={props.onClick}>{artist.name}</Link>

                    <span className="">•</span> 
                    
                    <Link to={`/album/${release._id}`} onClick={props.onClick}>{release.title}</Link>
                </span>
            </p>
        </div>
    )
})

export default TrackInformation