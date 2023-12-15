
import { useState } from 'react'
import CoverArt from '../Atoms/CoverArt'
import Marquee from 'react-fast-marquee'

import ArtistsObject from '../../Utils/dummyData/artists'
import { Album } from '../../Utils/types/track'

type Props = 
{
    album: Album,
    onClick: () => void
}

const AlbumCard = (props: Props) => 
{    
    const { album, onClick } = props;

    const [isHover, setIsHover] = useState<boolean>(false)

    return (
        <article
            className='flex cursor-pointer flex-col w-[150px] gap-2'
            onClick={onClick}

            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >  
            <div className='relative'>
                <CoverArt 
                    className={`absolute right-5 z-[0] rounded-lg scale-[0.9] bg-blend-darken`}
                    name={album.name}
                    coverArt={album.coverArt} 
                />

                <CoverArt 
                    className={`relative z-[5] rounded-lg drop-shadow-2xl `}
                    name={album.name}
                    coverArt={album.coverArt} 
                />
            </div>
            

            <div className='text-white flex flex-col overflow-hidden whitespace-nowrap'>
                <Marquee 
                    key={""+isHover}
                    play={isHover}
                    autoFill={false}
                >
                    <span className='text-lgn font-extrabold pe-10'>{album.name}</span>
                </Marquee>

                <span className='text-md'>{ArtistsObject[album.artistID].name}</span>
            </div>
        </article>
    )
}

export default AlbumCard