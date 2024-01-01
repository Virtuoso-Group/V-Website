import { useCallback, useState } from "react";

const useTimestamp = () =>
{
    const [value, setValue] = useState<number>(0);

    const update = useCallback((targetTimestamp: number) =>
    {
        if (targetTimestamp) 
        {
            setValue(targetTimestamp * 1000)  
        }
    }, [])
    
    const reset = useCallback(() => setValue(0), []);

    return {
        value,

        update, reset
    }
}

export default useTimestamp