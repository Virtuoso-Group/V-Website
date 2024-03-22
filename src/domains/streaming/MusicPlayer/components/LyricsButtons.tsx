import { MdLyrics } from "react-icons/md";
import ButtonIcon from "../../../../components/Atoms/ButtonIcon";
import { useContext } from "react";
import { PlayerContext } from "../PlayerContext";


const LyricsButtons = () =>
{
    const { lyrics } = useContext(PlayerContext)

    return (
        <div className='absolute top-0 flex right-0'>
            {
                lyrics.value.status !== "Unavailable"
            &&
                <ButtonIcon 
                    className=
                    {`  
                        z-[99]
                        flex items-center justify-center

                        size-[2.1875rem]
                        m-4
                        
                        rounded-full bg-slate-300
                    `}
                    name='showLyrics'
                    icon={<MdLyrics size={"1rem"}/>}

                    onClick={lyrics.toggle}
                />
            }
        </div>
    )
}


export default LyricsButtons;