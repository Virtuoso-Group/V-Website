
import { useState } from 'react'
import CoverArt from '../Atoms/CoverArt'
import Marquee from 'react-fast-marquee'

import { Release } from '../../Utils/types/track'
import { AWS_URL } from '../../config/config'

type Props = 
{
    release: Release,
    
    onClick: () => void
}

const ReleaseCard = (props: Props) => 
{    
    const { release, onClick } = props;

    const [isHover, setIsHover] = useState<boolean>(false)

    const coverArtURL = `${AWS_URL.release.dev}/${release._id}/cover_art.jpeg`

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
                    name={release.title}
                    coverArt={coverArtURL} 
                />

                <CoverArt 
                    className={`relative z-[5] rounded-lg drop-shadow-2xl `}
                    name={release.title}
                    coverArt={coverArtURL} 
                />
            </div>
            

            <div className='text-white flex flex-col overflow-hidden whitespace-nowrap'>
                <Marquee 
                    key={""+isHover}
                    play={isHover}
                    autoFill={false}
                >
                    <span className='text-lgn font-extrabold pe-10'>{release.title}</span>
                </Marquee>

                <span className='text-md'>{release.artist.name}</span>
            </div>
        </article>
    )
}

export default ReleaseCard