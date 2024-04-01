import { Overlay } from "../../../../../../Utils/hooks/useOverlay";
import { websitePadding } from "../../../../../../config/style";
import CloseButton from "../../../../../../components/Atoms/CloseButton";
import ToggleTriangle from "../../../../../../components/Atoms/ToggleTriangle";
import ProgressBar from "../../../components/Bars/ProgressBar";
import TrackInformation from "../../../components/TrackInformation";

interface FooterProps
{
    overlay: Overlay,
    closeMusicPlayer: () => void
}

const Footer = (props: FooterProps) =>
{
    const { overlay,  closeMusicPlayer } = props;

    return (
        <footer 
            className=
            {`
                z-[80]
                  fixed bottom-0  w-full pointer-events-auto
                ${overlay.isOn? "SD:bg-menuBackground": "bg-menuBackground"}
            `}
        >
            
                {!overlay.isOn && <ProgressBar className="flex" />}

                <div className={`${websitePadding} w-full flex items-center justify-between h-[4rem] py-[2.5rem]`}>
                    <div className="flex items-center gap-2 w-[70%]">
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
        </footer>
    )
}

export default Footer;