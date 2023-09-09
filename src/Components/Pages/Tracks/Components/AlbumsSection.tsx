import { useState } from 'react'
import { Album } from '../../../../Utils/types'
import { AlbumsArray } from '../../../../Utils/dummyData/albums'
import AlbumCard from '../../../Molecules/AlbumCard'


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