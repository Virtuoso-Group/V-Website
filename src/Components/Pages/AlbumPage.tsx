import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Release } from '../../Utils/types/track';
import CoverArt from '../Atoms/CoverArt';
import { getCoverArt } from '../../config/config';
import useAPI from '../../Utils/hooks/useAPI';

const AlbumPage = () => 
{
    const { albumID } = useParams();

    const release = useAPI<Release | null>("/music/release/", "get", null);

    useEffect(() => 
    {
      if (albumID) 
      {
        release.execute(albumID)
      }
    }, [albumID])
  
    const coverArtURL = release.data? getCoverArt(release.data._id): ''

    const title = release.data? release.data.title: ""
        
    return (
        <div 
            className=
            {`
                relative

                min-h-screen w-screen 
                flex flex-col 
                gap-20
                pt-[5.5625rem]
                px-20 
            `}
        >

            <div className='flex gap-10'>
                <CoverArt 
                    className={`relative rounded-lg drop-shadow-2xl w-[9.375rem]`}
                    name={title}
                    coverArt={coverArtURL} 
                />

                <h1 className="text-4xl text-white font-bold">{title}</h1>
            </div>
            
        </div>
    )
}

export default AlbumPage