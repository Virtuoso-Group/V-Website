import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Release } from '../../Utils/types/track';
import CoverArt from '../Atoms/CoverArt';
import useAPI from '../../Utils/hooks/useAPI';
import { useWebsiteContext } from '../Organisms/WebsiteLayout';

const AlbumPage = () => 
{
    const { websitePadding } = useWebsiteContext();
    const { albumID } = useParams();

    const release = useAPI<Release | null>("/music/release/", "get", null);

    useEffect(() => 
    {
      if (albumID) 
      {
        release.execute(albumID)
      }
    }, [albumID])
  
    const title = release.data? release.data.title: ""
        
    return (
        <div 
            className=
            {`
                relative
                flex flex-col 
                
                w-full 
                gap-20
                mt-[2rem]
                ${websitePadding}
            `}
        >
            <header className='flex gap-10'>
                <CoverArt 
                    className={`relative rounded-lg drop-shadow-2xl w-[9.375rem]`}
                    name={title}
                    coverArt={release.data?.coverArt??""} 
                />

                <h1 className="text-4xl text-white font-bold">{title}</h1>
            </header>
        </div>
    )
}

export default AlbumPage