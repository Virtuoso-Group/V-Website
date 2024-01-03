import { memo } from "react";
import { releaseURL } from "../../../../config/config";
import CoverArt from "../../../Atoms/CoverArt";

interface SongInfoProps
{
    className?: string, 

    trackName: string, 
    release: 
    {
        _id: string
       title: string,
    },  
    artistName: string,
}


const TrackInformation = memo((props: SongInfoProps) =>
{
    const { className, trackName: songName, artistName, release } = props;

    const coverArt = `${releaseURL}/${release._id}/cover_art.jpeg`

    return (
        <div className={`flex items-center whitespace-nowrap ${className}`}>
            <CoverArt
                className={`h-[50px] bg-blue-800 rounded-sm`}
                name={release.title}
                coverArt={coverArt??""} 
            />

            <p className='flex flex-col'>
                <span className='font-bold text-white text-lg'>
                    {songName}
                </span>

                <span className='text-sm font-light text-gray-300 align-middle text-slate-300'>
                    {artistName} <span className="">•</span> {release.title}
                </span>
            </p>
        </div>
    )
})

export default TrackInformation