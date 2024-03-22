import { RemoveScroll } from "react-remove-scroll";
import { useContext } from "react";
import { PlayerContext } from "../../../PlayerContext";
import { motion } from "framer-motion";
import PlayerBackground from "../../../components/PlayerBackground";
import { websitePadding } from "../../../../../../config/style";
import { MotionCoverArt } from "../../../../../../components/Atoms/CoverArt";
import Lyrics from "../../../components/Lyrics/Lyrics";
import LyricsButtons from "../../../components/LyricsButtons";

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
                        h-[38rem] 
                        gap-10
                        flex justify-center items-center 
                    `}
                >
                    <MotionCoverArt
                        id={`${release._id}${"desktop"}`}
                        className={`flex h-full rounded-lg `}                
                        name={release.title}
                        coverArt={release.coverArt} 
                        loading={"eager"}
                    />

                    <Lyrics 
                        className=
                        {`
                            absolute 
                            flex justify-center items-center 
                            aspect-square
                            h-full
                            rounded-lg 
                        `} 
                    />

                    <LyricsButtons />
                </section>
            </motion.div>   
        </RemoveScroll>
    )
}

export default PlayerOverlay;