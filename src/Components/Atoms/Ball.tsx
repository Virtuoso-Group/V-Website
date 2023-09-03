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
        isDragging,
        ballPosition, 

        release, 
        hold  
    } = props;  
        
    
    // TODO: this stupid ball is baggy! I have no idea why!
    // It's initially stuck unless you change the key!

    // The cause? ballPosition is initially NAN, which messes everything up!
    // This component can 
    return (
        <motion.div
            layout
            className=
            {`
                z-[2] 
                relative 

                aspect-square h-[15px] 

                rounded-full 
                bg-white 

                drop-shadow
                
                ${isDragging? "cursor-grabbing": "cursor-grab"} 
            `}
            
            animate={{ x: ballPosition, rotate: 0.04 }}
            transition={{  duration: 0.25 }}

            onClick={e => e.stopPropagation()}
        
            onMouseUp={e => release(ballPosition)}

            drag="x" dragMomentum={false}
        
            onDragStart={() => hold()}
            onDragEnd={(e, info) => release(info.point.x)}
        />
    )
}

export default Ball