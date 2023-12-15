import { useEffect, useState } from 'react'
import { AlbumsArray } from '../../../../Utils/dummyData/albums'
import AlbumCard from '../../../Molecules/AlbumCard'
import { Album } from '../../../../Utils/types/track'


const AlbumsSection = () => 
{
    const [albums, setAlbums] = useState<Album[]>([])
    
    useEffect(() => 
    {
      
        const sortedAlbums = AlbumsArray.sort((albumA, albumB) => 
        {
            if (albumA.artistID === albumB.artistID) 
            {
                return albumA.name.localeCompare(albumB.name)
            }

            return albumA.artistID - albumB.artistID
        })
    
        setAlbums(sortedAlbums)
    }, []);

    return (
        <>
           {albums.map(album => <AlbumCard key={album.id} album={album} onClick={() => {}} />)}
        </>
    )
}

export default AlbumsSection