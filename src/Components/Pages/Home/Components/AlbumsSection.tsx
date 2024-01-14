import ReleaseCard from '../../../Molecules/AlbumCard'
import { Release } from '../../../../Utils/types/track'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion';

const MotionReleaseCard = motion(ReleaseCard);


const AlbumsSection = (props: { data: Release[]}) => 
{
    const navigate = useNavigate();

    return (
        <AnimatePresence>
           {
                props.data.map((album, index) => 
                {
                    return <MotionReleaseCard 
                                key={"release/"+album._id} 
                                initial={{ opacity: 0}}

                                animate={{ opacity: 1 }}

                                transition={{ duration: 0.05 * (index + 1)}}

                                release={album} 
                                onClick={() => navigate(`/album/${album._id}`)} 
                            />
                })
            }
        </AnimatePresence>
    )
}

export default AlbumsSection