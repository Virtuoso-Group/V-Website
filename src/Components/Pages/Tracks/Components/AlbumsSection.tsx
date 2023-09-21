import { useState } from 'react'
import { AlbumsArray } from '../../../../Utils/dummyData/albums'
import AlbumCard from '../../../Molecules/AlbumCard'
import { Album } from '../../../../Utils/types/track'


const AlbumsSection = () => 
{
    const [albums, setAlbums] = useState<Album[]>(AlbumsArray)
    
    return (
        <>
           {albums.map(album => <AlbumCard key={album.id} album={album} onClick={() => {}} />)}
        </>
    )
}

export default AlbumsSection