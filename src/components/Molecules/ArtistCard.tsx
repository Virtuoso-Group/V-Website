import { forwardRef, useState } from 'react'

import { ArtistInfo } from '../../Utils/types/track'
import ArtistAvatar from '../Atoms/Avatar/ArtistAvatar'
import VMarquee from '../Atoms/Text/VMarquee'

type Props = 
{
    artist: ArtistInfo,
    onClick: () => void
}

const ArtistCard = forwardRef<HTMLElement, Props>((props, ref) => 
{
    const { artist, onClick } = props;

    const [isHover, setIsHover] = useState<boolean>(false)

    return (
        <article
            ref={ref}
            className={`flex cursor-pointer flex-col w-[9.375rem] gap-4 items-center text-center`}
            onClick={onClick}

            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
        
            <ArtistAvatar className='w-full' artist={artist} />

            {/* <p className='max-w-full text-lg text-center text-white font-extrabold whitespace-nowrap  overflow-hidden'>
                {artist.name}
            </p> */}


            <VMarquee 
                childStyle='w-fit text-lg text-center bg-black text-white font-extrabold whitespace-nowrap pe-10' 
                setting={{ type: "hover", isHover }}
                text={artist.name} 
            
            />
        </article>
    )
})

export default ArtistCard