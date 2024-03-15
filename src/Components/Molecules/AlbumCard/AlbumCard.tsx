
import { useState } from 'react'

import { Release } from '../../../Utils/types/track'
import AlbumCoverArt from './components/AlbumCoverArt'
import AlbumName from './components/AlbumName'

type Props = 
{
    release: Release,
    
    onClick: () => void
}

const ReleaseCard = (props: Props) => 
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
            <AlbumCoverArt {...release} />
            
            <div className='text-white flex flex-col overflow-hidden whitespace-nowrap'>
                <AlbumName isHover={isHover} title={release.title} />

                <span className='text-md'>{release.artist.name}</span>
            </div>
        </article>
    )
}

export default ReleaseCard