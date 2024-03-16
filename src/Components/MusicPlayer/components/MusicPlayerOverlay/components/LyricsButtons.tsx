import { MdLyrics } from "react-icons/md";
import ButtonIcon from "../../../../Atoms/ButtonIcon";

interface ControlsProps 
{
    areLyricsAvailable: boolean,
    toggleLyrics: () => void
}

const LyricsButtons = (props: ControlsProps) =>
{
    const { areLyricsAvailable, toggleLyrics } = props;

    return (
        <div className='absolute top-0 flex right-0'>
            {
                areLyricsAvailable
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

                    onClick={toggleLyrics}
                />
            }
        </div>
    )
}


export default LyricsButtons;