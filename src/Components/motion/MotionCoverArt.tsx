import React from 'react'
import { motion } from 'framer-motion'

interface Props
{
    id: string,
    className?: string, 
    name: string, 
    coverArt: string,
    loading?: "eager" | "lazy"
}

export const MotionCoverArt = (props: Props) => 
{
    const { className, name, coverArt, loading } = props;

    return (
        <motion.img
            layoutId={`release/${props.id}`}
            className={`grow-0 shrink-0 aspect-square object-fit ${className}`}
            title={name} alt={name}
            src={coverArt}
            loading={loading?? "lazy"}
        />
    )
}
