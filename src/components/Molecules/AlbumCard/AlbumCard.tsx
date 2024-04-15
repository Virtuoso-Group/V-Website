
import { useState } from 'react'

import AlbumCoverArt from './components/AlbumCoverArt'
import AlbumName from './components/AlbumName'
import { AlbumInfo } from '../../../Utils/types/album'
import { useNavigate } from 'react-router-dom'

type Props = 
{
    release: AlbumInfo,
}

const ReleaseCard = (props: Props) => 
{    
    const navigate = useNavigate();
    const { release } = props;

    const [isHover, setIsHover] = useState<boolean>(false)

    return (
        <article
            className='flex cursor-pointer flex-col w-[9.375rem] gap-2'
            onClick={() => navigate(`/album/${release.release._id}`)}

            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >  
            <AlbumCoverArt release={release.release} />
            
            <div className='text-white flex flex-col overflow-hidden whitespace-nowrap'>
                <AlbumName isHover={isHover} title={release.release.title} />

                <span className='text-md'>{release.artist.name}</span>
            </div>
        </article>
    )
}

export default ReleaseCard