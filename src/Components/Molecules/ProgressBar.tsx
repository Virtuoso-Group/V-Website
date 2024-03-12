import { memo, useCallback, useState } from "react";

import { motion } from "framer-motion";
import { useTrackTimestamp } from "../../Utils/hooks/useMusicPlayer";

interface Props
{
    className?:string,
    trackID: string,
    duration: number, 
}

const ProgressBar = memo((props: Props) =>
{
    const { duration } = props;
    
    const [percentage, setPercentage] = useState<number>(0)
    
    const updatePercentage = useCallback((timestamp: number) =>
    {        
        if (duration) 
            setPercentage((timestamp / duration) * 100)
    }, [duration])
    

    useTrackTimestamp(props.trackID, 750, updatePercentage);
    
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