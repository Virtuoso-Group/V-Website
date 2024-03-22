import { Track } from "../../../Utils/types/track";

import  { Overlay } from "../../../Utils/hooks/useOverlay";
import { PlayerContextProvider } from "./PlayerContext";
import useDeviceType from "../../../config/useDeviceType";
import MobileView from "./responsive/MobilePlayer/MobileView";
import DesktopView from "./responsive/DesktopPlayer/DesktopView";


// TODO: allow the music player to accept a list of tracks at a time
// You can think of it as accepting a playlist or a release.
/* 
    Once the music player reaches the end of a list, we have three options:
        A: Stop the player completely.
        B: Start over from the beginning.
        C: Inject another playlist/release
*/

interface Props
{
    track: Track,
    overlay: Overlay,
    
    close: () => void
}

export const MusicPlayer = (props: Props) => 
{
    const deviceType = useDeviceType();

    const DeviceView = deviceType === "MOBILE"? MobileView: DesktopView;

    return (
        <PlayerContextProvider {...props}>
            <div className="z-[80] fixed h-screen min-w-[375px] w-full pointer-events-none">
                <DeviceView />
            </div>
        </PlayerContextProvider>
    )
}
