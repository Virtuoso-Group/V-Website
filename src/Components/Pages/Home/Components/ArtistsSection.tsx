import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import ArtistCard from '../../../Molecules/ArtistCard';
import { Artist } from '../../../../Utils/types/track';
import { useNavigate } from 'react-router';
import useAPI from '../../../../Utils/hooks/useAPI';

// const sortedArtists = res.data.artists.sort((artistA: Artist, artistB: Artist) => artistA.name.localeCompare(artistB.name));

const ArtistsSection = () => 
{
    const navigate = useNavigate();

    const artists = useAPI<Artist[]>("music/artist/getAll", 'get', [])

    useEffect(() => { artists.execute() }, []);

    return (
        <AnimatePresence>
            {artists.data.map(artist => 
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