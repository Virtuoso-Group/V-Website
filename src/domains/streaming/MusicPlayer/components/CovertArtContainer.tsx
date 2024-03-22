import { motion } from "framer-motion";
import { MotionCoverArt } from "../../../../components/Atoms/CoverArt";

type Release =
{ 
    _id: string, 
    title: string, 
    coverArt: string 
}


interface Props
{
    className?: string,
    release: Release,
}

const CoverArtContainer = (props: Props) =>
{
    const { className, release } = props;
    
    return ( 
        <motion.div 
            layout layoutRoot
            className=
            {`
                relative 
                w-full 
                
                justify-center aspect-square object-fit drop-shadow-2xl

                ${className}
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