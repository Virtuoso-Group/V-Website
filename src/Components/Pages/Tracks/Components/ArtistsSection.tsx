import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Artists } from '../../../../Utils/dummyData/artists';
import ArtistCard from '../../../Molecules/ArtistCard';
import { Artist } from '../../../../Utils/types/track';

const ArtistsSection = () => 
{
    const [artists, setArtists] = useState<Artist[]>(Artists);
    
    useEffect(() => 
    {
        const sortedArtists = Artists.sort((artistA, artistB) => artistA.name.localeCompare(artistB.name))
    
        setArtists(sortedArtists)
    }, []);

    return (
        <AnimatePresence>
            {artists.map((artist, index) => 
                {
                    return (
                        <ArtistCard 
                            key={artist.id}
                            artist={artist}
                            onClick={() => {}}
                        />
                    )
                })
            }
        </AnimatePresence>
    )
}

export default ArtistsSection