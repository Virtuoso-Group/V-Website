import { motion } from "framer-motion";
import { MotionCoverArt } from "../../../../../Atoms/CoverArt";

type Release =
{ 
    _id: string, 
    title: string, 
    coverArt: string 
}


interface Props
{
    release: Release,
}

const CoverArtContainer = (props: Props) =>
{
    const { release } = props;
    
    return ( 
        <motion.div 
            layout layoutRoot
            className=
            {`
                relative 
                w-full SD:w-fit 
                SD:h-full 
                SD:flex justify-center aspect-square object-fit drop-shadow-2xl
            `}
        >
            <MotionCoverArt
                id={release._id}
                className={`z-[40] absolute h-full rounded-md SD:rounded-lg `}                
                name={release.title}
                coverArt={release.coverArt} 
                loading={"eager"}
            />
        </motion.div>
    )
}

export default CoverArtContainer;