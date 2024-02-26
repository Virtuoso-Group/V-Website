import { forwardRef, memo, useState } from 'react'
import CoverArt from '../Atoms/CoverArt';
import Marquee from 'react-fast-marquee';

type Props = 
{ 
    trackID: string, 

    title: string,
    artistName: string,
    coverArt: string, 

    select: (trackID: string) => void;
}

const TrackCard = memo(forwardRef<HTMLElement, Props>((props, ref) => 
{
    const { trackID, title, artistName, coverArt, select } = props;

    const [isHover, setHover] = useState<boolean>(false)

    return (
        <article 
            ref={ref}            
            className='flex cursor-pointer flex-col w-[9.375rem] gap-2'
            onClick={() => select(trackID)}

            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <CoverArt 
                className={`rounded-lg`}
                name={title + " by "+artistName}
                coverArt={coverArt?? ""} 
            />

            <div className='text-white flex flex-col overflow-hidden whitespace-nowrap'>
                <Marquee 
                    key={""+isHover}
                    play={isHover}
                    autoFill={false}
                >
                    <span className='text-lgn font-extrabold pe-10'>{title}</span>
                </Marquee>

                <span className='text-md'>{artistName}</span>
            </div>
        </article>
    )
}))

export default TrackCard