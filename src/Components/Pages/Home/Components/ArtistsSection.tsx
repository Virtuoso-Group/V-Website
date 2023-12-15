import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import ArtistCard from '../../../Molecules/ArtistCard';
import { Artist } from '../../../../Utils/types/track';
import axios from 'axios';
import { useNavigate } from 'react-router';

const ArtistsSection = () => 
{
    const navigate = useNavigate();

    const [artists, setArtists] = useState<Artist[]>([]);
    
    const fetchArtists = async () =>
    {
        try 
        {
            const res = await axios.get(`http://localhost:4000/music/artist/getAll`);

            if (res.data && res.data.artists) 
            {
                const sortedArtists = res.data.artists.sort((artistA: Artist, artistB: Artist) => artistA.name.localeCompare(artistB.name));

                setArtists(sortedArtists)
            }
        } 
        catch (error) 
        {
            console.error(error)
        }
    }

    useEffect(() => { fetchArtists() }, []);

    return (
        <AnimatePresence>
            {artists.map(artist => 
                {
                    return (
                        <ArtistCard 
                            key={artist._id}
                            artist={artist}
                            onClick={() => { navigate(`/artist/${artist._id}`) }}
                        />
                    )
                })
            }
        </AnimatePresence>
    )
}

export default ArtistsSection