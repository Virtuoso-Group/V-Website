import { useContext } from "react";
import { Link } from "react-router-dom";
import SeekBar from "../../../components/Bars/SeekBar/SeekBar";
import TimeInformation from "./TimeInformation";
import PlayerControls from "../../../components/PlayerControls";
import { MotionCoverArt } from "../../../../../../components/Atoms/CoverArt";
import { PlayerContext } from "../../../PlayerContext";
interface Props
{
    className?: string,
}

// TODO: this needs a better name, ASAP
const MobilePlayer = (props: Props) =>
{
    const 
    { 
        track, artist,
    
        release,
        overlay
    } = useContext(PlayerContext);


    /* 
        overflow-x-hidden prevents the ball from showing up and 
        making the music player scrollable horizontally
    */
    return (
        <section 
            className=
            {`
                z-[50]
                ${props.className}

                mt-[2rem]
                relative size-full 
                flex flex-col 
                
                gap-5
                
                overflow-x-hidden
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
                    to={`/artist/${artist._id}`}

                    onClick={overlay.hide}
                >
                    {artist.name}
                </Link>
            </p>

            <div className='flex flex-col gap-2'>
                <SeekBar />

                <TimeInformation className="w-full font-light text-gray-300 text-xs"  />
            </div>

            <PlayerControls 
                className="flex items-center justify-center gap-[4rem]" 
                middleButtonSize="2rem"
                sideButtonsSize="1.25rem"
            />
        </section>
    )
}

export default MobilePlayer