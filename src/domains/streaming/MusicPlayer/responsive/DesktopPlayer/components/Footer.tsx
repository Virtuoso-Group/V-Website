import { Overlay } from "../../../../../../Utils/hooks/useOverlay";
import { websitePadding } from "../../../../../../config/style";
import CloseButton from "../../../../../../components/Atoms/CloseButton";
import ToggleTriangle from "../../../../../../components/Atoms/ToggleTriangle";
import SeekBar from "../../../components/Bars/SeekBar/SeekBar";
import PlayerControls from "../../../components/PlayerControls";
import TrackInformation from "../../../components/TrackInformation";
import TimeInformation from "./TimeInformation";

interface FooterProps
{
    overlay: Overlay, 
    closeMusicPlayer: () => void
}

const Footer = (props: FooterProps) => 
{
    const { overlay, closeMusicPlayer } = props;

    // TODO: there must be some way to simplify this
    return (
        <footer 
            className=
            {`
                z-[80]
                bg-black
                
                fixed bottom-0 flex w-full pointer-events-auto
            `}
        >
            <div className={`w-full`}>
                <SeekBar className={`flex`} />

                <div className={`${websitePadding} w-full flex items-center justify-between h-[4rem] py-[2.5rem]`}>
                    <ToggleTriangle {...overlay} />
                        
                    <div className="grid grid-cols-3 content-center w-full h-full  px-20">
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
        </footer>
    )
}

export default Footer