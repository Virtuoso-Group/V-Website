import { forwardRef, memo, useState } from 'react'
import CoverArt from '../Atoms/CoverArt';
import Marquee from 'react-fast-marquee';
import { Track } from '../../Utils/types/track';
import { AWS_URL } from '../../config/config';

type Props = 
{ 
    hover: 
    {
        isHover: boolean;
        onStart: () => void;
        onEnd: () => void;
    }
    track: 
    {
        value: Track;
        select: () => void;
    }
}

const TrackCard = memo(forwardRef<HTMLElement, Props>((props, ref) => 
{
    const { hover, track } = props;

    const coverArt = `${AWS_URL.release.dev}/${track.value.release._id}/cover_art.jpeg`;

    return (
        <article 
            ref={ref}
            className='flex cursor-pointer flex-col w-[9.375rem] gap-2'
            onClick={track.select}

            onMouseEnter={hover.onStart}
            onMouseLeave={hover.onEnd}
        >
            <CoverArt 
                className={`rounded-lg`}
                name={track.value.title + " by "+track.value.artist.name}
                coverArt={coverArt?? ""} 
            />

            <div className='text-white flex flex-col overflow-hidden whitespace-nowrap'>
                <Marquee 
                    key={""+hover.isHover}
                    play={hover.isHover}
                    autoFill={false}
                >
                    <span className='text-lgn font-extrabold pe-10'>{track.value.title}</span>
                </Marquee>

                <span className='text-md'>{track.value.artist.name}</span>
            </div>
        </article>
    )
}))

export default TrackCard