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

    // TODO: there must be some way to simplify this. Way too many divs, way too many containers.
    return (
        <footer 
            className=
            {` 
                z-[80]
                bg-menuBackground
                
                fixed bottom-0  w-full pointer-events-auto
            `}
        >
            <SeekBar className={`flex`} />

            <div className={`${websitePadding} w-full grid grid-cols-3  content-center justify-between h-[4rem] py-[2.5rem]`}>
                <div className="flex items-center gap-10">
                    <ToggleTriangle {...overlay} />

                    <TrackInformation 
                        className="flex gap-5 items-center"
                        mode={"desktop"}
                        showCoverArt={!overlay.isOn}
                    />
                </div>
                
                    
                <PlayerControls 
                    className="bg-menuBackground flex justify-center justify-self-center items-center h-full w-fit gap-10"
                    
                    middleButtonSize="2rem"
                    sideButtonsSize="1.25rem"
                />

                <div className="flex items-center gap-10 w-fit justify-self-end">
                    <TimeInformation 
                            className=
                            {`
                                flex items-center justify-center
                                
                                font-light text-gray-300
                                text-sm
                            `}
                        />
                    <CloseButton onClick={closeMusicPlayer}/>
                </div>
                
            </div>
        </footer>
    )
}

export default Footer