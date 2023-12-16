import { useEffect, useState } from 'react'
import AlbumCard from '../../../Molecules/AlbumCard'
import { Album } from '../../../../Utils/types/track'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const AlbumsSection = () => 
{
    const navigate = useNavigate();

    const [albums, setAlbums] = useState<Album[]>([])
    
    const fetchAlbums = async () =>
    {
        try 
        {
            const res = await axios.get(`http://localhost:4000/music/album/getAll`);

            if (res.data && res.data.albums) 
            {
                const sortedAlbums = res.data.albums.sort((albumA: Album, albumB: Album) => 
                {
                    if (albumA.artistID === albumB.artistID) 
                    {
                        return albumA.title.localeCompare(albumB.title)
                    }

                    return albumA.artistID.name.localeCompare(albumB.artistID.name)
                })
    
                setAlbums(sortedAlbums)
            }
        } 
        catch (error) 
        {
            console.error(error)
        }
    }

    useEffect(() => { fetchAlbums() }, []);

    return (
        <>
           {albums.map(album => <AlbumCard key={album._id} album={album} onClick={() => navigate(`/album/${album._id}`)} />)}
        </>
    )
}

export default AlbumsSection