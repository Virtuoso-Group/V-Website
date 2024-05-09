
import { useState } from 'react'

import { ArtistRelease } from '../../../Utils/types/track'
import AlbumCoverArt from './components/AlbumCoverArt'
import VMarquee from '../../Atoms/Text/VMarquee'

type Props = 
{
    release: ArtistRelease,
    
    onClick: () => void
}

// TODO: the name for these album components are confusing.
const ArtistReleaseCard = (props: Props) => 
{    
    const { release, onClick } = props;

    const [isHover, setIsHover] = useState<boolean>(false)

    return (
        <article
            className='flex cursor-pointer flex-col w-[9.375rem] gap-2'
            onClick={onClick}

            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >  
            <AlbumCoverArt release={release} />
            
            <div className='text-white flex flex-col overflow-hidden whitespace-nowrap'>
                <VMarquee 
                    childStyle='text-lgn font-extrabold pe-10'
                    setting={{ type: "hover", isHover }}
                    text={release.title} 
                />
            </div>
        </article>
    )
}

export default ArtistReleaseCard