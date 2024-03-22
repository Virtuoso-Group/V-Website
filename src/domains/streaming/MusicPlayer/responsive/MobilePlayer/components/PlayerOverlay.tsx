import {  motion } from "framer-motion";
import PlayerBackground from "../../../components/PlayerBackground";
import Lyrics from "../../../components/Lyrics/Lyrics";
import LyricsButtons from "../../../components/LyricsButtons";
import { useContext } from "react";
import { PlayerContext } from "../../../PlayerContext";
import { RemoveScroll } from "react-remove-scroll";
import MobilePlayer from "./MobilePlayer";
import { websitePadding } from "../../../../../../config/style";

const PlayerOverlay = () =>
{
    const { release } = useContext(PlayerContext);

    return (
        <RemoveScroll>
            <motion.div 
                layout
                className=
                {`  
                    z-[50] pointer-events-auto 
                    fixed grid min-w-[375px] w-full h-full bg-blue-300 jutsfiy-center items-center pt-[4rem] pb-[5.25rem]
                `}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
            >
                <PlayerBackground coverArt={release.coverArt} />

                <section 
                    className=
                    {`
                        z-[50]
                        ${websitePadding}
                        relative
                        h-full
                        gap-10
                        flex
                        justify-center
                    `}
                >
                    <MobilePlayer className={"flex"} />

                    <Lyrics className={"absolute w-full h-full"}/>
                       
                    <LyricsButtons />
                </section>
            </motion.div>   
        </RemoveScroll>    
    )
}

export default PlayerOverlay