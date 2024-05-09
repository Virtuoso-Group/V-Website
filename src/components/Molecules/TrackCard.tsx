import { forwardRef, memo, useState } from 'react'
import CoverArt from '../Atoms/CoverArt';
import { useWebsiteContext } from '../Organisms/WebsiteLayout';
import VMarquee from '../Atoms/Text/VMarquee';

type Props = 
{ 
    trackID: string, 

    title: string,
    artistName: string,
    coverArt: string, 

    select: () => void;
}

const TrackCard = memo(forwardRef<HTMLElement, Props>((props, ref) => 
{
    const { trackID, title, artistName, coverArt, select } = props;

    const [isHover, setHover] = useState<boolean>(false)

    const { selectedtrack } = useWebsiteContext();

    const isPlaying = selectedtrack?.trackID === trackID;

    const isPlayingStyle = isPlaying? "border-secondary border-[0.1rem]":"";

    return (
        <article 
            ref={ref}            
            className='flex cursor-pointer flex-col w-[9.375rem] gap-2'
            onClick={select}

            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <CoverArt 
                className={`rounded-lg w-full ${isPlayingStyle}`}
                release={{ title: `${title} by ${artistName}`, coverArt }}
            />

            <div className='text-white flex flex-col overflow-hidden whitespace-nowrap'>
                <VMarquee 
                    childStyle='text-lgn font-extrabold pe-10'
                    setting={{ type: "hover", isHover}}
                    text={title} 
                />

                <span className='text-md'>{artistName}</span>
            </div>
        </article>
    )
}))

export default TrackCard