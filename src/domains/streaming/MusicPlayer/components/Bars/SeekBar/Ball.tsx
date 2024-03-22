import { motion } from "framer-motion"
import { useEffect, useState } from "react";

interface BallProps
{ 
    currentPercentage: number,
    containerWidth: number,
    isDragging: boolean,


    hold: () => void,
    release: (xPoint: number) => void
}

const Ball = (props: BallProps) =>
{
    const 
    { 
        isDragging, 
        currentPercentage, containerWidth,

        release, hold  
    } = props; 
    
    const [ballPosition, setBallPosition] = useState<number>(currentPercentage/100 * containerWidth);

    useEffect(() => 
    {
        console.log("Initial ball position: ", ballPosition);
        
    }, [])
    

    useEffect(() => 
    {
        const ballPosition = currentPercentage/100 * containerWidth??0
        
        setBallPosition(ballPosition)
    }, [currentPercentage, containerWidth])
        
    return (
        <motion.div
            // layout
            className=
            {`
                relative 

                size-[0.9375rem]  
                
                rounded-full bg-white drop-shadow
                
                ${isDragging? "cursor-grabbing": "cursor-grab"} 
            `}
            
            initial={{ x: ballPosition, rotate: 0.04 }}
            animate={{ x: ballPosition, rotate: 0.04 }}
            transition={{ type: "tween" }}

            onClick={e => e.stopPropagation()}
        
            onMouseUp={e => release(ballPosition)}

            drag="x" dragMomentum={false}
        
            onDragStart={() => hold()}
            onDragEnd={(e, info) => release(info.point.x)}
        />
    )
}

export default Ball