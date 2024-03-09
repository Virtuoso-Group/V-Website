
import { motion } from 'framer-motion'

interface Props
{
    className?: string, 
    name: string, 
    coverArt: string,
    loading?: "eager" | "lazy"
}

const CoverArt = (props: Props) =>
{
    const { className, name, coverArt, loading } = props;

    return (
        <img
            className={`grow-0 shrink-0 aspect-square object-fit ${className}`}
            title={name} alt={name}
            src={coverArt??""}
            loading={loading?? "lazy"}
            
        />
    )
}

export default CoverArt


interface MotionProps
{
    id: string,
    
    className?: string, 
    name: string, 
    coverArt: string,
    loading?: "eager" | "lazy"
}

export const MotionCoverArt = (props: MotionProps) => 
{
    const { className, name, coverArt, loading } = props;

    return (
        <motion.img
            layoutId={`release/${props.id}`}
            className={`grow-0 shrink-0 aspect-square object-fit ${className}`}
            title={name} alt={name}
            src={coverArt}
            loading={loading?? "lazy"}
            onError={(event) => event.currentTarget.src = ''}
        />
    )
}