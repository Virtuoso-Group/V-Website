import ReleaseCard from '../../../../../components/Molecules/AlbumCard/AlbumCard'
import { AnimatePresence, motion } from 'framer-motion';
import { AlbumInfo } from '../../../../../Utils/types/album';
import VGrid from '../../../../../components/Organisms/VGrid';

const MotionReleaseCard = motion(ReleaseCard);


const AlbumsSection = (props: { data: AlbumInfo[]}) => 
{
    return (
        <VGrid>
            <AnimatePresence>
            {
                    props.data.map((releaseObj, index) => 
                    {
                        const { release } = releaseObj;

                        return <MotionReleaseCard 
                                    key={"release/"+release._id} 
                                    initial={{ opacity: 0}}

                                    animate={{ opacity: 1 }}

                                    transition={{ duration: 0.05 * (index + 1)}}

                                    release={releaseObj} 
                                />
                    })
                }
            </AnimatePresence>
        </VGrid>
    )
}

export default AlbumsSection