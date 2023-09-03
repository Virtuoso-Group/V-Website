import React, { useState } from 'react'
import CoverArt from '../Atoms/CoverArt';
import Marquee from 'react-fast-marquee';
import { Track } from '../../Utils/types';

type Props = 
{ 
    song: Track, 
    select: (song: Track) => void 
}

const TrackCard = (props: Props) => {
    const { song, select } = props;

    const [isHover, setIsHover] = useState<boolean>(false)

    return (
        <article 
            className='flex  cursor-pointer flex-col w-[150px] gap-2'
            onClick={() => select(song) }

            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <CoverArt 
                className={`rounded-lg`}
                name={song.name + " by "+song.band}
                coverArt={song.album.coverArt} 
            />

            <p className='text-white flex flex-col overflow-hidden whitespace-nowrap'>
                <Marquee 
                    key={""+isHover}
                    play={isHover}
                    autoFill={false}
                >
                    <span className='text-lgn font-extrabold pe-10'>{song.name}</span>
                </Marquee>

                <span className='text-md'>{song.band}</span>
            </p>
        </article>
    )
}

export default TrackCard