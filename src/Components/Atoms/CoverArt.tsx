import { motion } from "framer-motion";

interface Props
{
    className?: string, 
    name: string, 
    coverArt: string
}

const CoverArt = (props: Props) =>
{
    const { className, name, coverArt } = props;

    return (
        <motion.img
            layout="size"
            className=
            {`
                aspect-square 
                object-fit 
                
                ${className}
            `}
            title={name} alt={name}
            src={coverArt}
        />
)
}

export default CoverArt