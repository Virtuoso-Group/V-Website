import { memo } from "react";
import { IconType } from "react-icons";
import ButtonIcon from "../../../Atoms/ButtonIcon";
import { FaPause, FaPlay, FaStepBackward, FaStepForward } from "react-icons/fa";

interface PlayerControlsProps 
{
    className?: string,
    isPlaying: boolean,

    stepBackwards: () => void,
    togglePlay: () => void,
    stepForwards: () => void,
}

const PlayerControls = memo((props: PlayerControlsProps) =>
{
    const { className, isPlaying, stepBackwards, togglePlay, stepForwards } = props;

    const PlayPauseIcon: IconType = isPlaying? FaPause: FaPlay;
        
    return (
        <div className={`${className}`}>
            <ButtonIcon 
                className=
                {`
                    h-[35px] 
                    aspect-square 
                    rounded-full bg-slate-300

                    flex items-center justify-center
                `}
                name="Step Forward"
                icon={<FaStepBackward size={15}/>}

                onClick={stepBackwards}
            />

            <ButtonIcon 
                className=
                {`
                    h-[50px] 
                    aspect-square 
                    rounded-full bg-slate-300

                    flex items-center justify-center
                `}
                name="Play"
                icon={<PlayPauseIcon size={25}/>}

                onClick={togglePlay}
            />

            <ButtonIcon 
                className=
                {`
                    h-[35px]  
                    aspect-square 
                    rounded-full bg-slate-300

                    flex items-center justify-center
                `}
                name="Step Forward"
                icon={<FaStepForward size={15}/>}

                onClick={stepForwards}
            />
        </div>
    )
})

export default PlayerControls