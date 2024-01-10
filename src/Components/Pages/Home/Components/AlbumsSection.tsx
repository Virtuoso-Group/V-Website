import { useEffect, useState } from 'react'
import ReleaseCard from '../../../Molecules/AlbumCard'
import { Release } from '../../../../Utils/types/track'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { baseURL } from '../../../../config/config'
import useAPI from '../../../../Utils/hooks/useAPI'


// const sortedAlbums = res.data.albums.sort((albumA: Release, albumB: Release) => 
//                 {
//                     if (albumA.artist === albumB.artist) 
//                     {
//                         return albumA.title.localeCompare(albumB.title)
//                     }

//                     return albumA.artist.name.localeCompare(albumB.artist.name)
//                 })
const AlbumsSection = () => 
{
    const navigate = useNavigate();

    const albums = useAPI<Release[]>("music/release/getAll", 'get', [])

    useEffect(() => { albums.execute() }, []);

    return (
        <>
           {albums.data.map(album => <ReleaseCard key={album._id} release={album} onClick={() => navigate(`/album/${album._id}`)} />)}
        </>
    )
}

export default AlbumsSection