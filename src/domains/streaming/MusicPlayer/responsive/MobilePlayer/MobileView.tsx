import { useContext } from "react";
import { PlayerContext } from "../../PlayerContext";

import { AnimatePresence } from "framer-motion";

import PlayerOverlay from "./components/PlayerOverlay";
import Footer from "./components/Footer";

const MobileView = () => 
{
    const player = useContext(PlayerContext);

    return (
        <>
            <Footer {...player} />

            <AnimatePresence>
                {
                    player.overlay.isOn 
                &&
                    <PlayerOverlay />
                }
            </AnimatePresence>
        </>
    )
}

export default MobileView