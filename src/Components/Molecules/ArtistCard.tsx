import { forwardRef, useState } from 'react'

import { Artist } from '../../Utils/types/track'
import Avatar from '../Atoms/Avatar'

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
            className='flex cursor-pointer flex-col w-[9.375rem] gap-4 items-center '
            onClick={onClick}

            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <Avatar className='w-full' src={artist.image} title={artist.name} />

            <p className='max-w-full text-lg text-center text-white font-extrabold whitespace-nowrap  overflow-hidden'>
                {artist.name}
            </p>
        </article>
    )
})

export default ArtistCard