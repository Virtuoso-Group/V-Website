import useDeviceType from "../../../config/useDeviceType"
import DesktopView from "./DesktopView"
import MobileView from "./MobileView"

const ResponsiveMusicPlayer = () => 
{
    // I may have to move this to a context that covers the entire website.
    const deviceType = useDeviceType();

    return (
        <>
            {deviceType === "MOBILE"? <MobileView /> : <DesktopView />}
        </>
    )
}

export default ResponsiveMusicPlayer