import { useEffect, useState } from 'react'
import ReleaseCard from '../../../Molecules/AlbumCard'
import { Release } from '../../../../Utils/types/track'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AlbumsSection = () => 
{
    const navigate = useNavigate();

    const [albums, setAlbums] = useState<Release[]>([])
    
    const fetchAlbums = async () =>
    {
        try 
        {
            const res = await axios.get(`http://localhost:4000/music/album/getAll`);

            if (res.data && res.data.albums) 
            {
                const sortedAlbums = res.data.albums.sort((albumA: Release, albumB: Release) => 
                {
                    if (albumA.artist === albumB.artist) 
                    {
                        return albumA.title.localeCompare(albumB.title)
                    }

                    return albumA.artist.name.localeCompare(albumB.artist.name)
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
           {albums.map(album => <ReleaseCard key={album._id} release={album} onClick={() => navigate(`/album/${album._id}`)} />)}
        </>
    )
}

export default AlbumsSection