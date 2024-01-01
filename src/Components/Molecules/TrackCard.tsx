import { forwardRef, useState } from 'react'
import CoverArt from '../Atoms/CoverArt';
import Marquee from 'react-fast-marquee';
import { Track } from '../../Utils/types/track';
import { AWS_URL } from '../../API/config';

type Props = 
{ 
    track: Track, 
    select: (song: Track) => void 
}

const TrackCard = forwardRef<HTMLElement, Props>((props, ref) => 
{
    const { track, select } = props;

    const [isHover, setIsHover] = useState<boolean>(false)

    const coverArt = `${AWS_URL.release.dev}/${track.release._id}/cover_art.jpeg`;

    return (
        <article 
            ref={ref}
            className='flex cursor-pointer flex-col w-[150px] gap-2'
            onClick={() => select(track)}

            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <CoverArt 
                className={`rounded-lg`}
                name={track.title + " by "+track.artist.name}
                coverArt={coverArt?? ""} 
                // name={song.name + " by "+ArtistsObject[song.artistID].name}
                // coverArt={AlbumsObj[song.albumID].coverArt} 
            />

            <div className='text-white flex flex-col overflow-hidden whitespace-nowrap'>
                <Marquee 
                    key={""+isHover}
                    play={isHover}
                    autoFill={false}
                >
                    <span className='text-lgn font-extrabold pe-10'>{track.title}</span>
                </Marquee>

                {/* <span className='text-md'>{ArtistsObject[song.artistID].name}</span> */}
            </div>
        </article>
    )
})

export default TrackCard