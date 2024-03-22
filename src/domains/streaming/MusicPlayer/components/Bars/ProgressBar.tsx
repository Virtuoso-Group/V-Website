import { memo, useCallback, useContext, useState } from "react";

import { motion } from "framer-motion";
import { useTrackTimestamp } from "../../hooks/useTrackTimestamp";
import { PlayerContext } from "../../PlayerContext";

interface Props
{
    className?:string,
}

const ProgressBar = memo((props: Props) =>
{
    const { track } = useContext(PlayerContext);
    
    const [percentage, setPercentage] = useState<number>(0)
    
    const updatePercentage = useCallback((timestamp: number) =>
    {        
        if (track.duration) 
            setPercentage((timestamp / track.duration) * 100)
    }, [track.duration])
    

    useTrackTimestamp(750, updatePercentage);
    
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