import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Artists } from '../../../../Utils/dummyData/artists';
import ArtistCard from '../../../Molecules/ArtistCard';
import { Artist } from '../../../../Utils/types/track';

const ArtistsSection = () => 
{
    const [artists, setArtists] = useState<Artist[]>(Artists);
    
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