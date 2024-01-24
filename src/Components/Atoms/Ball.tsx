import { motion } from "framer-motion"

interface BallProps
{ 
    ballPosition: number, 
    isDragging: boolean,

    hold: () => void,
    release: (xPoint: number) => void
}

const Ball = (props: BallProps) =>
{
    const 
    { 
        isDragging, ballPosition, 

        release, hold  
    } = props;  
        
    return (
        <motion.div
            layout
            className=
            {`
                z-[2] 
                relative 

                h-[0.9375rem] aspect-square 
                
                rounded-full 
                bg-white 

                drop-shadow
                
                ${isDragging? "cursor-grabbing": "cursor-grab"} 
            `}
            
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