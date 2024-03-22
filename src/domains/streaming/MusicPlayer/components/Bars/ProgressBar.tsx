import { memo } from "react";

import { motion } from "framer-motion";

import useTrackPercentage from "../../hooks/useTrackPercentage";

interface Props
{
    className?:string,
}

const ProgressBar = memo((props: Props) =>
{
    const percentage = useTrackPercentage();
    
    return (
        <div className={`relative w-full h-[0.21875rem] bg-slate-400 flex items-center ${props.className}`}>
            <motion.div 
                className='absolute h-full bg-white'
                initial={{ width: 0 }}
                animate={{ width: `${percentage?? "0"}%` }}
                transition={{  duration: 0.01, type: "tween", bounce: 0.25 }}
            />
        </div>
    )
})

export default ProgressBar;