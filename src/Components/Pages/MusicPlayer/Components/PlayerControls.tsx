import { memo, useContext, useEffect, useState } from "react";
import { IconType } from "react-icons";
import ButtonIcon from "../../../Atoms/ButtonIcon";
import { FaPause, FaPlay, FaStepBackward, FaStepForward } from "react-icons/fa";
import { PlayerState } from "../../../../Utils/hooks/useMusicPlayer";

import PuffLoader from 'react-spinners/PuffLoader'
import { PlayerContext } from "../MusicPlayer";


interface MiddleButtonProps
{ 
    className?:string, 
    size: string,
    playerState: PlayerState,

    onClick?: () => void
}

// TODO: this needs to be refactored to make it readable
const MiddleButton = (props: MiddleButtonProps) =>
{
    const { className, size, playerState, onClick } = props;

    const MiddleIcon: { [index in PlayerState]: JSX.Element } = 
    {
        [PlayerState.PLAYING]: 
            <FaPause 
                className={className} 
                size={size}
                
                onClick={onClick}
            />,

        [PlayerState.PAUSED]: 
            <FaPlay 
                className={className} 
                size={size}
                
                onClick={onClick}
            />,

        [PlayerState.STOPPED]: 
            <FaPlay 
                className={className} 
                size={size}
                
                onClick={onClick}
            />,

        [PlayerState.LOADING]: <PuffLoader color="#dc143c" loading={true} size={size} />
    }

   return MiddleIcon[playerState]
}

interface PlayerControlsProps 
{
    className?: string,

    middleButtonSize?: string,
    sideButtonsSize?: string
}

const PlayerControls = memo((props: PlayerControlsProps) =>
{
    const { playerState, stepBackwards, togglePlay, stepForwards} =  useContext(PlayerContext);
    
    const { middleButtonSize, sideButtonsSize } = props;

    return (
        <div  className={`${props.className}`}>
            <FaStepBackward 
                className="fill-slate-300" 
                size={sideButtonsSize?? "1rem"}
                
                onClick={stepBackwards}
            />

            <MiddleButton 
                className="fill-slate-300" 
                size={middleButtonSize?? "1rem"}
                playerState={playerState} 

                onClick={togglePlay}
            />

            <FaStepForward 
                className="fill-slate-300" 
                size={sideButtonsSize?? "1rem"} 

                onClick={stepForwards}
            />
        </div>
    )
})

export default PlayerControls