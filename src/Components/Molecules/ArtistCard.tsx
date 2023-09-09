import { forwardRef, useState } from 'react'
import { Artist } from '../../Utils/dummyData/artists'
import Marquee from 'react-fast-marquee'

type Props = 
{
    artist: Artist,
    onClick: () => void
}

const ArtistCard = forwardRef<HTMLElement, Props>((props, ref) => 
{
    const { artist, onClick } = props;

    const [isHover, setIsHover] = useState<boolean>(false)

    return (
        <article
            ref={ref}
            className='flex cursor-pointer flex-col w-[150px] gap-4 items-center'
            onClick={onClick}

            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <img 
                className={`rounded-full aspect-square`}
                src={artist.image}
                title={artist.name}
                alt={artist.name}
            />

            
            <p className='text-lg text-center text-white font-extrabold w-full'>
                {artist.name}
            </p>
        </article>
    )
})

export default ArtistCard