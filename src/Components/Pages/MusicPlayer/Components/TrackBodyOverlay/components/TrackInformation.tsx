import { useContext } from "react";
import { PlayerContext } from "../../../MusicPlayer";
import { Link } from "react-router-dom";
import SeekBar from "../../../../../Molecules/SeekBar";
import CoverArtContainer from "./CovertArtContainer";
import TimeInformation from "./TimeInformation";

type Release =
{ 
    _id: string, 
    title: string, 
    coverArt: string 
}

interface Props
{
    release: Release,
}

const TrackInformation = (props: Props) =>
{
    const { release } = props;

    const 
    { 
        track, artist,
    
        pause, seek, hideOverlay
    } = useContext(PlayerContext);

    return (
        <section 
            className=
            {`
                relative size-full 
                flex flex-col SD:flex-row 
                SD:justify-center
                gap-5 

                mt-[2rem] SD:mt-0
            `}
        >
            <CoverArtContainer release={release} />

            <p className='flex flex-col SD:hidden'>
                <span className='font-bold text-white text-2xl'>
                    {track.title}
                </span>

                <Link 
                    className='text-sm font-light text-slate-300'
                    to={`/artist/${artist.id}`}

                    onClick={hideOverlay}
                >
                    {artist.name}
                </Link>
            </p>

            <div className='flex flex-col gap-2 SD:hidden'>
                <SeekBar
                    trackID={track.id}
                    duration={track.duration}
                    controls={{ pause, seek }}
                />

                <TimeInformation 
                    className="w-full font-light text-gray-300 text-xs" 
                    trackID={track.id} 
                    duration={track.duration} 
                />
            </div>
        </section>
    )
}

export default TrackInformation