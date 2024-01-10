import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Release } from '../../Utils/types/track';
import axios from 'axios';
import CoverArt from '../Atoms/CoverArt';
import { baseURL, getCoverArt } from '../../config/config';
import useAPI from '../../Utils/hooks/useAPI';

const AlbumPage = () => 
{
    const { albumID } = useParams();

    // const [release, setRelease] = useState<Release | null>(null)

    const release = useAPI<Release | null>("/music/release/", "get", null);

    // const fetchAlbum = async (albumID: string) =>
    // {
    //   try 
    //   {
    //     const res = await axios.get(`${baseURL}/music/release/get?albumID=${albumID}`);

    //     if (res.data && res.data.album) 
    //       {
    //         setRelease(res.data.album)
    //       }
    //   } 
    //   catch (error) 
    //   {
    //     console.error(error)
    //   }
    // }

    useEffect(() => 
    {
      if (albumID) 
      {
        release.execute(albumID)
        // fetchAlbum(`/get?albumID=${albumID}`);
      }
    }, [albumID])
  
    const coverArtURL = release.data? getCoverArt(release.data._id): ''

    const title = release.data? release.data.title: ""
    
    console.log("coverArtURL: ", coverArtURL);
    
    return (
        <div 
            className=
            {`
                min-h-screen w-screen 
                flex flex-col 
                gap-20
                pt-[calc(64px+25px)]
                px-20 

                relative
            `}
        >

            <div className='flex gap-10'>
                <CoverArt 
                    className={`relative rounded-lg drop-shadow-2xl w-[150px]`}
                    name={title}
                    coverArt={coverArtURL} 
                />

                <h1 className=" text-4xl text-white font-bold">{title}</h1>
            </div>
            
        </div>
    )
}

export default AlbumPage