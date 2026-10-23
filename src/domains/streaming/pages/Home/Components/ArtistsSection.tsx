import { AnimatePresence, motion } from 'framer-motion'
import ArtistCard from '../../../../../components/Molecules/ArtistCard';
import { ArtistsList } from '../../../../../Utils/types/track';
import { useNavigate } from 'react-router';
import VGrid from '../../../../../components/Organisms/VGrid';

const MotionArtistCard = motion(ArtistCard);

const ArtistsSection = (props: { data: ArtistsList }) => 
{
    const navigate = useNavigate();

    return (
        <VGrid>
            <AnimatePresence>
                {props.data.map((artist, index) => 
                    {
                        return (
                            <MotionArtistCard 
                                key={artist._id}

                                initial={{ opacity: 0}}

                                animate={{ opacity: 1 }}

                                transition={{ duration: 0.05 * (index + 1)}}

                                artist={artist}

                                onClick={() => { navigate(`/artist/${artist._id}`) }}
                            />
                        )
                    })
                }
            </AnimatePresence>
        </VGrid>
    )
}

export default ArtistsSection