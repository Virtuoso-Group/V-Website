import { memo, useEffect, useState } from "react";
import { IconType } from "react-icons";
import ButtonIcon from "../../../Atoms/ButtonIcon";
import { FaPause, FaPlay, FaStepBackward, FaStepForward } from "react-icons/fa";
import { PlayerState } from "../../../../Utils/hooks/useMusicPlayer";

import PuffLoader from 'react-spinners/PuffLoader'
import { JsxElement } from "typescript";

interface PlayerControlsProps 
{
    className?: string,
    playerState: PlayerState,

    stepBackwards: () => void,
    togglePlay: () => void,
    stepForwards: () => void,
}

const MiddleButton = (props: { playerState: PlayerState }) =>
{
    const { playerState } = props;

    const MiddleIcon: { [index in PlayerState]: JSX.Element } = 
    {
        [PlayerState.PLAYING]: <FaPause size={"1.5625rem"} />,

        [PlayerState.PAUSED]: <FaPlay size={"1.5625rem"} />,

        [PlayerState.STOPPED]: <FaPlay size={"1.5625rem"} />,

        [PlayerState.LOADING]: <PuffLoader color="#dc143c" loading={true} size={"1.5625rem"} />
    }

   return MiddleIcon[playerState]
}

const PlayerControls = memo((props: PlayerControlsProps) =>
{
    const { className, playerState, stepBackwards, togglePlay, stepForwards } = props;
    
    return (
        <div className={`${className}`}>
            <ButtonIcon 
                className=
                {`
                    size-[2.1875rem]
                    rounded-full bg-slate-300

                    flex items-center justify-center
                `}
                name="Step Forward"
                icon={<FaStepBackward size={"1rem"}/>}

                onClick={stepBackwards}
            />

            <ButtonIcon 
                className=
                {`
                    size-[3.125rem]
                    rounded-full bg-slate-300

                    flex items-center justify-center
                `}
                name="Play"
                icon={<MiddleButton playerState={playerState} />}

                onClick={togglePlay}
            />

            <ButtonIcon 
                className=
                {`
                    size-[2.1875rem]
                    rounded-full bg-slate-300

                    flex items-center justify-center
                `}
                name="Step Forward"
                icon={<FaStepForward size={"1rem"}/>}

                onClick={stepForwards}
            />
        </div>
    )
})

export default PlayerControls