import { motion } from "framer-motion";

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
            className=
            {`
                aspect-square 
                object-fit 
                
                ${className}
            `}
            title={name} alt={name}
            src={coverArt}
            loading={loading?? "lazy"}
        />
)
}

export default CoverArt