import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Release } from '../../Utils/types/track';
import axios from 'axios';
import CoverArt from '../Atoms/CoverArt';
import { AWS_URL } from '../../API/config';

const AlbumPage = () => 
{
    const { albumID } = useParams();

    const [album, setAlbum] = useState<Release | null>(null)

    const fetchAlbum = async (albumID: string) =>
    {
      try 
      {
        const res = await axios.get(`http://localhost:4000/music/album/get?albumID=${albumID}`);

        if (res.data && res.data.album) 
          {
            setAlbum(res.data.album)
          }
      } 
      catch (error) 
      {
        console.error(error)
      }
    }

    useEffect(() => 
    {
      if (albumID) 
      {
        fetchAlbum(albumID);
      }
    }, [albumID])
  
    const coverArtURL = album? `${AWS_URL.release.dev}/${album._id}/cover_art.jpeg`: ''
    
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
                    name={album?.title?? ""}
                    coverArt={coverArtURL} 
                />

                <h1 className=" text-4xl text-white font-bold">{album?.title?? ""}</h1>
            </div>
            
        </div>
    )
}

export default AlbumPage