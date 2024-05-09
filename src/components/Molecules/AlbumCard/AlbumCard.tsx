
import { useState } from 'react'

import AlbumCoverArt from './components/AlbumCoverArt'
import { AlbumInfo } from '../../../Utils/types/album'
import { useNavigate } from 'react-router-dom'
import VMarquee from '../../Atoms/Text/VMarquee'

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
                <VMarquee 
                    childStyle='text-lgn font-extrabold pe-10'
                    setting={{ type: "hover", isHover }}
                    text={release.release.title} 
                />

                <span className='text-md'>{release.artist.name}</span>
            </div>
        </article>
    )
}

export default ReleaseCard