import { useContext } from "react"
import { websitePadding } from "../../../config/style"
import ToggleTriangle from "../../Atoms/ToggleTriangle"
import SeekBar from "../components/Bars/SeekBar/SeekBar"
import { PlayerContext } from "../PlayerContext"
import TrackInformation from "../components/TrackInformation"
import PlayerControls from "../components/PlayerControls"
import TimeInformation from "../components/TimeInformation"
import CloseButton from "../../Atoms/CloseButton"

type Props = {}

const DesktopView = (props: Props) => 
{

    const { overlay, closeMusicPlayer } = useContext(PlayerContext);

    return (
        <div 
            className=
            {`
                
                bg-black
                
                z-[80] fixed bottom-0 hidden SD:flex w-full pointer-events-auto
            `}
        >
            <div className={`w-full`}>
                <SeekBar className={`flex`} />

                <div className={`${websitePadding} w-full flex items-center justify-between h-[4rem] py-[2.5rem]`}>
                    <ToggleTriangle {...overlay} />
                        
                    <div className="hidden SD:grid grid-cols-3 content-center w-full h-full  px-20">
                        <TrackInformation 
                            className="justify-self-start flex gap-5 items-center"
                            mode={"desktop"}
                            showCoverArt={!overlay.isOn}
                        />

                        <PlayerControls 
                            className="flex items-center justify-self-center h-full gap-10"
                            
                            middleButtonSize="2rem"
                            sideButtonsSize="1.25rem"
                        />
                    
                        <TimeInformation 
                            className=
                            {`
                                flex items-center justify-center
                                justify-self-end
                                font-light text-gray-300
                                text-xs
                            `}
                        />
                    </div>

                    <CloseButton onClick={closeMusicPlayer}/>
                </div>
            </div>
        </div>
    )
}

export default DesktopView