import { MdLyrics } from "react-icons/md";
import ButtonIcon from "../../../../components/Atoms/ButtonIcon";
import { useContext } from "react";
import { PlayerContext } from "../PlayerContext";
import { websitePadding } from "../../../../config/style";


const LyricsButtons = () =>
{
    const { lyricsObj, track } = useContext(PlayerContext)

    return (
        <div className={`absolute top-0 flex right-0 ${websitePadding}`}>
            {
                (track.type === "instrumental" || lyricsObj.lyrics && lyricsObj.lyrics.status !== "Unavailable")
            &&
                <ButtonIcon 
                    className=
                    {`  
                        z-[99]
                        flex items-center justify-center

                        size-[2.1875rem]
                        
                        
                        rounded-full bg-slate-300
                    `}
                    name='showLyrics'
                    icon={<MdLyrics size={"1rem"}/>}

                    onClick={lyricsObj.toggle}
                />
            }
        </div>
    )
}


export default LyricsButtons;