import { useContext } from "react"
import { PlayerContext } from "../PlayerContext"
import ProgressBar from "../components/Bars/ProgressBar";
import TrackInformation from "../components/TrackInformation";
import CloseButton from "../../Atoms/CloseButton";
import ToggleTriangle from "../../Atoms/ToggleTriangle";
import { websitePadding } from "../../../config/style";

type Props = {}

const MobileView = (props: Props) => 
{

    const { overlay,  closeMusicPlayer} = useContext(PlayerContext);

    return (
        <div 
            className=
            {`
                flex SD:hidden
                z-[80] fixed bottom-0  w-full pointer-events-auto
                ${overlay.isOn? "SD:bg-black": "bg-black"}
            `}
        >
            <div className={`w-full`}>
                {!overlay.isOn && <ProgressBar className="flex" />}

                <div className={`${websitePadding} w-full flex items-center justify-between h-[4rem] py-[2.5rem]`}>
                    <div className="flex gap-2 w-[70%]">
                        <ToggleTriangle {...overlay} />
                        
                        {
                            !overlay.isOn 
                        && 
                            <TrackInformation
                                className="gap-5"
                                mode={"mobile"}
                                showCoverArt={true}
                            />
                        }
                    </div>

                    <CloseButton onClick={closeMusicPlayer}/>
                </div>
            </div>
        </div>
    )
}

export default MobileView