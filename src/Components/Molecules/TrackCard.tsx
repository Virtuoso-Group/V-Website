import { forwardRef, useState } from 'react'
import CoverArt from '../Atoms/CoverArt';
import Marquee from 'react-fast-marquee';
import { Track } from '../../Utils/types/track';

import AlbumsObj from '../../Utils/dummyData/albums';
import ArtistsObject from '../../Utils/dummyData/artists';

type Props = 
{ 
    song: Track, 
    select: (song: Track) => void 
}

const TrackCard = forwardRef<HTMLElement, Props>((props, ref) => 
{
    const { song, select } = props;

    const [isHover, setIsHover] = useState<boolean>(false)

    return (
        <article 
            ref={ref}
            className='flex cursor-pointer flex-col w-[150px] gap-2'
            onClick={() => select(song)}

            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <CoverArt 
                className={`rounded-lg`}
                name={song.name + " by "+ArtistsObject[song.artistID].name}
                coverArt={AlbumsObj[song.albumID].coverArt} 
            />

            <div className='text-white flex flex-col overflow-hidden whitespace-nowrap'>
                <Marquee 
                    key={""+isHover}
                    play={isHover}
                    autoFill={false}
                >
                    <span className='text-lgn font-extrabold pe-10'>{song.name}</span>
                </Marquee>

                <span className='text-md'>{ArtistsObject[song.artistID].name}</span>
            </div>
        </article>
    )
})

export default TrackCard