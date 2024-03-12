import { useContext } from "react";
import { PlayerContext } from "../../../MusicPlayer";
import { Link } from "react-router-dom";
import SeekBar from "../../../../../Molecules/SeekBar";
import CoverArtContainer from "./CovertArtContainer";
import TimeInformation from "./TimeInformation";
import PlayerControls from "../../PlayerControls";
import { MotionCoverArt } from "../../../../../Atoms/CoverArt";

type Release =
{ 
    _id: string, 
    title: string, 
    coverArt: string 
}

interface Props
{
    className?: string,
    release: Release,
}

const TrackInformation = (props: Props) =>
{
    const { className, release } = props;

    const 
    { 
        track, artist,
    
        pause, seek, hideOverlay
    } = useContext(PlayerContext);

    return (
        <section 
            className=
            {`
                z-[50]
                ${className}

                mt-[2rem]
                relative size-full 
                flex flex-col 
                
                gap-5  

                overflow-scroll
            `}
        >
            <MotionCoverArt
                id={`${release._id}${"mobile"}`}
                className={`w-full rounded-md`}                
                name={release.title}
                coverArt={release.coverArt} 
                loading={"eager"}
            />

            <p className='flex flex-col'>
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

            <div className='flex flex-col gap-2'>
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

            <PlayerControls 
                className="flex items-center justify-center gap-[4rem]" 
                middleButtonSize="2rem"
                sideButtonsSize="1.25rem"
            />
        </section>
    )
}

export default TrackInformation