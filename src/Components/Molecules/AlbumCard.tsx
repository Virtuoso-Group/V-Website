
import { useState } from 'react'
import CoverArt from '../Atoms/CoverArt'
import Marquee from 'react-fast-marquee'

import { Release } from '../../Utils/types/track'

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
            <div className='relative'>
                <CoverArt 
                    className={`w-full absolute right-5 rounded-lg scale-[0.9] bg-blend-darken`}
                    name={release.title}
                    coverArt={release.coverArt} 
                />

                <CoverArt 
                    className={`w-full relative  rounded-lg drop-shadow-2xl `}
                    name={release.title}
                    coverArt={release.coverArt} 
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