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
        ballPosition, 
        isDragging, 
        release, 
        hold  
    } = props;


    console.log("BAAAAALL");
    

    return (
        <motion.div
            layout
            className=
            {`
                z-[2] 
                absolute 

                aspect-square h-[15px] 

                rounded-full 
                bg-white 
                
                ${isDragging? "cursor-grabbing": "cursor-grab"} 
            `}
            
            initial={{ x: ballPosition }}
            animate={{ x: ballPosition }}
            transition={{  duration: 0.5, type: "spring", bounce: 0.25 }}

            onClick={e => e.stopPropagation()}
            // onMouseDown={e =>
            // {
            //     e.stopPropagation();
                
            //     hold();
            // }}
            // onMouseUp={e =>
            // {
            //     release( ballPosition)
            // }}

            drag="x" dragMomentum={false}
            
            onDrag={(e, info) =>  
            {
                console.log("HOLD");
                
                 
            }}

            onDragStart={ () => hold()}
            onDragEnd={(e, info) => release(info.point.x)}
        />
    )
}

export default Ball